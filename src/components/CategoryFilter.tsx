import { motion } from 'framer-motion';
import { Category, CategoryInfo } from '../types/extension';
import { getIcon } from './IconMap';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => {
        const Icon = getIcon(category.icon);
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
              transition-all duration-300 border
              ${isActive 
                ? 'bg-white/[0.08] text-white border-white/[0.12] shadow-lg shadow-white/5' 
                : 'bg-white/[0.02] text-white/40 border-white/[0.04] hover:bg-white/[0.05] hover:text-white/60 hover:border-white/[0.08]'}
            `}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-xl border-2 border-white/10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
