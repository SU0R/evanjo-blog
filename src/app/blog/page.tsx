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
        <h1>Blog</h1>
      </header>

      <section className="post-list" aria-label="Blog posts">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <div className="post-card__content">
              <div className="post-card__meta">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
