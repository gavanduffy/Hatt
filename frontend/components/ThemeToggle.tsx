import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-10 w-16 rounded-full bg-slate-200" aria-hidden="true" />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const enabled = currentTheme === 'dark';

  return (
    <Switch
      checked={enabled}
      onChange={(value) => setTheme(value ? 'dark' : 'light')}
      className={clsx(
        'relative inline-flex h-10 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        enabled ? 'bg-slate-800' : 'bg-slate-200',
      )}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? 'translate-x-10' : 'translate-x-0',
          'pointer-events-none inline-flex h-9 w-9 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200',
        )}
      >
        {enabled ? (
          <MoonIcon className="h-5 w-5 text-slate-900" />
        ) : (
          <SunIcon className="h-5 w-5 text-amber-400" />
        )}
      </span>
    </Switch>
  );
}
