"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceFAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function ServiceFAQ({ faqs = [] }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
              Common Queries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 mb-3 md:mb-4">
            Frequently Asked <span className="text-[#3563A8]">Questions</span>
          </h2>
          <p className="text-slate-600 font-outfit text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Find answers to common queries about this treatment.
          </p>
        </motion.div>

        {/* FAQs Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-[#3563A8] shadow-md bg-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left focus:outline-none group"
              >
                <span className={`font-bold font-outfit text-base sm:text-lg md:text-xl transition-colors pr-4 ${openIndex === index ? 'text-[#3563A8]' : 'text-slate-800 group-hover:text-[#3563A8]'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#3563A8]' : 'text-slate-400 group-hover:text-slate-600'}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-4 sm:p-5 md:p-6 pt-0 sm:pt-0 md:pt-0 text-slate-600 font-outfit text-sm sm:text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
