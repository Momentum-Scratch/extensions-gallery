from pathlib import Path
import re

file_path = Path("/Users/ct/Downloads/turbowarp-extension-library/src/data/extensions.ts")
text = file_path.read_text(encoding="utf-8")

obj_pattern = re.compile(r'\{(?:[^{}]|\n)*?\}', re.DOTALL)

def update_object(match):
    obj = match.group(0)

    if "id:" not in obj or "name:" not in obj or "url:" not in obj:
        return obj

    if re.search(r'\bturbowarp\s*:', obj):
        obj = re.sub(r'\bturbowarp\s*:\s*(true|false)', 'turbowarp: true', obj)
        return obj

    lines = obj.splitlines()
    if len(lines) < 2:
        return obj

    insert_at = len(lines) - 1
    last_prop_idx = insert_at - 1
    while last_prop_idx > 0 and not lines[last_prop_idx].strip():
        last_prop_idx -= 1

    if lines[last_prop_idx].rstrip().endswith(','):
        lines.insert(insert_at, "    turbowarp: true")
    else:
        lines[last_prop_idx] = lines[last_prop_idx].rstrip() + ","
        lines.insert(insert_at, "    turbowarp: true")

    return "\n".join(lines)

updated = obj_pattern.sub(update_object, text)
file_path.write_text(updated, encoding="utf-8")

print(f"Updated {file_path}")