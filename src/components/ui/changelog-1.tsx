"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { changelogEntries } from "@/app/platform/data/changelog";

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

export const Changelog1 = ({ entries = changelogEntries }: Changelog1Props) => {
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
              <div className="sticky top-32 aspect-[3/3] overflow-hidden rounded-lg">
                {imagedEntries.map(({ entry, index }) => (
                  <Image
                    key={index}
                    src={entry.image!}
                    alt={`${entry.version} visual`}
                    fill
                    className="object-contain transition-opacity duration-500 ease-out-in"
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
