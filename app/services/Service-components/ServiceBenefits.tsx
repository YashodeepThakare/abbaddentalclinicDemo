"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

interface ServiceBenefitsProps {
  benefits: string[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServiceBenefits({ benefits = [] }: ServiceBenefitsProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 bg-transparent relative overflow-hidden">
      {/* Background decorations removed for perfect match */}

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-10 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3563A8]/5 border border-[#3563A8]/10 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3563A8]" />
            <span className="text-[#3563A8] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-wider font-outfit">
              Treatment Advantages
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-slate-900 tracking-tight leading-tight mb-3 md:mb-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3563A8] to-[#FA5424]">Benefits</span>
          </h2>
          <p className="text-slate-600 font-outfit text-base md:text-lg lg:text-xl leading-relaxed">
            Discover the clinical and aesthetic advantages of choosing our advanced dental treatments tailored for your optimal oral health.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4 md:gap-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 md:gap-5 group"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#3563A8]/20 rounded-full blur-md group-hover:bg-[#FA5424]/30 transition-colors duration-500 scale-150" />
                    <CheckCircle2 className="relative w-6 h-6 md:w-7 md:h-7 text-[#3563A8] group-hover:text-[#FA5424] transition-colors duration-500" strokeWidth={2.5} />
                  </div>
                </div>
                <p className="text-slate-700 font-outfit text-base md:text-lg leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
