import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Outfit,
  DM_Sans,
  Playfair_Display,
  Syne,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingIcons from "@/components/FloatingIcons";

/* ---------------- Fonts ---------------- */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ---------------- SEO Metadata ---------------- */

export const metadata: Metadata = {
  title: "Dentist in Nashik | Dental Clinic in Nashik - Abbad Dental Clinic",
  description:
    "Visit Abbad Dental Clinic in Nashik, led by Dr. Nikhil Abbad, a Gold Medalist Prosthodontist specializing in Prosthodontics, Crowns & Bridges, & Implantology.",
  alternates: {
    canonical: "https://www.abbaddentalclinic.com/",
  },
  openGraph: {
    type: "website",
    title: "Abbad Dental Clinic and Implant Center",
    description:
      "Enhance your smile and boost your confidence with the best dentist in Nashik at Abbad Dental Clinic and Implant Center in Nashik.",
    url: "https://www.abbaddentalclinic.com/",
    images: [
      {
        url: "https://www.abbaddentalclinic.com/_next/image?url=%2Fassets%2Fphoto%2F1.JPG&w=640&q=75",
        width: 640,
        height: 427,
        alt: "Abbad Dental Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ACenter75541",
    title: "Abbad Dental Clinic and Implant Center",
    description:
      "Enhance your smile and boost your confidence with the best dentist in Nashik at Abbad Dental Clinic and Implant Center in Nashik.",
    images: [
      "https://www.abbaddentalclinic.com/_next/image?url=%2Fassets%2Fphoto%2F1.JPG&w=640&q=75",
    ],
  },
};

/* ---------------- Root Layout ---------------- */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full max-w-full overflow-x-clip">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-555KMQB5');
          `}
        </Script>

        {/* LocalBusiness Schema */}
        <Script id="localbusiness-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Abbad Dental Clinic & Implant Center",
            image:
              "https://www.abbaddentalclinic.com/_next/image?url=%2Fassets%2Fphoto%2F1.JPG&w=640&q=75",
            url: "https://www.abbaddentalclinic.com/",
            telephone: "9713435111",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "2-3, Jubiliant Heights, near Nirman House, Vidya Vikas Circle, towards College road",
              addressLocality: "Nashik",
              postalCode: "422005",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 20.0073972,
              longitude: 73.7640498,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "21:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "10:00",
                closes: "13:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/abbaddentalclinicnashik/",
              "https://linktr.ee/AbbadDentalClinic",
              "https://www.instagram.com/abbaddentalclinic/",
              "https://www.youtube.com/@abbaddentalclinicnashik",
              "https://twitter.com/ACenter75541",
              "https://www.justdial.com/Nashik/Abbad-Dental-Clinic-Implant-Center-Vidya-Vikas-Circle-Towards-College-Rd-College-Road/0253PX253-X253-221218231157-S3D4_BZDET",
              "https://www.threads.net/@abbaddentalclinic",
              "https://www.linkedin.com/company/abbad-dental-clinic-and-implant-center/",
            ],
          })}
        </Script>

        {/* Dentist Schema – Dr. Nikhil Abbad */}
        <Script id="dentist-nikhil" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "Dr. Nikhil Bharat Abbad",
            image:
              "https://www.abbaddentalclinic.com/assets/photo/Detnikhil.webp",
            url: "https://www.abbaddentalclinic.com/",
            telephone: "9713435111",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "2-3, Jubiliant Heights, near Nirman House, Vidya Vikas Circle, towards College road",
              addressLocality: "Nashik",
              postalCode: "422005",
              addressCountry: "IN",
            },
            sameAs: [
              "https://mymedisage.com/profile/567834",
              "https://www.practo.com/nashik/doctor/nikhil-bharat-abbad-dentist",
              "https://www.docindia.org/doctors/nashik/dr-nikhil-abbad-dentist",
              "https://kivihealth.com/iam/dr..nikhil.abbad.d3a10yh9ls4n",
              "https://in.linkedin.com/in/dr-nikhil-abbad-940b871b3",
            ],
          })}
        </Script>

        {/* Dentist Schema – Dr. Leena Abbad */}
        <Script id="dentist-leena" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "Dr. Leena Nikhil Abbad",
            image:
              "https://www.abbaddentalclinic.com/assets/photo/Detleena.webp",
            url: "https://www.abbaddentalclinic.com/",
            telephone: "9923708277",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "2-3, Jubiliant Heights, near Nirman House, Vidya Vikas Circle, towards College road",
              addressLocality: "Nashik",
              postalCode: "422005",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.clinicspots.com/doctor/dr-leena-abbad",
              "https://www.practo.com/nashik/doctor/leena-abbad-dentist",
            ],
          })}
        </Script>
      </head>

      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          ${outfit.variable} ${dmSans.variable} ${playfair.variable}
          ${syne.variable}
          antialiased font-outfit overflow-x-clip max-w-full
        `}
      >
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-555KMQB5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip">

          <main className="w-full max-w-full overflow-x-clip">
            {children}
          </main>

          <FloatingIcons />
        </div>
      </body>
    </html>
  );
}