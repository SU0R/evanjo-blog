import type { ComponentType } from "react";
import DeepWorkDigitalHabits from "./posts/deep-work-digital-habits.mdx";
import ReflectionOnAiCoding from "./posts/reflection-on-my-coding-journey-with-ai.mdx";

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  author: string;
  description: string;
  audio: {
    src: string;
    duration: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  Content: ComponentType;
};

export const posts: Post[] = [
  {
    slug: "deep-work-digital-habits",
    title: "Deep Work: A Look into My Own Habits on the Internet",
    publishedAt: "2026-08-17",
    author: "Evan Jo",
    description:
      "Reflections on Deep Work, motivation, technology, and building strongly rooted digital habits.",
    audio: {
      src: "/media/entries/digitalhabits-august-17.mp3",
      duration: "7:12",
    },
    Content: DeepWorkDigitalHabits,
  },
  {
    slug: "reflection-on-my-coding-journey-with-ai",
    title:
      "Reflection on my coding journey with AI: A blog For students looking to learn more about the developing technology.",
    publishedAt: "2026-08-05",
    author: "Evan Jo",
    description: "A blog For students looking to learn more about the developing technology.",
    audio: {
      src: "/media/entries/vibe-coding-principles-august-5.mp3",
      duration: "9:35",
    },
    Content: ReflectionOnAiCoding,
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
