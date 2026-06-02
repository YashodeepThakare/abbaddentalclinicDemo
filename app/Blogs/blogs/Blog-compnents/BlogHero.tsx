"use client";

import { useEffect } from "react";
import { CalendarDays, Clock3, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type BlogHeroProps = {
  blog?: {
    title?: string;
    category?: string;
    excerpt?: string;
    author?: string;
    date?: string;
    readTime?: string;
    coverImage?: string;
    authorImage?: string;
  };
};

export default function BlogHero({ blog }: BlogHeroProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top on mount and path change to handle Next.js route change scroll reset issues
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  const currentBlog = {
    title:
      blog?.title ||
      "Dental Implants in Nashik: Restore Your Smile with Expert Care",
    category: blog?.category || "Dental Implants",
    excerpt:
      blog?.excerpt ||
      "Discover how dental implants in Nashik can restore missing teeth, improve chewing comfort, protect jawbone health, and rebuild smile confidence with expert care at Abbad Dental Clinic & Implant Center.",
    author: blog?.author || "Abbad Dental Clinic & Implant Center",
    date: blog?.date || "2026-05-25",
    readTime: blog?.readTime || "18 min read",
    coverImage:
      blog?.coverImage ||
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1800&auto=format&fit=crop",
    authorImage: blog?.authorImage || "/assets/photo/nikhil1.webp",
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.12 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.72, ease: EASE },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#031228] pt-[90px] text-white sm:pt-[95px] lg:pt-[105px]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,70,130,0.25),transparent_34%),linear-gradient(135deg,#031022_0%,#061a35_50%,#031022_100%)]" />

      {/* Diagonal lines */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute left-[42%] top-[-20%] h-[1200px] w-px rotate-[-42deg] bg-[#1d5d9e]/45" />
        <div className="absolute left-[50%] top-[-18%] h-[1200px] w-px rotate-[-42deg] bg-[#f06b50]/35" />
        <div className="absolute left-[25%] top-[28%] h-[900px] w-px rotate-[-42deg] bg-[#1d5d9e]/35" />
      </div>

      {/* Dots */}
      <div className="pointer-events-none absolute left-[48%] top-[96px] hidden h-[110px] w-[110px] opacity-45 lg:block xl:h-[130px] xl:w-[130px]">
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(37,117,201,0.95)_1.4px,transparent_1.6px)] [background-size:22px_22px]" />
      </div>

      <div className="pointer-events-none absolute bottom-7 left-[50%] hidden h-[70px] w-[90px] opacity-40 lg:block xl:h-[90px] xl:w-[110px]">
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(37,117,201,0.95)_1.4px,transparent_1.6px)] [background-size:22px_22px]" />
      </div>

      {/* Desktop Right Image Area */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-[96px] z-[1] hidden w-[46vw] lg:block 2xl:w-[49vw]">
        <div className="relative h-full w-full">
          <div className="absolute right-[52%] top-1/2 h-[clamp(300px,44vh,500px)] w-[390px] -translate-y-1/2 rotate-[-45deg] rounded-[52px] border border-[#2c72bd]/45 2xl:h-[600px] 2xl:w-[520px]" />

          <div className="absolute right-[44%] top-1/2 h-[clamp(300px,44vh,500px)] w-[390px] -translate-y-[47%] rotate-[-45deg] rounded-[52px] border border-[#ff735c]/40 2xl:h-[600px] 2xl:w-[520px]" />

          <div className="absolute right-[62%] top-1/2 h-[clamp(200px,26vh,320px)] w-[260px] -translate-y-[20%] rotate-[-45deg] rounded-[42px] border border-[#2c72bd]/35 2xl:h-[380px] 2xl:w-[380px]" />

          <div className="absolute right-0 top-1/2 h-[clamp(330px,54vh,570px)] w-[96%] -translate-y-1/2 2xl:h-[60vh] 2xl:max-h-[630px]">
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="pointer-events-auto relative h-full w-full overflow-hidden rounded-tl-[70px] 2xl:rounded-tl-[110px]"
              style={{
                WebkitClipPath:
                  "polygon(23% 0%, 100% 0%, 100% 100%, 23% 100%, 0% 50%)",
                clipPath:
                  "polygon(23% 0%, 100% 0%, 100% 100%, 23% 100%, 0% 50%)",
              }}
            >
              <Image
                src={currentBlog.coverImage}
                alt={currentBlog.title}
                fill
                priority
                sizes="50vw"
                className="object-cover"
                style={{ objectPosition: "center 35%" }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1540px] flex-col px-5 pb-10 pt-3 sm:px-8 lg:min-h-[calc(100svh-96px)] lg:px-[52px] lg:pt-5 lg:pb-10 2xl:px-[80px]">
        <motion.div
          variants={container}
          initial={false}
          animate="visible"
          className="w-full lg:w-[54%] lg:max-w-[650px] xl:max-w-[700px] 2xl:w-[52%] 2xl:max-w-[760px]"
        >
          {/* Back Button */}
          <motion.div
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="mb-4 2xl:mb-6"
          >
            <Link
              href="/Blogs/blogs"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:pr-5 2xl:text-[15px]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>All Articles</span>
            </Link>
          </motion.div>

          {/* Category */}
          <motion.div
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="flex flex-wrap items-center gap-6 mb-3 2xl:mb-4"
          >
            <div className="inline-flex max-w-full items-center rounded-full border border-white/20 h-[30px] gap-2.5 px-4 2xl:h-[34px] 2xl:px-5">
              <span className="flex shrink-0 text-[#ff735c]">
                <svg
                  className="h-3 w-3 2xl:h-3.5 2xl:w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 2h10c2.76 0 5 2.24 5 5v5c0 3.31-2.69 6-6 6-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1H10c-.55 0-1 .45-1 1v2c0 .55-.45 1-1 1-3.31 0-6-2.69-6-6V7c0-2.76 2.24-5 5-5z" />
                  <path d="M12 22v-4" />
                </svg>
              </span>

              <span className="truncate font-bold uppercase tracking-widest text-[#f4f7ff] text-[11px] 2xl:text-[13px]">
                {currentBlog.category}
              </span>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-1 w-1 rounded-full bg-[#ff735c]" />
              <span className="h-1 w-1 rounded-full bg-[#ff735c]" />
              <span className="h-1 w-1 rounded-full bg-[#ff735c]" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="break-words font-serif font-normal tracking-[0.01em] text-[#f4f7ff] text-[clamp(38px,8vw,58px)] leading-[1.06] lg:text-[clamp(42px,4.4vw,60px)] 2xl:text-[clamp(60px,4.5vw,74px)]"
          >
            {currentBlog.title}
          </motion.h1>

          {/* Orange Line */}
          <motion.div
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="flex items-center mt-4 2xl:mt-5"
          >
            <span className="block h-[2px] w-[50px] bg-[#ff735c] 2xl:w-[58px]" />
            <span className="block h-[2px] w-[28px] bg-[#ff735c]/45 2xl:w-[32px]" />
          </motion.div>

          {/* Excerpt */}
          <motion.p
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="max-w-[620px] font-light tracking-[0.02em] text-white/82 2xl:max-w-[700px] mt-3 text-[15px] leading-[1.55] xl:text-[16px] 2xl:text-[18px]"
          >
            {currentBlog.excerpt}
          </motion.p>

          {/* Meta */}
          <motion.div
            variants={fadeUp}
            initial={false}
            animate="visible"
            className="max-w-[700px] border-t border-white/18 2xl:max-w-[760px] mt-4 pt-3 2xl:mt-5 2xl:pt-4"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5 lg:gap-6 xl:gap-8">
              {/* Author */}
              <div className="flex min-w-0 shrink-0 items-center gap-3">
                <div className="relative shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15 h-[42px] w-[42px] 2xl:h-[54px] 2xl:w-[54px]">
                  <Image
                    src={currentBlog.authorImage}
                    alt={currentBlog.author}
                    fill
                    sizes="62px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="mb-0.5 font-bold uppercase tracking-[0.16em] text-[#74a8ef] text-[9px] 2xl:text-[11px]">
                    Author
                  </p>

                  <p
                    className="font-semibold leading-snug text-white text-[12px] 2xl:text-[15px]"
                    title={currentBlog.author}
                  >
                    {currentBlog.author}
                  </p>
                </div>
              </div>

              <div className="hidden h-5 w-px shrink-0 bg-white/18 md:block" />

              {/* Date */}
              <div className="flex shrink-0 items-center whitespace-nowrap font-medium text-white/90 gap-2 text-[12px] 2xl:text-[15px]">
                <CalendarDays
                  strokeWidth={1.8}
                  className="shrink-0 text-[#ff735c] h-[16px] w-[16px] 2xl:h-5 2xl:w-5"
                />
                <span>{currentBlog.date}</span>
              </div>

              <div className="hidden h-5 w-px shrink-0 bg-white/18 md:block" />

              {/* Read Time */}
              <div className="flex shrink-0 items-center whitespace-nowrap font-medium text-white/90 gap-2 text-[12px] 2xl:text-[15px]">
                <Clock3
                  strokeWidth={1.8}
                  className="shrink-0 text-[#ff735c] h-[16px] w-[16px] 2xl:h-5 2xl:w-5"
                />
                <span>{currentBlog.readTime}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Image */}
        <div className="relative z-10 mt-10 block lg:hidden">
          <div
            className="relative h-[280px] w-full overflow-hidden rounded-tl-[70px] rounded-br-[24px] sm:h-[360px]"
            style={{
              WebkitClipPath:
                "polygon(18% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 50%)",
              clipPath:
                "polygon(18% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 50%)",
            }}
          >
            <Image
              src={currentBlog.coverImage}
              alt={currentBlog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}