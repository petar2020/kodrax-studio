import Image from "next/image";
import Link from "next/link";

import { formatLocalizedDate, getDictionary, withLocalePath, type Locale } from "@/lib/i18n";
import type { BlogPostMeta } from "@/lib/types";

import styles from "./BlogCard.module.css";

interface BlogCardProps {
  post: BlogPostMeta;
  locale: Locale;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article className={styles.card}>
      <Link href={withLocalePath(locale, `/blog/${post.slug}`)} className={styles.thumb}>
        <Image
          src={post.thumbnail}
          alt={`${post.title} thumbnail`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1120px) 50vw, 33vw"
          loading="lazy"
        />
      </Link>

      <div className={styles.content}>
        <span className={styles.badge}>{post.category}</span>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.description}>{post.description}</p>

        <div className={styles.meta}>
          <span>
            {formatLocalizedDate(post.date, locale, {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </span>
          <span>{post.readTime}</span>
        </div>

        <Link href={withLocalePath(locale, `/blog/${post.slug}`)} className={styles.readMore}>
          {dictionary.blogPage.readArticle}
        </Link>
      </div>
    </article>
  );
}
