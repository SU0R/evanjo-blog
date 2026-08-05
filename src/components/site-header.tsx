import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Evan Jo home">
          <span aria-hidden="true">EJ</span>
          <span>Evan Jo</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">About Me</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
