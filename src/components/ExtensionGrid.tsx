import { motion } from 'framer-motion';
import { Extension } from '../types/extension';
import { ExtensionCard } from './ExtensionCard';

interface ExtensionGridProps {
  extensions: Extension[];
  title?: string;
}

export function ExtensionGrid({ extensions, title }: ExtensionGridProps) {
  if (extensions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white/20"
        >
          <svg
            className="mx-auto mb-4 h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-lg font-medium text-white/30">No extensions found</p>
          <p className="mt-1 text-sm text-white/20">Try adjusting your search or filters</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-white/60">{title}</h2>
            <p className="mt-1 text-sm text-white/30">
              {extensions.length} extension{extensions.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {extensions.map((extension, index) => (
            <div key={extension.id} className="h-full">
              <ExtensionCard extension={extension} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}