import { motion } from 'framer-motion';
import { Extension } from '../types/extension';
import { ExtensionCard } from './ExtensionCard';
import { Type } from 'lucide-react';

interface TurbowarpSectionProps {
  extensions: Extension[];
}

export function TurbowarpSection({ extensions }: TurbowarpSectionProps) {
  const featured = extensions.filter((e) => e.turbowarp);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/20
            bg-gradient-to-br from-amber-500/20 to-orange-500/20"
          >
            <Type className="h-4 w-4 fill-red-400 text-red-400" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white/80">Turbowarp Extensions</h2>
            <h4 className="text-sm text-white/40">
                Extensions provided by TurboWarp. We do not host these files, they are hosted by TurboWarp and because of this, we have no control over them.
            </h4>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((extension, index) => (
            <ExtensionCard key={extension.id} extension={extension} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}