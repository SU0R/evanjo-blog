import type { Metadata } from "next";
import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import headshot from "../../public/media/profile/evan-jo-headshot.jpg";
import algonquinLogo from "../../public/media/profile/algonquin-logo.jpg";

export const metadata: Metadata = {
  title: "About Me",
  alternates: { canonical: "/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero__portrait-wrap">
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
          <h1 id="hero-title">Evan Jo</h1>
          <blockquote className="hero__verse">
            <p>“Therefore there is now no condemnation for those in Christ Jesus.”</p>
            <cite>Romans 8:1</cite>
          </blockquote>
          <SocialLinks />
        </div>
      </section>

      <section className="profile-section shell" aria-labelledby="experience-heading">
        <h2 className="journey-heading" id="experience-heading">
          Journey
        </h2>

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
              <h3>
                <a href="https://www.arhs.nsboro.k12.ma.us/" target="_blank" rel="noreferrer">
                  Algonquin Regional High School
                </a>
              </h3>
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
    </>
  );
}
