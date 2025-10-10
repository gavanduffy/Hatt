import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface FilterToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export function FilterToggle({ label, description, enabled, onChange }: FilterToggleProps) {
  return (
    <Switch.Group as="div" className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={clsx(
          enabled ? 'bg-brand' : 'bg-slate-200 dark:bg-slate-700',
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200',
          )}
        />
      </Switch>
      <Switch.Label className="flex-1">
        <p className="font-medium text-slate-700 dark:text-slate-200">{label}</p>
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </Switch.Label>
    </Switch.Group>
  );
}
