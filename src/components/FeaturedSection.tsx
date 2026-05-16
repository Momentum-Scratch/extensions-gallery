import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Extension } from '../types/extension';
import { ExtensionCard } from './ExtensionCard';

interface FeaturedSectionProps {
  extensions: Extension[];
}

export function FeaturedSection({ extensions }: FeaturedSectionProps) {
  const featured = extensions.filter((e) => e.featured).slice(0, 4);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20
            border border-amber-500/20">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white/80">Featured Extensions</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((extension, index) => (
            <ExtensionCard key={extension.id} extension={extension} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
