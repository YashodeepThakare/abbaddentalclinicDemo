"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Hero() {
  const router = useRouter();

  const stats = [
    { number: "20000+", label: "HAPPY SMILES" },
    { number: "16+", label: "YEARS EXP." },
    { number: "1000+", label: "IMPLANTS" },
    { number: "4.9", label: "RATING" },
  ];

  // --- MESSAGE LOGIC: REMAINS COMPLETELY UNCHANGED ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const submissionData = {
      name: formData.get('name') as string,
      email: 'Not provided',
      mobile: `+91 ${formData.get('mobile')}`,
      interest: 'Not specified',
      message: formData.get('message') as string || '',
      date: 'To be scheduled',
      slot: 'To be confirmed'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit booking');
      if (result.success) {
        const params = new URLSearchParams({
          name: submissionData.name,
          email: 'Not provided',
          date: 'To be scheduled',
          slot: 'To be confirmed',
          interest: 'Not specified'
        });
        router.push(`/thankyou?${params.toString()}`);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      alert(err.message || 'Failed to submit booking. Please try again.');
    }
  };

  return (
    <section 
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center bg-[#F1EFE8] pt-20 pb-12 md:pt-32 md:pb-16 lg:pt-26 lg:pb-24 overflow-x-hidden"
    >
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-bl from-[#3563A8]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        
        {/* RIGHT FORM SECTION */}
        <div className="relative order-1 lg:order-2 w-full flex justify-center lg:justify-end">
          <div className="absolute inset-0 translate-x-2 translate-y-2 md:translate-x-6 md:translate-y-6 border-[2px] md:border-[3px] border-[#3563A8]/30 rounded-[30px] z-0 w-full max-w-[340px] lg:max-w-[450px] mx-auto lg:mx-0 lg:ml-auto h-full"></div>

          <div className="relative w-full max-w-[340px] lg:max-w-[450px] bg-white rounded-[30px] shadow-2xl border-[3px] border-white p-5 md:p-8 z-10">
            <h3 className="font-playfair text-xl md:text-3xl text-[#1A1A1A] font-medium mb-1">Get in Touch</h3>
            <p className="font-outfit text-slate-500 text-[12px] md:text-sm mb-5">Leave your details and we will call you back.</p>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 md:space-y-4">
              <input type="text" name="name" placeholder="Your Name" className="font-outfit w-full bg-[#F1EFE8]/50 border border-slate-200 rounded-xl px-4 py-2.5 md:py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#3563A8]" required />
              <input type="tel" name="mobile" placeholder="Phone Number" maxLength={10} className="font-outfit w-full bg-[#F1EFE8]/50 border border-slate-200 rounded-xl px-4 py-2.5 md:py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#3563A8]" required />
              <textarea name="message" rows={2} placeholder="Your Query" className="font-outfit w-full bg-[#F1EFE8]/50 border border-slate-200 rounded-xl px-4 py-2.5 md:py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#3563A8] resize-none" required></textarea>
              <button type="submit" className="font-syne mt-1 w-full bg-[#3563A8] text-white px-6 py-3.5 md:py-4 rounded-full text-[10px] md:text-sm font-extrabold uppercase tracking-widest shadow-lg">Send Message ↗</button>
            </form>
          </div>
        </div>

        {/* LEFT CONTENT SECTION */}
        <div className="flex flex-col space-y-6 md:space-y-9 z-10 order-2 lg:order-1 items-start">
          <div className="space-y-3 md:space-y-4">
            <p className="font-syne text-[#3563A8] font-bold uppercase tracking-[0.2em] text-[9px] md:text-xs">EXPERT CARE FOR EVERY STAGE OF LIFE</p>
            <h1 className="font-playfair text-[#1A1A1A] text-[28px] xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] font-medium tracking-tight">
              Trusted Dentist in <br className="hidden xs:block" /> 
              <span className="font-syne italic text-[#3563A8]">Nashik</span> for <br className="hidden xs:block" /> 
              <span className="font-syne">Luxury Dental Care</span>
            </h1>
          </div>

          <p className="font-outfit text-slate-600 text-sm md:text-lg max-w-[480px] leading-relaxed">Experience world-class dental care at Abbad Dental Clinic. Specializing in advanced oral health.</p>

          {/* HIDDEN ON MOBILE: Ensures perfect stat spacing on phones */}
          <div className="pt-0.5 hidden md:block">
            <a href="#contact" className="font-syne inline-block bg-black text-white px-7 py-4 md:px-10 md:py-5 rounded-full text-[10px] md:text-xs font-extrabold uppercase tracking-widest shadow-xl">BOOK YOUR VISIT ↗</a>
          </div>

          <div className="flex flex-row justify-between pt-6 border-t border-slate-300/60 w-full lg:w-fit lg:gap-x-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col space-y-0.5">
                <span className="font-inter text-[19px] xs:text-lg md:text-3xl font-bold text-[#1A1A1A] tracking-tight whitespace-nowrap">{stat.number}</span>
                <span className="font-inter text-[6.5px] xs:text-[9px] md:text-xs uppercase tracking-wider text-slate-400 font-medium leading-tight">
                  {stat.label.split(' ').map((word, i) => (<React.Fragment key={i}>{word}<br/></React.Fragment>))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}