import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
        <img src="/icons/icon.svg" alt="Hatt logo" width={40} height={40} className="rounded-xl" />
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Hatt Directory</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Offline-ready media source finder</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-slate-500 hover:text-brand dark:text-slate-400 sm:inline"
          >
            Deploy on Vercel
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
