import blogs from "../../data/blogs.json";
import BlogHero from "../Blog-compnents/BlogHero";
import BlogContent from "../Blog-compnents/BlogContent";
import BlogTOC from "../Blog-compnents/BlogTOC";
import BlogAuthor from "../Blog-compnents/BlogAuthor";
import RelatedBlogs from "../Blog-compnents/RelatedBlogs";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getBlogSEO } from "@/lib/seo";

const SITE_URL = "https://www.abbaddentalclinic.com/";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};

  const seo = getBlogSEO(blog);

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: seo.canonical,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: "Abbad Dental Clinic & Implant Center",
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_IN",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  const seo = getBlogSEO(blog);

  /*
   JSON-LD Schema for Google SEO
  */

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blog.slug}`,
    },
    headline: blog.title,
    description: blog.excerpt,
    image: `${SITE_URL}${blog.coverImage}`,
    author: {
      "@type": "Organization",
      name: "Abbad Dental Clinic & Implant Center",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Dr. Nikhil Abbad",
    },
    datePublished: blog.date,
    dateModified: blog.date,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${SITE_URL}/blogs/${blog.slug}`,
      },
    ],
  };

  return (
    <>
      <div
        className="relative min-h-screen selection:bg-blue-100 selection:text-blue-900"
        style={{ background: "linear-gradient(to top, #F2F0E9 0%, #F2F0E9 10%, #FFFCF8 100%)" }}
      >
        {/* Premium Background Mesh System */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] blur-[100px] animate-[pulse_10s_infinite_ease-in-out]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] blur-[120px] animate-[pulse_15s_infinite_ease-in-out_delay-1000]" />
          <div className="absolute top-[40%] left-[20%] w-[30%] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] blur-[80px]" />

          {/* Subtle Texture Overlays */}
          <div className="absolute inset-0 opacity-[0.015] grayscale" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* JSON-LD SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        <Navbar variant="dark" />

        <BlogHero blog={blog} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20 items-start">
            <BlogTOC content={blog.content} />

            <div className="w-full min-w-0">
              <BlogContent content={blog.content} />
            </div>
          </div>
        </div>

        {/* This part scrolls normally after the blog content ends and spans full width */}
        <div className="w-full min-w-0 mt-8 sm:mt-12">
          {/* Blog Author Section */}
          <div className="border-t border-slate-200 pt-12 sm:pt-16">
            <BlogAuthor />
          </div>

          {/* Related Blogs Section */}
          <div className="mt-12 sm:mt-20">
            <RelatedBlogs currentSlug={blog.slug} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}