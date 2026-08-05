import { siteConfig } from "@/config/site";

const links = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: "Email", href: `mailto:${siteConfig.email}` },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Writing, learning, and building with purpose.</p>
        <div className="site-footer__links" aria-label="Contact links">
          {links.map((link) => (
            <a
              href={link.href}
              key={link.label}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="site-footer__copyright">© 2026 Evan Jo</p>
      </div>
    </footer>
  );
}
