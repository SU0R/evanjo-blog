import { siteConfig } from "@/config/site";

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.7 8.4H3.3V19h3.4V8.4ZM5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8.2 5.4H9.9V19h3.4v-5.2c0-1.4.2-2.7 2-2.7 1.8 0 1.8 1.6 1.8 2.8V19h3.4v-5.8c0-2.9-.6-5.1-4-5.1-1.6 0-2.7.9-3.2 1.7h-.1V8.4Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.7a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.3-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.2 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.7.7 1 1.6 1 2.6 0 3.6-2.3 4.4-4.6 4.7.4.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.7Z" />
      </svg>
    ),
  },
  {
    label: "Email Evan Jo",
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5h18v14H3V5Zm2 2v.3l7 5.2 7-5.2V7H5Zm14 10V9.8l-7 5.1-7-5.1V17h14Z" />
      </svg>
    ),
  },
] as const;

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Evan Jo social links">
      {socialLinks.map((link) => (
        <a
          className="social-link"
          href={link.href}
          key={link.label}
          aria-label={link.label}
          title={link.label}
          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
