"use client";

import blogs from "../data/blogs.json";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  const allBlogs = blogs.slice(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-[100svh] bg-[#F2F0E9] pb-32 pt-[88px] sm:pt-[96px] lg:pt-[96px]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #F2F0E9 0%, #F2F0E9 10%, #EBE8DF 50%, #FFFCF8 100%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3563A8 0.8px, transparent 0.8px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 110% 75% at 50% 18%, black 15%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 110% 75% at 50% 18%, black 15%, transparent 70%)",
            }}
          />

          <motion.div
            className="absolute -left-[8%] -top-[12%] h-[750px] w-[750px] rounded-full blur-[180px]"
            style={{ background: "rgba(53, 99, 168, 0.08)" }}
            animate={{ x: [0, 55, 0], y: [0, -35, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -right-[12%] top-[28%] h-[650px] w-[650px] rounded-full blur-[160px]"
            style={{ background: "rgba(250, 84, 36, 0.05)" }}
            animate={{ x: [0, -45, 0], y: [0, 45, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-[8%] left-[22%] h-[520px] w-[520px] rounded-full blur-[150px]"
            style={{ background: "rgba(53, 99, 168, 0.06)" }}
            animate={{ x: [0, 35, 0], y: [0, -28, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1350px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-12 lg:pt-12">
          {/* Page Header */}
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="show"
            className="mb-12 flex flex-col items-center px-4 text-center sm:mb-16 lg:items-start lg:text-left"
          >
            <motion.div
              variants={cardVariants}
              className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FA5424] sm:text-[14px]">
                Abbad Dental Journal
              </span>
              <div className="h-2 w-2 rotate-45 bg-[#FA5424] sm:h-2.5 sm:w-2.5" />
            </motion.div>

            <motion.h1
              variants={cardVariants}
              className="mb-5 font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-[#131728] sm:mb-6 sm:text-5xl sm:leading-[1.05] lg:text-[4rem] xl:text-[4.5rem]"
            >
              Transforming{" "}
              <span className="text-[#3563A8]">Smile Knowledge</span>
            </motion.h1>

            <motion.p
              variants={cardVariants}
              className="max-w-full px-2 text-lg font-medium leading-relaxed text-slate-500 sm:px-0 sm:text-xl lg:text-[1.25rem]"
            >
              Helpful dental care articles, treatment guides, and expert advice
              to help you make informed oral health decisions. Discover
              professional tips for a stunning smile and stay updated with the
              latest innovations in modern dental care.
            </motion.p>
          </motion.div>

          {/* Latest Insights Header */}
          <div className="mb-10 mt-4 flex w-full flex-col items-center gap-6 sm:mb-16 sm:mt-8 sm:flex-row sm:gap-0">
            <div className="hidden h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200 sm:block" />

            <div className="flex shrink-0 items-center gap-3 px-4 sm:gap-4 sm:px-8">
              <div className="h-2 w-2 rotate-45 bg-[#FA5424] sm:h-2.5 sm:w-2.5" />
              <h2 className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-3xl">
                Latest Insights
              </h2>
              <div className="h-2 w-2 rotate-45 bg-[#3563A8] sm:h-2.5 sm:w-2.5" />
            </div>

            <div className="relative flex h-[1px] w-full flex-1 items-center justify-center bg-gradient-to-l from-transparent sm:w-auto sm:justify-end sm:via-slate-200 sm:to-slate-200">
              <div className="bg-[#FFFCF8] text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:pl-6 sm:text-sm">
                All {allBlogs.length} Articles
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="show"
            className="flex flex-wrap justify-center gap-8 px-2 sm:px-4 lg:gap-10 xl:gap-12"
          >
            {allBlogs.map((blog) => (
              <motion.div
                key={blog.slug}
                variants={cardVariants}
                className="relative flex w-full min-w-[280px] hover:z-[50] md:w-[calc(50%-1.25rem)] xl:w-[calc(33.333%-2.6rem)]"
              >
                <Link
                  href={`/Blogs/blogs/${blog.slug}`}
                  className="group flex w-full flex-col outline-none"
                >
                  <article className="relative flex w-full flex-1 flex-col rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(53,99,168,0.08)] sm:p-7">
                    <div className="absolute left-6 top-[12%] z-20 h-3 w-3 rotate-45 bg-[#FA5424] opacity-0 shadow-sm transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-100" />

                    <div className="absolute right-8 top-[8%] z-20 h-3 w-3 rotate-45 bg-[#3563A8] opacity-0 shadow-sm transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-100" />

                    {/* Diamond Image Container - No blur, full image visible */}
                    <div className="relative mx-auto mb-20 mt-6 h-[180px] w-[180px] hover:z-30 sm:h-[210px] sm:w-[210px] lg:h-[240px] lg:w-[240px]">
                      <div className="relative z-10 h-full w-full rotate-45 overflow-hidden rounded-[3.5rem] border-[6px] border-white bg-white shadow-lg transition-transform duration-500 group-hover:scale-[1.03]">
                        <div className="absolute inset-[14px] -rotate-45">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
                            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                      </div>

                      <div className="absolute left-1/2 top-1/2 z-0 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3.8rem] border-2 border-[#3563A8]/20 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <div className="z-10 flex flex-1 flex-col text-center sm:text-left">
                      <div className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#3563A8] sm:text-[11px]">
                        {blog.category}
                      </div>

                      <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-[1.35] text-[#1a1a1a] transition-colors group-hover:text-[#3563A8] sm:text-xl">
                        {blog.title}
                      </h3>

                      <p className="mb-8 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
                        {blog.excerpt}
                      </p>

                      {/* Bottom Meta */}
                      <div className="mt-auto flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:gap-2">
                        <div className="flex w-full items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:w-auto sm:justify-start sm:text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="h-3.5 w-3.5 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {blog.date}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <svg
                              className="h-3.5 w-3.5 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {blog.readTime}
                          </div>
                        </div>

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-100 text-slate-400 transition-colors group-hover:border-[#3563A8] group-hover:bg-[#3563A8] group-hover:text-white">
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}