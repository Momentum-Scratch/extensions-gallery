import { useState, useEffect } from 'react';
import { Search, X, Github, Moon, Sun, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function Header({ searchQuery, onSearchChange, totalCount, filteredCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]' 
          : 'bg-transparent'}
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl 
              bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white/90 tracking-tight">Momentum</h1>
              <p className="text-[10px] text-white/40 -mt-0.5 font-medium uppercase tracking-widest">Extension Library</p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div 
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className={`
                relative flex items-center rounded-xl border transition-all duration-300
                ${isFocused 
                  ? 'border-white/20 bg-white/[0.08] shadow-lg shadow-white/5' 
                  : 'border-white/[0.06] bg-white/[0.03]'}
              `}
            >
              <Search className="absolute left-3 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search extensions..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent py-2.5 pl-10 pr-10 text-sm text-white/80 
                  placeholder:text-white/20 focus:outline-none"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 p-0.5 rounded-md hover:bg-white/10 text-white/30 
                      hover:text-white/60 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div 
            className="flex items-center gap-3 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hidden md:flex items-center gap-2 text-xs text-white/30">
              <span className="font-medium text-white/50">{filteredCount}</span>
              <span>/</span>
              <span>{totalCount}</span>
              <span>extensions</span>
            </div>
            <a
              href="https://github.com/Momentum-Scratch/extensions-gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.06]
                px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/[0.08] hover:text-white/80
                transition-all duration-200"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
