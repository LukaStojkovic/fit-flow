// app/layout.js
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
    title: "Fit Flow",
    default: "Welcome - Fit Flow",
    description:
      "Fit Flow is a modern and intuitive fitness tracker app designed to help users optimize their workout routines, track their progress, and maintain a healthy lifestyle. With sleek, user-friendly features, Fit Flow enables easy tracking of workouts, statistics, and personal goals. Whether you're a beginner or a seasoned athlete, Fit Flow offers the tools you need to stay motivated, monitor your fitness journey, and achieve your health goals.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#171F2D]`}
      >
        {children}
      </body>
    </html>
  );
}
