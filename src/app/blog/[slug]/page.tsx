import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio-player";
import { formatPostDate, getPost, posts } from "@/content/posts";
import { siteConfig } from "@/config/site";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return (
    <article className="article-page shell">
      <Link className="back-link" href="/blog">
        <span aria-hidden="true">←</span> All writing
      </Link>

      <header className="article-header">
        <p className="eyebrow">Reflection</p>
        <h1>{post.title}</h1>
        <div className="article-header__meta">
          <span>By {post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        </div>
      </header>

      <AudioPlayer src={post.audio.src} title={post.title} duration={post.audio.duration} />

      <div className="article-rule" aria-hidden="true">
        <span />
      </div>

      <div className="article-body">
        <Content />
      </div>

      <footer className="article-signoff">
        <p>In Christ,</p>
        <p>Evan Jo</p>
      </footer>
    </article>
  );
}
