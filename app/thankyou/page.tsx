"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Calendar, Clock, Mail, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";

const COLOR_CREAM = "#F2F0E9";
const COLOR_BLUE = "#3563A8";
const COLOR_ORANGE = "#FA5424";

// Separate component that uses useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get booking details from URL params
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const date = searchParams.get('date') || '';
  const slot = searchParams.get('slot') || '';
  const interest = searchParams.get('interest') || '';

  // If no booking details, redirect to home
  React.useEffect(() => {
    if (!name || !email || !date || !slot) {
      router.push('/#contact');
    }
  }, [name, email, date, slot, router]);

  // Animate on mount
  React.useEffect(() => {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.onload = () => {
      const gsap = (window as any).gsap;
      if (gsap) {
        gsap.from('.animate-in', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    };
    document.body.appendChild(gsapScript);

    return () => {
      const script = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!name || !email || !date || !slot) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Success Icon with Pulse Effect */}
      <div className="relative flex justify-center mb-8 animate-in">
        <div 
          className="absolute w-32 h-32 rounded-full pulse-ring"
          style={{ backgroundColor: `${COLOR_BLUE}33` }}
        />
        <div 
          className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl float-animation"
          style={{ backgroundColor: COLOR_BLUE }}
        >
          <Check size={48} className="text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-in">
        {/* Header */}
        <div 
          className="text-center px-6 py-12 md:px-12 md:py-16"
          style={{ 
            background: `linear-gradient(135deg, ${COLOR_BLUE}15 0%, ${COLOR_CREAM} 100%)` 
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} style={{ color: COLOR_ORANGE }} />
            <span 
              className="text-xs font-bold tracking-[0.2em] uppercase font-sans"
              style={{ color: COLOR_ORANGE }}
            >
              Booking Confirmed
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4 text-[#1A1A1A] leading-tight">
            Thank You, <br/>
            <span className="italic" style={{ color: COLOR_BLUE }}>
              {name}!
            </span>
          </h1>
          
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Your appointment request has been successfully received. We're excited to see you soon!
          </p>
        </div>

        {/* Appointment Details */}
        <div className="px-6 py-8 md:px-12 md:py-12">
          <div 
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{ backgroundColor: `${COLOR_ORANGE}10`, borderLeft: `4px solid ${COLOR_ORANGE}` }}
          >
            <h2 className="text-lg font-serif mb-6 text-[#1A1A1A] flex items-center gap-2">
              <span>📋</span> Your Appointment Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold font-sans mb-1">
                    Appointment Date
                  </p>
                  <p className="text-base md:text-lg font-serif text-[#1A1A1A] font-semibold">
                    {date}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold font-sans mb-1">
                    Time Slot
                  </p>
                  <p className="text-base md:text-lg font-serif text-[#1A1A1A] font-semibold">
                    {slot}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold font-sans mb-1">
                    Confirmation Email
                  </p>
                  <p className="text-base md:text-lg font-serif text-[#1A1A1A] font-semibold break-all">
                    {email}
                  </p>
                </div>
              </div>

              {interest && interest !== 'Not specified' && (
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: COLOR_BLUE }}
                  >
                    <span className="text-xl">💡</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-bold font-sans mb-1">
                      Treatment Interest
                    </p>
                    <p className="text-base md:text-lg font-serif text-[#1A1A1A] font-semibold">
                      {interest}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-[#F9F8F4] rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-serif mb-4 text-[#1A1A1A] flex items-center gap-2">
              <span>✨</span> What Happens Next?
            </h3>
            <ul className="space-y-3 font-sans text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  1
                </span>
                <span>You'll receive a confirmation email at <strong>{email}</strong> within the next few minutes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  2
                </span>
                <span>Our team will review your request and contact you within 24 hours to confirm your appointment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: COLOR_BLUE }}
                >
                  3
                </span>
                <span>If you have any questions, feel free to reach out to us directly.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-xl text-white"
              style={{ 
                backgroundColor: COLOR_ORANGE,
                boxShadow: `0 10px 20px -5px ${COLOR_ORANGE}4D`
              }}
            >
              <Calendar size={18} />
              <span>Book Another Appointment</span>
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all border-2 hover:shadow-lg"
              style={{ 
                borderColor: COLOR_BLUE,
                color: COLOR_BLUE
              }}
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs text-gray-400 mt-8 font-sans">
        Need to reschedule? Contact us and we'll be happy to help.
      </p>
    </div>
  );
}

// Main component with Suspense wrapper
export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <section 
        className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: COLOR_CREAM }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Manrope', sans-serif; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          
          .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>

        <Suspense fallback={
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: COLOR_BLUE }}></div>
              <p className="text-gray-600 font-sans">Loading your confirmation...</p>
            </div>
          </div>
        }>
          <ThankYouContent />
        </Suspense>
      </section>
    </>
  );
}
