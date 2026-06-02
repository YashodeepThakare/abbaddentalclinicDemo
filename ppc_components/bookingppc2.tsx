"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  MapPin,
  Sparkles,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- CONFIGURATION ---
const COLOR_CREAM = "#F8F7F3";
const COLOR_BRAND = "#3563A8"; // Updated to your requested color
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

interface ValidationError { 
  field: string; 
  message: string; 
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optimized Validation Logic (Fewer CPU cycles for mobile)
    if (!formData.name.trim()) {
      setError({ field: 'name', message: 'Name is required' });
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setError({ field: 'mobile', message: 'Valid mobile number is required (10 digits)' });
      return;
    }

    // --- BOOKING LOGIC PRESERVED ---
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
        headers: { 'Content-Type': 'application/json' },
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
      }
    } catch (err: any) {
      setError({ 
        field: 'submit', 
        message: err.message || 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id='contact'
      className="relative min-h-screen w-full flex flex-col items-center justify-start py-6 sm:py-12 px-4 sm:px-12 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="w-full max-w-[1400px] mb-8 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT SIDE - INFO CARD */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6" style={{ color: COLOR_BRAND }}>
              <Sparkles size={18} />
              <span className="text-xs font-bold tracking-widest uppercase font-syne">
                Book Appointment
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-playfair" style={{ color: COLOR_DARK }}>
                Craft Your <br />
                <span className="italic" style={{ color: COLOR_BRAND }}>Perfect</span> <br />
                Visit.
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed font-outfit max-w-sm">
                Experience bespoke dental care. Fill out the form, and our team will confirm your consultation shortly.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-100 border border-gray-100">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" 
                style={{ backgroundColor: COLOR_BRAND }}
              >
                <MapPin size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 font-playfair" style={{ color: COLOR_DARK }}>
                Our Studio
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-outfit">
                2-3, Jubiliant Heights near Nirman House, Vidya Vikas Circle, College Rd, Nashik, 422005
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="lg:col-span-3">
            <div className="rounded-[2.5rem] p-6 sm:p-12 h-full" style={{ backgroundColor: COLOR_CREAM }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-playfair" style={{ color: COLOR_DARK }}>
                Personal Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 font-outfit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider block text-slate-400 font-syne">Full Name *</label>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                      <User size={18} className="text-gray-400 flex-shrink-0" />
                      <input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="Enter your name" 
                        className="bg-transparent w-full outline-none text-sm text-slate-900 placeholder:text-gray-300"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error?.field === 'name' && (
                      <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {error.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider block text-slate-400 font-syne">Mobile Number *</label>
                    <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-100 p-4">
                      <span className="text-sm font-bold text-slate-500 border-r pr-3 border-gray-200">+91</span>
                      <input 
                        type="tel"
                        value={formData.mobile} 
                        onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/[^0-9]/g, '')})} 
                        placeholder="98765 43210" 
                        maxLength={10}
                        className="bg-transparent w-full outline-none text-sm text-slate-900 placeholder:text-gray-300"
                        disabled={isSubmitting}
                      />
                    </div>
                    {error?.field === 'mobile' && (
                      <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {error.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider block text-slate-400 font-syne">Treatment Interested In</label>
                  <div className="relative bg-white rounded-2xl border border-gray-100 p-1">
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-transparent p-4 outline-none text-sm text-slate-900 appearance-none cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Treatment</option>
                      {INTERESTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider block text-slate-400 font-syne">Additional Message (Optional)</label>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                    <MessageSquare size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                    <textarea 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      placeholder="Any specific dental concerns..." 
                      className="bg-transparent w-full outline-none text-sm text-slate-900 placeholder:text-gray-300 resize-none"
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {error?.field === 'submit' && (
                    <div className="text-red-500 text-sm flex items-center gap-2 mb-4 bg-red-50 p-4 rounded-2xl">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{error.message}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 font-syne"
                    style={{ backgroundColor: isSubmitting ? '#ccc' : COLOR_BRAND }}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}