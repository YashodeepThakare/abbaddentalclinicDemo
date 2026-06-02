export const metadata = {
  title: "Dental Health Insights | Abbad Dental Clinic & Implant Center Blogs",
  description:
    "Explore expert dental tips, oral health guides, treatment guides, and oral care advice from Abbad Dental Clinic & Implant Center specialists in Nashik.",
  openGraph: {
    title: "Dental Health Insights | Abbad Dental Clinic & Implant Center Blogs",
    description:
      "Expert dental advice and treatment guides from Abbad Dental Clinic & Implant Center.",
    url: "https://www.abbaddentalclinic.com/blogs",
    type: "website",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}