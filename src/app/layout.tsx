import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/providers/lenis";
import { ScrollProgressAllSides } from "@/components/ui/scroll-progress";
import ClientClickSpark from "@/components/ClientClickSpark";

export const metadata: Metadata = {
  title: "GikaGraph - Entity Intelligence Platform",
  description: "Transform fragmented data into grounded, actionable insights with specialized small language models.",
  icons: {
    icon: "/logo.png",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                // Default to dark theme if no preference is set
                if (theme !== 'light') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                // Default to dark on error
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased w-full min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* LightRays background - fixed behind all content */}
        {/* <BackgroundEffects /> */}
        <LenisProvider>
          <ClientClickSpark
            sparkColor='#00ffa2ff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <ScrollProgressAllSides/>
            {children}
          </ClientClickSpark>
        </LenisProvider>
      </body>
    </html>
  );
}
