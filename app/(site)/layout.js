import Sidebar from "./_components/Sidebar";
import ToasterContext from "../context/ToasterContext";
import Providers from "@/app/(site)/Providers";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s - Fit Flow",
    default: "Welcome - Fit Flow",
    description:
      "Fit Flow is a modern and intuitive fitness tracker app designed to help users optimize their workout routines, track their progress, and maintain a healthy lifestyle. With sleek, user-friendly features, Fit Flow enables easy tracking of workouts, statistics, and personal goals. Whether you're a beginner or a seasoned athlete, Fit Flow offers the tools you need to stay motivated, monitor your fitness journey, and achieve your health goals.",
  },
};

export default function SiteLayout({ children }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
    >
      <Providers>
        <ToasterContext />

        <Sidebar />

        <main className="lg:ml-64 ml-0 w-full p-4 overflow-auto">
          {children}
        </main>
      </Providers>
    </div>
  );
}
