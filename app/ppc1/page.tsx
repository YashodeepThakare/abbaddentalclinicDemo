import React from "react";
import Navbar from "@/ppc_components/Navbar";
import Hero from "@/ppc_components/heroppc";
import About from "@/ppc_components/aboutppc";
import Treatments from "@/ppc_components/treatmentsppc";
import DoctorsSection from "@/ppc_components/doctorspcc";
import DentalShowcase from "@/ppc_components/galleryppc";
import AwardsSection from "@/ppc_components/awardsppc";
import StaticBooking from "@/ppc_components/bookingppc";
import SimpleFooter from "@/ppc_components/footerppc";
export default function PPC1Page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <DoctorsSection />
      <DentalShowcase />
      <AwardsSection />
      <StaticBooking />
      <SimpleFooter />

    </div>
  );
}
