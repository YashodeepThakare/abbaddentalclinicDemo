"use client";

import { Link as LinkIcon, ChevronDown } from "lucide-react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function slugify(text: string) {
  if (typeof text !== "string") return "";
  
  // Strip markdown links [anchor](url) to just the anchor text for cleaner slugs
  const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return cleanText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen
          ? "linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(6,182,212,0.03) 100%)"
          : "rgba(241,245,249,0.6)",
        border: isOpen
          ? "1px solid rgba(37,99,235,0.15)"
          : "1px solid rgba(148,163,184,0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
      >
        <span className="text-[1.05rem] font-semibold text-[#0d1b3e] leading-snug group-hover:text-blue-600 transition-colors duration-300">
          {question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
              : "rgba(148,163,184,0.15)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={16} className={isOpen ? "text-white" : "text-slate-500"} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-0">
          <div className="h-[1px] w-full bg-gradient-to-r from-blue-200/50 via-cyan-200/30 to-transparent mb-4" />
          <p className="text-[1.02rem] leading-[1.8] text-slate-600 font-medium">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function parseLinks(text: string) {
  if (typeof text !== "string") return text;
  
  // Regex to match markdown link format: [anchor text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_, linkText, url] = match;
    const matchIndex = match.index;

    // Add text before the link
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Add the link element
    const isExternal = url.startsWith("http://") || url.startsWith("https://");
    parts.push(
      <a
        key={matchIndex}
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-blue-600 font-bold hover:text-blue-700 underline decoration-blue-200 underline-offset-4 transition-all duration-300 hover:decoration-blue-500 cursor-pointer"
      >
        {linkText}
      </a>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogContent({ content }: any) {
  const router = useRouter();
  const pathname = usePathname();
  let linkInserted = false;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = "/#home";
    } else {
      const target = document.querySelector("#home");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };


  // Find the index of the "Conclusion" heading, or default to the last few blocks
  const conclusionHeadingIndex = content.findLastIndex(
    (b: any) => b.type === "heading" && b.text.toLowerCase().includes("conclusion")
  );

  const targetStartIndex = conclusionHeadingIndex !== -1 ? conclusionHeadingIndex : content.length - 2;

  return (
    <div className="relative">
      {/* ── Gradient Background Layers ── */}
      <div
        className="absolute -top-12 -left-16 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -top-8 right-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-[40%] left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative rounded-3xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.08) 40%, rgba(241,245,249,0) 100%)",
        }}
      >
        <div
          className="relative rounded-3xl px-8 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-10"
          style={{
            background:
              "linear-gradient(180deg, #f0f9ff 0%, whitesmoke 100%)",
          }}
        >
          <article className="max-w-3xl mx-auto">
            {content.map((block: any, i: number) => {
              /* ---------------- HEADING ---------------- */
              if (block.type === "heading") {
                const id = slugify(block.text);
                return (
                  <motion.div
                    key={`heading-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative mt-16 first:mt-0"
                  >
                    <div className="absolute -left-6 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h2
                      id={id}
                      className="scroll-mt-36 text-2xl sm:text-3xl font-extrabold text-[#0d1b3e] tracking-tight flex items-center gap-3"
                    >
                      {parseLinks(block.text)}
                      <a
                        href={`#${id}`}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <LinkIcon size={18} className="text-blue-500" />
                      </a>
                    </h2>
                    <div className="mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </motion.div>
                );
              }

              /* ---------------- PARAGRAPH ---------------- */
              if (block.type === "paragraph") {
                let paragraphContent: React.ReactNode = block.text;

                // Only attempt insertion if we are at or after the target start index (Conclusion area)
                if (!linkInserted && i >= targetStartIndex) {
                  const targetPhrase = "Abbad Dental Clinic & Implant Center, Nashik";
                  const phraseIndex = block.text.indexOf(targetPhrase);

                  if (phraseIndex !== -1) {
                    linkInserted = true;
                    const before = block.text.substring(0, phraseIndex);
                    const after = block.text.substring(phraseIndex + targetPhrase.length);
                    paragraphContent = (
                      <>
                        {parseLinks(before)}
                        <a
                          href="/#home"
                          onClick={handleHomeClick}
                          className="text-blue-600 font-bold hover:text-blue-700 underline decoration-blue-200 underline-offset-4 transition-all duration-300 hover:decoration-blue-500 cursor-pointer"
                        >
                          {targetPhrase}
                        </a>
                        {parseLinks(after)}
                      </>
                    );
                  }
                  // If we are at the very last block and still haven't inserted, force it
                  else if (i === content.length - 1) {
                    linkInserted = true;
                    paragraphContent = (
                      <>
                        {parseLinks(block.text)}{" "}
                        <a
                          href="/#home"
                          onClick={handleHomeClick}
                          className="text-blue-600 font-bold hover:text-blue-700 underline decoration-blue-200 underline-offset-4 transition-all duration-300 hover:decoration-blue-500 cursor-pointer"
                        >
                          Visit Abbad Dental Clinic & Implant Center, Nashik for more information.
                        </a>
                      </>
                    );
                  }
                }

                if (paragraphContent === block.text) {
                  paragraphContent = parseLinks(block.text);
                }

                return (
                  <motion.p
                    key={`para-${i}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-6 text-[1.075rem] leading-[1.85] text-slate-600 font-medium"
                  >
                    {paragraphContent}
                  </motion.p>
                );
              }

              /* ---------------- LIST ---------------- */
              if (block.type === "list") {
                return (
                  <motion.ul
                    key={`list-${i}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-6 space-y-4 pl-1"
                  >
                    {block.items.map((item: string, j: number) => (
                      <li
                        key={j}
                        className="flex items-start gap-4 text-slate-600 text-[1.05rem] leading-relaxed font-medium"
                      >
                        <span className="mt-2 flex-shrink-0 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/30" />
                        <span>{parseLinks(item)}</span>
                      </li>
                    ))}
                  </motion.ul>
                );
              }

              /* ---------------- FAQ ---------------- */
              if (block.type === "faq") {
                // Only render the FAQ group at the first FAQ item to avoid duplicates
                const isFirstFaq = i === 0 || content[i - 1]?.type !== "faq";
                if (!isFirstFaq) return null;

                // Collect all consecutive FAQ items starting from this index
                const faqItems: { question: string; answer: string }[] = [];
                for (let k = i; k < content.length; k++) {
                  if (content[k].type === "faq") {
                    faqItems.push({ question: content[k].question, answer: content[k].answer });
                  } else {
                    break;
                  }
                }

                return (
                  <motion.div
                    key={`faq-group-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10"
                  >
                    <div className="space-y-3">
                      {faqItems.map((faq, faqIndex) => (
                        <FAQItem
                          key={faqIndex}
                          question={faq.question}
                          answer={faq.answer}
                          index={faqIndex}
                        />
                      ))}
                    </div>

                    {/* FAQ Structured Data for SEO */}
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "FAQPage",
                          mainEntity: faqItems.map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                              "@type": "Answer",
                              text: faq.answer,
                            },
                          })),
                        }),
                      }}
                    />
                  </motion.div>
                );
              }

              return null;
            })}
          </article>
        </div>
      </div>
    </div>
  );
}