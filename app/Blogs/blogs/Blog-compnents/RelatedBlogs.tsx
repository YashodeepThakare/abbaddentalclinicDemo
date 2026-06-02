"use client";

import blogs from "@/app/Blogs/data/blogs.json";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RelatedBlogs({ currentSlug }: { currentSlug: string }) {

  const related = blogs
    .filter((b) => b.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-4 px-4 md:px-12 w-full max-w-[85rem] mx-auto pb-12 sm:pb-16">

      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-3xl font-extrabold text-[#0d1b3e] tracking-tight">
          Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Blogs</span>
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {related.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/Blogs/blogs/${blog.slug}`}
              className="group block h-full outline-none"
            >
              <article className="relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:bg-white/70">

                {/* Image container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 relative">

                  {/* Tiny floating category pill */}
                  {/* <div className="absolute -top-4 right-6 bg-white/90 backdrop-blur border border-slate-100 shadow-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {blog.category}
                  </div> */}

                  <h4 className="text-lg font-bold text-[#0d1b3e] leading-snug tracking-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mt-2">
                    {blog.title}
                  </h4>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {blog.readTime}
                    </span>

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 group-hover:scale-110">
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}