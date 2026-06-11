"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import servicesData from "./data/services.json";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F2F0E9] flex flex-col text-black font-outfit">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-4 px-4 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3563A8]/10 text-[#3563A8] font-bold text-sm tracking-widest uppercase mb-6"
          >
            <Sparkles size={16} />
            Our Expertise
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#3563A8] mb-6"
          >
            Comprehensive Treatments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed"
          >
            Experience world-class dental care tailored to your unique needs.<br className="hidden md:block" /> We combine advanced technology with luxurious comfort.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-0 md:pt-2 pb-12 md:pb-20 px-4 md:px-12 flex-1">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-black/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 p-4">
                  <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 relative">
                  <h3 className="text-2xl font-bold font-serif text-[#3563A8] mb-4 group-hover:text-[#FA5424] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-black/70 mb-8 flex-1 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b-2 border-black/20 w-fit pb-1 hover:text-[#FA5424] hover:border-[#FA5424] transition-all cursor-pointer mt-auto group/link"
                  >
                    Explore Treatment
                    <ArrowRight className="w-4 h-4 text-[#FA5424] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
