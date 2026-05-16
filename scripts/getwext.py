from pathlib import Path
import json
import re
import urllib.request

EXTENSIONS_JSON_URL = "https://raw.githubusercontent.com/TurboWarp/extensions/master/extensions/extensions.json"
RAW_BASE = "https://raw.githubusercontent.com/TurboWarp/extensions/master/extensions/"
PUBLIC_BASE = "https://extensions.turbowarp.org/"
TS_FILE = Path("/Users/ct/Downloads/turbowarp-extension-library/src/data/extensions.ts")


def log(msg: str):
    print(msg, flush=True)


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def parse_extensions_json(text: str) -> list:
    cleaned_lines = []
    for line in text.splitlines():
        if "//" in line:
            line = line.split("//", 1)[0]
        line = line.rstrip()
        if line.strip():
            cleaned_lines.append(line)
    cleaned = "\n".join(cleaned_lines)
    cleaned = re.sub(r",\s*]", "]", cleaned)
    return json.loads(cleaned)


def parse_header(js_text: str) -> dict:
    meta = {}

    for line in js_text.splitlines()[:40]:
        m = re.match(r"//\s*([^:]+):\s*(.*)$", line)
        if not m:
            if line.strip() and not line.strip().startswith("//"):
                break
            continue

        key = m.group(1).strip().lower()
        value = m.group(2).strip()

        if key == "name":
            meta["name"] = value
        elif key == "id":
            meta["id"] = value
        elif key == "description":
            meta["description"] = value
        elif key == "by":
            meta["author"] = clean_author(value)
        elif key == "license":
            meta["license"] = value

    return meta


def raw_js_url(slug: str) -> str:
    return f"{RAW_BASE}{slug}.js"


def public_js_url(slug: str) -> str:
    return f"{PUBLIC_BASE}{slug}.js"


def js_string(s: str) -> str:
    s = s.replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"


def build_object(meta: dict) -> str:
    return "\n".join([
        "  {",
        f"    id: {js_string(meta['id'])},",
        f"    name: {js_string(meta['name'])},",
        f"    description: {js_string(meta['description'])},",
        f"    author: {js_string(meta.get('author', ''))},",
        f"    license: {js_string(meta.get('license', ''))},",
        "    icon: 'Puzzle',",
        "    tags: [],",
        "    featured: false,",
        f"    url: {js_string(meta['url'])},",
        "    verified: false,",
        "    turbowarp: true",
        "  }"
    ])


def get_existing_ids_and_urls(ts_text: str):
    ids = set(re.findall(r"id:\s*'([^']+)'", ts_text))
    urls = set(re.findall(r"url:\s*'([^']+)'", ts_text))
    return ids, urls

def clean_author(value: str) -> str:
    value = value.strip()

    if value.lower().startswith("by "):
        value = value[3:].strip()

    value = value.split("<", 1)[0].strip()
    return value


def main():
    log(f"Reading: {TS_FILE}")
    ts_text = TS_FILE.read_text(encoding="utf-8")

    existing_ids, existing_urls = get_existing_ids_and_urls(ts_text)
    log(f"Found {len(existing_ids)} existing ids")
    log(f"Found {len(existing_urls)} existing urls")

    log(f"Fetching list: {EXTENSIONS_JSON_URL}")
    raw_json = fetch_text(EXTENSIONS_JSON_URL)
    slugs = parse_extensions_json(raw_json)
    log(f"Loaded {len(slugs)} slugs")

    new_objects = []

    for i, slug in enumerate(slugs, 1):
        log(f"[{i}/{len(slugs)}] Fetching {slug}")
        js_url = raw_js_url(slug)
        public_url = public_js_url(slug)

        try:
            js_text = fetch_text(js_url)
        except Exception as e:
            log(f"    FAIL fetch: {e}")
            continue

        meta = parse_header(js_text)
        log(
            f"    Parsed id={meta.get('id')!r}, "
            f"name={meta.get('name')!r}, "
            f"description={meta.get('description')!r}"
        )

        if not all(meta.get(k) for k in ("id", "name", "description")):
            log("    SKIP missing id/name/description")
            continue

        meta["author"] = meta.get("author", "")
        meta["url"] = public_url

        if meta["id"] in existing_ids:
            log(f"    SKIP duplicate id: {meta['id']}")
            continue

        if meta["url"] in existing_urls:
            log(f"    SKIP duplicate url: {meta['url']}")
            continue

        new_objects.append(build_object(meta))
        existing_ids.add(meta["id"])
        existing_urls.add(meta["url"])
        log(f"    ADD {meta['id']}")

    if not new_objects:
        log("No new extensions to add.")
        return

    backup = TS_FILE.with_suffix(".ts.preappend.bak")
    backup.write_text(ts_text, encoding="utf-8")
    log(f"Backup written: {backup}")

    match = re.search(r"\n\];\s*$", ts_text)
    if not match:
        raise ValueError("Could not find end of extensions array (];)")

    insert_pos = match.start()

    prefix = ts_text[:insert_pos].rstrip()
    if not prefix.endswith(","):
        prefix += ","

    appended = prefix + "\n" + ",\n".join(new_objects) + "\n" + ts_text[insert_pos:]

    TS_FILE.write_text(appended, encoding="utf-8")
    log(f"Added {len(new_objects)} extensions")
    log(f"Updated: {TS_FILE}")


if __name__ == "__main__":
    main()