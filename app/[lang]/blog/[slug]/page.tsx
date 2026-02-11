import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/Reveal";
import { formatLocalizedDate, getDictionary, locales, withLocalePath } from "@/lib/i18n";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/blog/[slug]/post.module.css";

interface BlogPostPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) => getAllPostSlugs(lang).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: dictionary.blogPage.notFound
    };
  }

  return {
    title: post.title,
    description: post.description
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <Link href={withLocalePath(locale, "/blog")} className={styles.back}>
              {dictionary.blogPage.backToBlog}
            </Link>

            <article className={styles.article}>
              <p className={styles.meta}>
                <span>
                  {formatLocalizedDate(post.date, locale, {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
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
