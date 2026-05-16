import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { FeaturedSection } from './components/FeaturedSection';
import { ExtensionGrid } from './components/ExtensionGrid';
import { Footer } from './components/Footer';
import { extensions, categories } from './data/extensions';
import { Category } from './types/extension';
import { TurbowarpSection } from './components/TurbowarpSection';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredExtensions = useMemo(() => {
    let result = extensions;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((ext) => 
        ext.tags.includes(activeCategory)
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((ext) =>
        ext.name.toLowerCase().includes(query) ||
        ext.description.toLowerCase().includes(query) ||
        ext.author.toLowerCase().includes(query) ||
        ext.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  }, []);

  const nonFeaturedExtensions = useMemo(() => {
    return filteredExtensions.filter((ext) => !ext.featured);
  }, [filteredExtensions]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Subtle noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalCount={extensions.length}
        filteredCount={filteredExtensions.length}
      />

      <main className="relative">
        <Hero />

        {/* Category Filter */}
        <section className="sticky top-16 z-40 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        {/* Featured Section - only show when no search and all category */}
        {!searchQuery && activeCategory === 'all' && (
          <FeaturedSection extensions={extensions.filter((ext) => ext.featured)} />
        )}

        {/* All Extensions without turbowarp */}
        <ExtensionGrid
          extensions={filteredExtensions.filter((ext) => {
            const matchesTurboWarp = !ext.turbowarp;
            const matchesSearch =
              !searchQuery ||
              ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ext.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTurboWarp && matchesSearch;
          })}
          title={
            searchQuery
              ? 'Search Results'
              : activeCategory === 'all'
              ? 'All Extensions'
              : undefined
          }
        />

        <TurbowarpSection extensions={nonFeaturedExtensions.filter((ext) => ext.turbowarp)} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
