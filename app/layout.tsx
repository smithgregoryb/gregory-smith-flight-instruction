import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Instructor Long Beach, CA | Gregory Smith",
  description:
    "Certified Flight Instructor providing personalized flight instruction in Long Beach, CA at Long Beach Airport (KLGB) and throughout Southern California.",
    alternates: {
  canonical: "https://gregorysmithcfi.com",
},
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gregory Smith Flight Instruction",
  url: "https://gregorysmithcfi.com",
  image: "https://gregorysmithcfi.com/gregory-smith-cfi.png",
  telephone: "+1-760-887-0222",
  description:
    "Certified Flight Instructor providing personalized flight and ground instruction in Long Beach, California, at Long Beach Airport (KLGB) and throughout Southern California.",
  areaServed: {
    "@type": "City",
    name: "Long Beach",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(localBusinessSchema),
    }}
  />
 {children}
</body></html>
);
}
