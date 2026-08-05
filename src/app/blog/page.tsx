import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Evan Jo on technology, learning, faith, and creating with purpose.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="blog-index shell">
      <header className="page-heading">
        <p className="eyebrow">Notes &amp; reflections</p>
        <h1>Blog</h1>
        <p>Writing about technology, learning, faith, and the ideas that connect them.</p>
      </header>

      <section className="post-list" aria-label="Blog posts">
        {posts.map((post, index) => (
          <article className="post-card" key={post.slug}>
            <div className="post-card__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="post-card__content">
              <div className="post-card__meta">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.audio.duration} audio</span>
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>
                Read and listen <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
