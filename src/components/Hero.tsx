import { motion } from 'framer-motion';
import { ArrowDown, Blocks, Zap, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08]
              px-4 py-1.5 text-xs font-medium text-white/50 mb-8"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span>90+ Extensions Available</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-emerald-400">Open Source</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            Momentum{' '}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
              Extensions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/40 leading-relaxed"
          >
            A curated collection of powerful extensions for Momentum and Turbowarp.
            Enhance your projects with graphics, networking, utilities, and more.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <Blocks className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white/80">90+</p>
                <p className="text-xs text-white/30">Extensions</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/[0.06]" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white/80">100%</p>
                <p className="text-xs text-white/30">Free</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/[0.06]" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white/80">Open</p>
                <p className="text-xs text-white/30">Source</p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <p className="text-xs text-white/20 font-medium">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-4 w-4 text-white/20" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
