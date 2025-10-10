import { BookmarkIcon, GlobeAltIcon, LockClosedIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutlineIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { CompatibleDownloader, WebsiteSummary } from '../lib/websites';
import { formatCategory } from './CategoryFilter';

interface WebsiteCardProps {
  website: WebsiteSummary;
  query: string;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
}

const buildSearchUrl = (website: WebsiteSummary, query: string) => {
  if (!website.searchUrl) return undefined;
  if (!query) return website.searchUrl;

  const replacement = website.spaceReplacement ?? '+';
  const formattedQuery = query.trim().replace(/\s+/g, replacement);
  return `${website.searchUrl}${encodeURIComponent(formattedQuery).replace(/%2B/g, replacement)}`;
};

const downloaderLabel = (downloader: CompatibleDownloader) => downloader.name.replace(/([A-Z])/g, ' $1').trim();

export function WebsiteCard({ website, query, isFavorite, onToggleFavorite }: WebsiteCardProps) {
  const searchUrl = buildSearchUrl(website, query);
  const homepage = website.homepage ?? website.searchUrl;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {website.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {website.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {formatCategory(category)}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onToggleFavorite(website.name)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-brand transition hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            aria-label={isFavorite ? 'Remove from favourites' : 'Save to favourites'}
          >
            {isFavorite ? (
              <BookmarkIcon className="h-6 w-6" />
            ) : (
              <BookmarkOutlineIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          {website.loginRequired && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
              <LockClosedIcon className="h-4 w-4" />
              Login required
            </span>
          )}
          {website.xxx && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-400/20 dark:text-rose-300">
              <ShieldExclamationIcon className="h-4 w-4" />
              Adult content
            </span>
          )}
        </div>

        {website.compatibleDownloaders.length > 0 && (
          <div className="space-y-2 text-sm">
            <p className="font-medium text-slate-600 dark:text-slate-300">Compatible downloaders</p>
            <div className="flex flex-wrap gap-2">
              {website.compatibleDownloaders.map((downloader) => (
                <a
                  key={downloader.name}
                  href={downloader.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
                >
                  <PlayCircleIcon className="h-4 w-4" />
                  {downloaderLabel(downloader)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {searchUrl && (
          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <PlayCircleIcon className="h-5 w-5" />
            {query ? `Search “${query}”` : 'Open search page'}
          </a>
        )}
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              'inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
              searchUrl
                ? 'border-slate-200 text-slate-600 hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300'
                : 'border-brand text-brand hover:bg-brand/10',
            )}
          >
            <GlobeAltIcon className="h-5 w-5" />
            Visit site
          </a>
        )}
      </div>
    </motion.article>
  );
}
