import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import { getAllPostsMeta } from "@/lib/blog";

import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on Laravel APIs, WordPress performance, and Next.js migration strategy."
};

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">Blog</h1>
            <p className="page-intro">Technical notes and practical implementation playbooks from the studio.</p>

            <div className={styles.grid}>
              {posts.map((post) => (
                <article key={post.slug} className={styles.card}>
                  <div className={styles.meta}>
                    <span>{formatter.format(new Date(post.date))}</span>
                    <span>{post.author}</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.description}>{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
