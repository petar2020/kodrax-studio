import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/Reveal";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

import styles from "./post.module.css";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found"
    };
  }

  return {
    title: post.title,
    description: post.description
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <Link href="/blog" className={styles.back}>
              Back to blog
            </Link>

            <article className={styles.article}>
              <p className={styles.meta}>
                <span>{formatter.format(new Date(post.date))}</span>
                <span>{post.author}</span>
                <span>{post.category}</span>
              </p>

              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.description}>{post.description}</p>

              <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
