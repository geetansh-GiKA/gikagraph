"use client";

import SlideEffect from "@/components/slide-effect";

const logos = [
  { name: "Jira", src: "https://cdn.simpleicons.org/jira/2684FF" },
  { name: "Confluence", src: "https://cdn.simpleicons.org/confluence/2684FF" },
  { name: "HubSpot", src: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Notion", src: "https://cdn.simpleicons.org/notion/000000" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/181717" },
  { name: "Zendesk", src: "https://cdn.simpleicons.org/zendesk/03363D" },
  { name: "Slack", src: "https://cdn.simpleicons.org/slack/4A154B" },
  {
    name: "Microsoft Teams",
    src: "https://cdn.simpleicons.org/microsoftteams/6264A7",
  },
  {
    name: "Google Drive",
    src: "https://cdn.simpleicons.org/googledrive/4285F4",
  },
  { name: "Salesforce", src: "https://cdn.simpleicons.org/salesforce/00A1E0" },
];

function LogoTile({ name, src }: { name: string; src: string }) {
  return (
    <div className="shrink-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl border border-border bg-background flex items-center justify-center mx-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="w-7 h-7 md:w-8 md:h-8 object-contain"
      />
    </div>
  );
}

export default function IntegrationsMarquee() {
  return (
    <div className="space-y-10 md:space-y-12 mx-auto text-center">
      <SlideEffect>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight max-w-2xl mx-auto">
          We turn scattered data into a knowledge graph
        </h2>
      </SlideEffect>

      <SlideEffect delay={0.15}>
        <div className="relative overflow-hidden w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <LogoTile
                key={`${logo.name}-${i}`}
                name={logo.name}
                src={logo.src}
              />
            ))}
          </div>
        </div>
      </SlideEffect>
    </div>
  );
}
