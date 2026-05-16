import { useState } from 'react';
import { Copy, Check, ExternalLink, Star, ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Extension } from '../types/extension';
import { getIcon } from './IconMap';

interface ExtensionCardProps {
  extension: Extension;
  index: number;
}

export function ExtensionCard({ extension, index }: ExtensionCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getIcon(extension.icon);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(extension.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    window.open(
      'https://momentum-scratch.github.io/scratch-gui/editor?extension=' + extension.url,
      '_blank'
    );
  };

  const tagColors: Record<string, string> = {
    graphics: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    network: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    utility: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    input: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    media: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    data: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    game: 'bg-red-500/10 text-red-400 border-red-500/20',
    system: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    math: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    text: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    camera: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    ai: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    transform: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    physics: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <div
        className={`
          relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]
          backdrop-blur-sm transition-all duration-300
          ${isHovered ? 'border-white/[0.12] bg-white/[0.06] shadow-2xl shadow-black/20' : ''}
        `}
      >
        {extension.featured && (
          <div className="absolute right-3 top-3 z-10">
            <div
              className="flex items-center gap-1 rounded-full border border-amber-500/30
              bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2 py-0.5 text-[10px]
              font-semibold text-amber-400"
            >
              <Star className="h-3 w-3 fill-amber-400" />
              Featured
            </div>
          </div>
        )}

        <div className="flex h-full flex-col p-5">
          <div className="flex items-start gap-4">
            <div
              className={`
                flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                border border-white/[0.06] bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                transition-all duration-300
                ${isHovered ? 'scale-110 border-white/[0.12]' : ''}
              `}
            >
              <Icon className="h-6 w-6 text-white/70" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-white/90">
                {extension.name}
              </h3>
              <p className="mt-0.5 text-xs text-white/40">
                {extension.author?.trim()
                  ? `by ${extension.author.trim()}`
                  : extension.license?.trim()
                    ? extension.license.trim()
                    : 'Unknown Author'}
              </p>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 min-h-[3rem] text-sm leading-6 text-white/50">
            {extension.description}
          </p>

          <div className="mt-3 min-h-[1.75rem]">
            <div className="flex flex-wrap gap-1.5">
              {extension.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`
                    inline-flex items-center rounded-md border px-2 py-0.5 text-[10px]
                    font-medium uppercase tracking-wider
                    ${tagColors[tag] || 'border-white/10 bg-white/5 text-white/40'}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
              <div className="flex items-center gap-3 text-xs text-white/30">
                {extension.verified ? (
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3 text-red-400" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`
                    flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium
                    transition-all duration-200
                    ${
                      copied
                        ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                        : 'border-white/[0.06] bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/70'
                    }
                  `}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy URL
                    </>
                  )}
                </button>

                <button
                  onClick={handleOpen}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.06]
                    px-3 py-1.5 text-xs font-medium text-white/60 transition-all duration-200
                    hover:bg-white/[0.10] hover:text-white/80"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`
            pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </motion.div>
  );
}