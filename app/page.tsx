"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Treatments from "@/components/Treatments";
import Doctors from "@/components/doctors";
import PatientGallery from "@/components/Gallery";
import Awards from "@/components/Awards";
import Equipments from "@/components/Equipments";
import AssociateDoctors from "@/components/associatedoctors";
import AdvancedBooking from "@/components/booking";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    // Wait for GSAP and other heavy layout shifts to finish
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');

        // Try immediately
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });

        // Try again after a short delay in case GSAP shifts layout
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 150);

        // Final fallback after GSAP has fully initialized
        setTimeout(() => {
          const el3 = document.getElementById(id);
          if (el3) el3.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 600);
      }
    };
    handleHash();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <Doctors />
      <PatientGallery />
      <Awards />
      <Equipments />
      <AssociateDoctors />
      <AdvancedBooking />
      <Footer />
    </div>
  );
}
