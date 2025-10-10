import clsx from 'clsx';

interface CategoryFilterProps {
  categories: string[];
  selected: string[];
  onToggle: (category: string) => void;
}

const formatCategory = (category: string) =>
  category
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function CategoryFilter({ categories, selected, onToggle }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selected.includes(category);
        return (
          <button
            key={category}
            type="button"
            onClick={() => onToggle(category)}
            className={clsx(
              'rounded-full border px-4 py-1 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
              isSelected
                ? 'border-brand bg-brand text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300',
            )}
          >
            {formatCategory(category)}
          </button>
        );
      })}
    </div>
  );
}

export { formatCategory };
