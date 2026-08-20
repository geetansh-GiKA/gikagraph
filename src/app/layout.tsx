import type { Metadata } from "next";
import "./globals.css";
import { domAnimation, LazyMotion } from "framer-motion";

export const metadata: Metadata = {
  title: "GiKA GRAPH - Entity Intelligence Platform",
  description:
    "Transform fragmented data into grounded, actionable insights with specialized small language models.",
  icons: {
    icon: "/Company/Company.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout; two of these fonts aren't in next/font/google's metadata */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Domine:wght@400..700&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&family=Unica+One&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                document.documentElement.classList.add('light');
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased w-full min-h-screen"
        suppressHydrationWarning
      >
        <LazyMotion features={domAnimation}>
          <div className="overflow-x-clip">{children}</div>
        </LazyMotion>
      </body>
    </html>
  );
}
