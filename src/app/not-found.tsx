import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found shell">
      <p className="eyebrow">404</p>
      <h1>This page has wandered off.</h1>
      <p>The page you were looking for does not exist or may have moved.</p>
      <Link className="button-link" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
