import { Link, useLocation } from "@tanstack/react-router";

export function Nav() {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith("/app");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-vermillion" />
            <span className="absolute inset-[3px] rounded-full bg-paper" />
            <span className="absolute inset-[7px] rounded-full bg-vermillion animate-pulse" />
          </span>
          <span className="font-display text-xl tracking-tight font-medium">PulseRank</span>
          <span className="eyebrow text-vermillion mt-1">AI</span>
        </Link>

        {!isWorkspace ? (
          <>
            <nav className="hidden md:flex items-center gap-9 text-sm">
              <a href="/#method" className="hover:text-vermillion transition-colors">Method</a>
              <a href="/#signals" className="hover:text-vermillion transition-colors">Signals</a>
              <a href="/#tournament" className="hover:text-vermillion transition-colors">Tournament</a>
              <a href="/#pricing" className="hover:text-vermillion transition-colors">Pricing</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/app" className="ghost-button text-sm hidden sm:inline-flex">Sign in</Link>
              <Link to="/app" className="ink-button text-sm">Launch app →</Link>
            </div>
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider bg-paper-deep border border-rule px-2 py-1">
                Recruiter Console v1.0
              </span>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/" className="ghost-button text-sm">
                ← Exit Workspace
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

