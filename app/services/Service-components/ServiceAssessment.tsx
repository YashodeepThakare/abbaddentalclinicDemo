"use client";

import { ClipboardCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceAssessmentProps {
  assessment?: {
    title: string;
    description: string;
    doctorName: string;
    doctorTitle: string;
    checklist: string[];
  };
}

export default function ServiceAssessment({ assessment }: ServiceAssessmentProps) {
  if (!assessment) return null;

  const {
    title = "Clinical Assessment & Diagnostic Checklist",
    description = "We perform a comprehensive evaluation of your oral health to plan the most suitable treatment approach.",
    doctorName = "Dr. Nikhil Abbad",
    doctorTitle = "M.D.S. Gold Medalist",
    checklist = []
  } = assessment;

  const titleWords = title.split(" ");
  const lastTitleWord = titleWords.pop() || "";
  const remainingTitle = titleWords.join(" ");

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Doctor Profile & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
              <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
                Clinical Assessment
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 leading-tight">
              {remainingTitle} <span className="text-[#3563A8]">{lastTitleWord}</span>
            </h2>
            <p className="text-slate-600 font-outfit text-base sm:text-lg leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4 pt-4 sm:pt-5 border-t border-slate-200">
              <div className="w-12 h-12 rounded-full bg-[#3563A8] flex items-center justify-center text-white font-bold text-lg font-outfit shrink-0">
                {doctorName.split(" ").slice(-1)[0]?.charAt(0) || "D"}
              </div>
              <div>
                <p className="font-bold text-slate-900 font-outfit text-base sm:text-lg">{doctorName}</p>
                <p className="text-xs sm:text-sm text-[#FA5424] font-semibold font-outfit uppercase tracking-wider">{doctorTitle}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Diagnostic Checklist */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl shadow-slate-200/40 border border-slate-100"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-2 sm:pb-3 mb-4 sm:mb-5 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#3563A8]" />
                Key Evaluation Criteria
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {checklist.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: index * 0.06 + 0.2 }}
                    className="relative flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-[#3563A8]/5 hover:border-[#3563A8]/20 transition-all duration-300 group cursor-default"
                  >
                    {/* Left accent bar */}
                    <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-[#3563A8]/20 group-hover:bg-[#3563A8] transition-colors duration-300" />

                    {/* Number badge */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#3563A8] to-[#2a4f8a] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 sm:mt-0">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white font-outfit">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-slate-700 text-sm sm:text-[15px] font-medium font-outfit leading-snug group-hover:text-slate-900 transition-colors pt-1 sm:pt-0.5">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
