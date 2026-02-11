import type { Metadata } from "next";

import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/blog";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/blog/blog.module.css";

interface BlogPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.blogPage.metaTitle,
    description: dictionary.blogPage.metaDescription
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const posts = getAllPostsMeta(locale);

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">{dictionary.blogPage.title}</h1>
            <p className="page-intro">{dictionary.blogPage.intro}</p>

            <Reveal stagger>
              <div className={styles.grid}>
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
