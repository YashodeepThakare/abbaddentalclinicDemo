export const metadata = {
  title: "Our Services | Abbad Dental Clinic & Implant Center",
  description:
    "Explore our comprehensive dental services including implants, crowns, root canal, veneers, braces, and more at Abbad Dental Clinic & Implant Center, Nashik.",
  openGraph: {
    title: "Our Services | Abbad Dental Clinic & Implant Center",
    description:
      "Comprehensive dental services at Abbad Dental Clinic & Implant Center, Nashik.",
    url: "https://www.abbaddentalclinic.com/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
