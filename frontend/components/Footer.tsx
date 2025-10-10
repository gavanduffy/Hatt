export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-6 text-sm text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:px-6">
        <p>&copy; {new Date().getFullYear()} Hatt. Crafted for the open-source community.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/FrenchGithubUser/Hatt" target="_blank" rel="noreferrer">
            Source code
          </a>
          <a href="https://github.com/FrenchGithubUser/Hatt/blob/main/LICENSE" target="_blank" rel="noreferrer">
            License
          </a>
        </div>
      </div>
    </footer>
  );
}
