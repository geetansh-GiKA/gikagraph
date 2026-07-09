"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface Changelog1Props {
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
  className?: string;
}

export const defaultEntries: ChangelogEntry[] = [
  {
    version: "Version 1.3.0",
    date: "15 November 2024",
    title: "Enhanced Analytics Dashboard",
    description:
      "We've completely redesigned our analytics dashboard to provide deeper insights and improved visualizations of your data.",
    items: [
      "Interactive data visualizations with real-time updates",
      "Customizable dashboard widgets",
      "Export analytics in multiple formats (CSV, PDF, Excel)",
      "New reporting templates for common use cases",
      "Improved data filtering and segmentation options",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
  },
  {
    version: "Version 1.2.5",
    date: "7 October 2024",
    title: "Mobile App Launch",
    description:
      "We're excited to announce the launch of our mobile application, available now on iOS and Android platforms.",
    items: [
      "Native mobile experience for on-the-go productivity",
      "Offline mode support for working without internet connection",
      "Push notifications for important updates",
      "Biometric authentication for enhanced security",
    ],
  },
  {
    version: "Version 1.2.1",
    date: "23 September 2024",
    title: "New features and improvements",
    description:
      "Here are the latest updates and improvements to our platform. We are always working to improve our platform and your experience.",
    items: [
      "Added new feature to export data",
      "Improved performance and speed",
      "Fixed minor bugs and issues",
      "Added new feature to import data",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
  },
  {
    version: "Version 1.0.0",
    date: "31 August 2024",
    title: "First version of our platform",
    description:
      "Introducing a new platform to help you manage your projects and tasks. We are excited to launch our platform and help you get started. We are always working to improve our platform and your experience.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&auto=format&fit=crop&q=60",
  },
];

export const Changelog1 = ({ entries = defaultEntries }: Changelog1Props) => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const imagedEntries = entries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => Boolean(entry.image));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2),
          );
        if (visible.length > 0) {
          const idx = Number((visible[0].target as HTMLElement).dataset.index);
          setActiveIndex(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  const activeImageEntry = imagedEntries.find(
    ({ index }) => index === activeIndex,
  );
  const fallbackImage = imagedEntries[0];
  const currentImage = activeImageEntry ?? fallbackImage;

  return (
    <section className="py-32">
      <div className="px-4 xl:px-0">
        <div className="mx-auto max-w-6xl md:flex md:gap-16">
          {currentImage && (
            <div className="hidden md:block md:w-1/2">
              <div className="sticky top-32 aspect-[4/3] overflow-hidden rounded-lg">
                {imagedEntries.map(({ entry, index }) => (
                  <Image
                    key={index}
                    src={entry.image!}
                    alt={`${entry.version} visual`}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out"
                    style={{
                      opacity: index === currentImage.index ? 1 : 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-24 md:w-1/2">
            {entries.map((entry, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                data-index={index}
                className="flex flex-col"
              >
                <h2 className="mb-3 text-lg leading-tight font-bold text-foreground/90 md:text-2xl">
                  {entry.title}
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                  {entry.description}
                </p>
                {entry.items && entry.items.length > 0 && (
                  <ul className="mt-4 ml-4 space-y-1.5 text-sm text-muted-foreground md:text-base">
                    {entry.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {entry.image && (
                  <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg md:hidden">
                    <Image
                      src={entry.image}
                      alt={`${entry.version} visual`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
