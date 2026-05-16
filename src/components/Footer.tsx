import { Github, Heart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg 
              bg-gradient-to-br from-orange-500 to-red-600">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/60">Momentum Extensions</p>
              <p className="text-xs text-white/30">Momentum-Scratch Extensions.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Momentum-Scratch/extensions-gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/20">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-400 fill-red-400" />
            <span>for the Scratch community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
