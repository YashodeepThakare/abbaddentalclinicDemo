import { notFound } from "next/navigation";
import { Metadata } from "next";
import servicesData from "../data/services.json";

import ServiceHero from "../Service-components/ServiceHero";
import ServiceContent from "../Service-components/ServiceContent";
import ServiceBenefits from "../Service-components/ServiceBenefits";
import ServiceProcedure from "../Service-components/ServiceProcedure";
import ServiceNeed from "../Service-components/ServiceNeed";
import ServiceWhyChoose from "../Service-components/ServiceWhyChoose";
import ServiceAssessment from "../Service-components/ServiceAssessment";
import ServiceTechnology from "../Service-components/ServiceTechnology";
import ServiceFAQ from "../Service-components/ServiceFAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar variant="dark" />
      <main className="min-h-screen bg-[#F2F0E9]">
        <ServiceHero
          slug={service.slug}
          title={service.title}
          heroTagline={service.heroTagline}
          shortDescription={service.shortDescription}
          image={service.image}
        />
        <ServiceContent overview={service.overview} />
        <ServiceBenefits benefits={service.benefits} />
        <ServiceProcedure procedure={service.procedure} />
        <ServiceNeed whoNeedsThis={service.whoNeedsThis} />
        <ServiceWhyChoose whyChooseUs={service.whyChooseUs} title={service.title} />
        {service.assessment && (
          <ServiceAssessment assessment={service.assessment} />
        )}
        <ServiceTechnology technologyUsed={service.technologyUsed} />
        <ServiceFAQ faqs={service.faqs} />
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || "",
    alternates: {
      canonical: service.seo?.canonical || `https://www.abbaddentalclinic.com/services/${slug}`,
    },
    keywords: service.seo?.keywords || [],
  };
}
