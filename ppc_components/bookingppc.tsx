"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  Loader2,
  MapPin,
  Sparkles,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- CONFIGURATION ---
const COLOR_CREAM = "#F8F7F3";
const COLOR_BLUE = "#3563A8";
const COLOR_DARK = "#1A1A1A";

const INTERESTS = [
  "Braces/ aligners",
  "Dental implants",
  "Dental veneers",
  "Full mouth rehabilitation",
  "Pediatric dentistry",
  "Root canal",
  "Wisdom teeth extraction",
  "Other"
];

type ErrorPriority = 'CRITICAL' | 'WARNING';
interface ValidationError { 
  field: string; 
  message: string; 
  priority: ErrorPriority; 
}

class ValidationHeap {
  private heap: ValidationError[] = [];
  push(error: ValidationError) { 
    this.heap.push(error); 
    this.heap.sort((a, b) => (a.priority === 'CRITICAL' ? -1 : 1)); 
  }
  pop() { return this.heap.shift(); }
  clear() { this.heap = []; }
  peek() { return this.heap[0]; }
}

export default function SimplifiedBooking() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '', 
    mobile: '', 
    interest: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);
  const validator = useRef(new ValidationHeap());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validator.current.clear();
    
    // Validation
    if (!formData.name.trim()) {
      validator.current.push({ field: 'name', message: 'Name is required', priority: 'CRITICAL' });
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      validator.current.push({ field: 'mobile', message: 'Valid mobile number is required (10 digits)', priority: 'CRITICAL' });
    }
    
    const topError = validator.current.peek();
    if (topError) {
      setError(topError);
      return;
    }

    const submissionData = {
      name: formData.name,
      email: 'Not provided',
      mobile: `+91 ${formData.mobile}`,
      interest: formData.interest || 'Not specified',
      message: formData.message || '',
      date: 'To be scheduled',
      slot: 'To be confirmed'
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking');
      }

      if (result.success) {
        const params = new URLSearchParams({
          name: formData.name,
          email: 'Not provided',
          date: 'To be scheduled',
          slot: 'To be confirmed',
          interest: formData.interest || 'Not specified'
        });
        
        router.push(`/thankyou?${params.toString()}`);
      } else {
        throw new Error('Booking submission failed');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setError({ 
        field: 'submit', 
        message: err.message || 'Failed to submit booking. Please try again.', 
        priority: 'CRITICAL' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id='contact'
      className="relative min-h-screen w-full flex flex-col items-center justify-start py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Main Content Container */}
      <div className="w-full max-w-[1400px] mb-8 sm:mb-12">
        
        {/* Two Column Layout - Info Card + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* LEFT SIDE - INFO CARD (2 columns on desktop) */}
          <div className="lg:col-span-2">
            
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6" style={{ color: COLOR_BLUE }}>
              <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase font-syne">
                Book Appointment
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 font-playfair" style={{ color: COLOR_DARK }}>
                Craft Your <br />
                <span className="italic" style={{ color: COLOR_BLUE }}>Perfect</span> <br />
                Visit.
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-outfit">
                Experience bespoke dental care. Fill out the form, and our team will confirm your consultation shortly.
              </p>
            </div>
            
            {/* Our Studio Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6" 
                style={{ backgroundColor: COLOR_BLUE }}
              >
                <MapPin size={24} className="sm:w-[28px] sm:h-[28px] text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-playfair" style={{ color: COLOR_DARK }}>
                Our Studio
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-outfit">
                2-3, Jubiliant Heights near Nirman House, Vidya Vikas Circle, towards, College Rd, Nashik, Maharashtra 422005
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM (3 columns on desktop) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 h-full" style={{ backgroundColor: COLOR_CREAM }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 font-playfair" style={{ color: COLOR_DARK }}>
                Personal Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 font-outfit">
                {/* Full Name and Mobile in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="space-y-2 sm:space-y-3">
                    <label 
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-slate-400 font-syne"
                    >
                      Full Name *
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100">
                      <User size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
                      <input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="Enter your name" 
                        className="bg-transparent w-full outline-none text-xs sm:text-sm text-slate-900 placeholder:text-gray-300 font-outfit"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error?.field === 'name' && (
                      <p className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 font-outfit">
                        <AlertCircle size={10} className="sm:w-3 sm:h-3" />
                        {error.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Mobile Number */}
                  <div className="space-y-2 sm:space-y-3">
                    <label 
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-slate-400 font-syne"
                    >
                      Mobile Number *
                    </label>
                    <div className="flex items-center gap-2 bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4">
                      <span className="text-xs sm:text-sm font-bold text-slate-500 border-r pr-2 sm:pr-3 border-gray-200 flex-shrink-0 font-outfit">+91</span>
                      <input 
                        type="tel"
                        value={formData.mobile} 
                        onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/[^0-9]/g, '')})} 
                        placeholder="98765 43210" 
                        maxLength={10}
                        className="bg-transparent w-full outline-none text-xs sm:text-sm text-slate-900 placeholder:text-gray-300 font-outfit"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error?.field === 'mobile' && (
                      <p className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 font-outfit">
                        <AlertCircle size={10} className="sm:w-3 sm:h-3" />
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Interest */}
                <div className="space-y-2 sm:space-y-3">
                  <label 
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-slate-400 font-syne"
                  >
                    Treatment Interested In
                  </label>
                  <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-100">
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-transparent p-3 sm:p-4 outline-none text-xs sm:text-sm text-slate-900 appearance-none cursor-pointer font-outfit"
                      disabled={isSubmitting}
                    >
                      <option value="" className="text-slate-400">Select Treatment</option>
                      {INTERESTS.map(t => <option key={t} value={t} className="text-slate-900">{t}</option>)}
                    </select>
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>

                {/* Your Message */}
                <div className="space-y-2 sm:space-y-3">
                  <label 
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-slate-400 font-syne"
                  >
                    Additional Message (Optional)
                  </label>
                  <div className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100">
                    <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 mt-1 flex-shrink-0" />
                    <textarea 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      placeholder="Any specific dental concerns or questions..." 
                      className="bg-transparent w-full outline-none text-xs sm:text-sm text-slate-900 placeholder:text-gray-300 resize-none font-outfit"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                  {error?.field === 'submit' && (
                    <div className="text-red-500 text-xs sm:text-sm flex items-center gap-2 mb-4 bg-red-50 p-3 sm:p-4 rounded-xl font-outfit">
                      <AlertCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{error.message}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 disabled:bg-gray-300 disabled:shadow-none shadow-lg font-syne"
                    style={{ backgroundColor: isSubmitting ? '#ccc' : COLOR_BLUE }}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                    {!isSubmitting && <ArrowRight size={18} className="sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Section - Full Width at Bottom */}
      <div className="w-full max-w-[1400px]">
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.0241710006144!2d73.76369857512968!3d20.007500222070487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebd7e904d06d%3A0xa9915d276618b1a!2sAbbad%20Dental%20Clinic%20Nashik!5e0!3m2!1sen!2sin!4v1767267291068!5m2!1sen!2sin"
            width="100%" 
            height="300"
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full sm:h-[400px] md:h-[450px] lg:h-[500px]"
            title="Abbad Dental Clinic Nashik"
          />
        </div>
      </div>
    </section>
  );
}
