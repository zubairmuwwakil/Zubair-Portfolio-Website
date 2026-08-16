import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

/**
 * Chrome shared by the blog index and individual posts.
 *
 * The theme handling mirrors Portfolio.tsx: the class lives on <html>, the
 * preference in localStorage, and the initial value is read lazily so the
 * pre-render doesn't touch window.
 */
export function BlogLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    window.localStorage.setItem("theme", theme);
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === "dark" ? "/favicon-dark.png" : "/favicon-light.png";
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "page-dark" : "page-light"}`}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark" ? "nav-surface-dark" : "nav-surface-light"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
              <img
                src={theme === "dark" ? "/assets/zm-logo-dark-192.png" : "/assets/zm-logo-light-192.png"}
                alt="Zubair Muwwakil monogram"
                width={192}
                height={192}
                className="w-9 h-9 object-cover rounded-lg shadow group-hover:scale-110 transition-transform"
              />
              <span className="font-serif font-bold text-xl tracking-tight">Zubair Muwwakil</span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                href="/projects/"
                className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide"
              >
                Projects
              </Link>
              <Link
                href="/blog/"
                className="text-muted-foreground hover:text-primary font-medium transition-colors text-sm uppercase tracking-wide"
              >
                Blog
              </Link>
              <button
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                className="inline-flex items-center justify-center hover-elevate active-elevate-2 border border-transparent h-9 w-9 rounded-full"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3c.132 0 .263 0 .393.01a7.5 7.5 0 0 0 8.598 8.598A9 9 0 1 1 12 3Z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                )}
              </button>
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center justify-center hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 py-2 rounded-full px-6 font-semibold text-sm"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        {children}
      </main>

      <footer className="py-8 border-t border-border/50 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
