import { GetStaticProps } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { CategoryFilter } from '../components/CategoryFilter';
import { WebsiteCard } from '../components/WebsiteCard';
import { DirectoryData, WebsiteSummary, loadDirectoryData } from '../lib/websites';
import { FilterToggle } from '../components/FilterToggle';
import { FunnelIcon, MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface HomeProps extends DirectoryData {}

const FAVORITES_KEY = 'hatt:favorites';

const computeScore = (website: WebsiteSummary, query: string) => {
  if (!query) return 0;
  const normalized = query.toLowerCase();
  if (website.name.toLowerCase().startsWith(normalized)) {
    return 3;
  }
  if (website.name.toLowerCase().includes(normalized)) {
    return 2;
  }
  if (website.searchableText.includes(normalized)) {
    return 1;
  }
  return 0;
};

export default function Home({ websites, categories }: HomeProps) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hideLoginRequired, setHideLoginRequired] = useState(false);
  const [hideAdultContent, setHideAdultContent] = useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.warn('Unable to parse favourites from storage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  };

  const filteredWebsites = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return websites
      .filter((website) => {
        if (hideAdultContent && website.xxx) return false;
        if (hideLoginRequired && website.loginRequired) return false;
        if (showOnlyFavorites && !favorites.includes(website.name)) return false;
        if (selectedCategories.length > 0 && !selectedCategories.some((cat) => website.categories.includes(cat))) {
          return false;
        }
        if (!normalizedQuery) return true;
        return website.searchableText.includes(normalizedQuery);
      })
      .map((website) => ({
        website,
        score: computeScore(website, normalizedQuery),
      }))
      .sort((a, b) => {
        const favoriteDelta = Number(favorites.includes(b.website.name)) - Number(favorites.includes(a.website.name));
        if (favoriteDelta !== 0) return favoriteDelta;
        const scoreDelta = b.score - a.score;
        if (scoreDelta !== 0) return scoreDelta;
        return a.website.name.localeCompare(b.website.name);
      })
      .map(({ website }) => website);
  }, [favorites, hideAdultContent, hideLoginRequired, query, selectedCategories, showOnlyFavorites, websites]);

  const stats = {
    websites: websites.length,
    categories: categories.length,
    favorites: favorites.length,
  };

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/10 via-transparent to-transparent dark:from-brand/20" />
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white/70 px-4 py-1 text-sm text-brand shadow-sm backdrop-blur dark:border-brand/20 dark:bg-slate-900/60">
              <SparklesIcon className="h-4 w-4" />
              Progressive Web App ready for Vercel
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Find the perfect source for your next download
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Hatt now runs directly in your browser with offline support. Search across {stats.websites} curated websites,
              filter by category, and save your favourites to revisit later.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <label className="relative block text-left">
              <span className="sr-only">Search websites</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search by website or category"
                className="w-full rounded-full border border-slate-200 bg-white py-4 pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Tip: add this app to your home screen for a native feel on mobile.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <FunnelIcon className="h-5 w-5" /> Filters
            </div>
            <CategoryFilter categories={categories} selected={selectedCategories} onToggle={toggleCategory} />
            <div className="grid gap-3 md:grid-cols-3">
              <FilterToggle
                label="Hide login-only websites"
                description="Show only websites that can be browsed without an account."
                enabled={hideLoginRequired}
                onChange={setHideLoginRequired}
              />
              <FilterToggle
                label="Hide adult content"
                description="Keep explicit sources out of your search results."
                enabled={hideAdultContent}
                onChange={setHideAdultContent}
              />
              <FilterToggle
                label="Show favourites only"
                description="Display the websites you have starred."
                enabled={showOnlyFavorites}
                onChange={setShowOnlyFavorites}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/80 py-16 dark:bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Directory</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {filteredWebsites.length} website{filteredWebsites.length === 1 ? '' : 's'} match your filters.
              </p>
            </div>
            {favorites.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                You have {favorites.length} favourite{favorites.length === 1 ? '' : 's'} saved locally.
              </div>
            )}
          </div>

          {filteredWebsites.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No websites found</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your filters or searching for a different keyword.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                layout
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {filteredWebsites.map((website) => (
                  <WebsiteCard
                    key={website.name}
                    website={website}
                    query={query}
                    isFavorite={favorites.includes(website.name)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await loadDirectoryData();
  return {
    props: data,
    revalidate: 60 * 60, // revalidate every hour
  };
};
