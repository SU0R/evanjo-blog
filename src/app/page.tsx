import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import headshot from "../../public/media/profile/evan-jo-headshot.jpg";
import algonquinLogo from "../../public/media/profile/algonquin-logo.jpg";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Me",
  alternates: { canonical: "/" },
};

const profileLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero__portrait-wrap">
          <div className="hero__portrait-accent" aria-hidden="true" />
          <Image
            className="hero__portrait"
            src={headshot}
            alt="Evan Jo outdoors wearing a red jacket"
            priority
            placeholder="blur"
            sizes="(max-width: 760px) 72vw, 360px"
          />
        </div>
        <div className="hero__copy">
          <p className="eyebrow">Student · Writer · Builder</p>
          <h1 id="hero-title">Evan Jo</h1>
          <p className="hero__lead">
            I do a lot of writing in my free time, and I want to share the ideas that I develop
            while writing with the world around me.
          </p>
          <p className="hero__secondary">
            My goal is to inspire you to be able to use these technologies in a way that&apos;s
            enjoyable, fruitful, and that honors God.
          </p>
          <div className="hero__links" aria-label="Evan Jo contact links">
            {profileLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-section shell" aria-labelledby="experience-heading">
        <div className="section-intro">
          <p className="eyebrow">Experience &amp; education</p>
          <h2 id="experience-heading">The path so far</h2>
          <p>A timeline of learning, work, and the experiences that have shaped me.</p>
        </div>

        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-item__date">
              <span>Summer</span>
              <strong>2026</strong>
            </div>
            <div className="timeline-item__logo timeline-item__logo--wide">
              <Image
                src="/media/profile/waters-logo-black.svg"
                alt="Waters Corporation"
                width={171}
                height={43}
              />
            </div>
            <div className="timeline-item__copy">
              <p className="timeline-item__type">Internship</p>
              <h3>Waters Corporation</h3>
              <p>
                I interned at Waters for two weeks in the summer of &apos;26, where we learned about
                how different people work together to develop technologies that impact everyday
                lives.
              </p>
            </div>
          </article>

          <article className="timeline-item">
            <div className="timeline-item__date">
              <span>Class of</span>
              <strong>2029</strong>
            </div>
            <div className="timeline-item__logo">
              <Image
                src={algonquinLogo}
                alt="Algonquin Regional High School letter A logo"
                width={112}
                height={84}
                sizes="112px"
              />
            </div>
            <div className="timeline-item__copy">
              <p className="timeline-item__type">Education · 2025–2029</p>
              <h3>Algonquin Regional High School</h3>
              <p>I am currently a rising sophomore at Algonquin Regional.</p>
            </div>
          </article>

          <article className="timeline-item">
            <div className="timeline-item__date">
              <span>During</span>
              <strong>2020–21</strong>
            </div>
            <div className="timeline-item__mark" aria-hidden="true">
              <span>H</span>
            </div>
            <div className="timeline-item__copy">
              <p className="timeline-item__type">Education</p>
              <h3>Homeschooled</h3>
              <p>I was proud of the year where, from 2020–2021, I was homeschooled during Covid.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="quote-section shell" aria-labelledby="quote-heading">
        <p className="eyebrow" id="quote-heading">
          A verse I return to
        </p>
        <blockquote>
          <p>“Therefore there is now no condemnation for those in Christ Jesus.”</p>
          <cite>Romans 8:1</cite>
        </blockquote>
      </section>

      <section className="writing-cta shell" aria-labelledby="writing-heading">
        <div>
          <p className="eyebrow">Writing</p>
          <h2 id="writing-heading">Ideas worth working through.</h2>
        </div>
        <p>Read my first reflection on learning to create software with artificial intelligence.</p>
        <Link className="button-link" href="/blog">
          Visit the blog <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
