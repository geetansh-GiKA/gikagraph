"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkle,
  Phone,
  LinkedinIcon,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection3() {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Header row */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2 text-xl">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkle className="w-6 h-6 text-foreground fill-foreground" />
              </motion.span>
              <span className="text-3xl font-semibold font-sans text-foreground">
                WHO ARE WE
              </span>
              <div className="text-center ml-2">
                <a
                  href="https://cal.com/gikagraph/30-mins"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="capitalize mx-auto" variant="masti">
                    Lets Talk <ArrowRight />
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                {
                  href: "https://cal.com/gikagraph/30-mins",
                  alt: "contact",
                },
                {
                  href: "https://www.linkedin.com/company/gika-ai/",
                  alt: "linkedin",
                },
                {
                  href: "https://www.youtube.com/watch?v=rivJ6WXKzUA",
                  alt: "Youtube",
                },
              ].map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:w-8 md:h-8 w-6 h-6 border border-(--bg-300) bg-(--bg-100) rounded-lg flex items-center justify-center cursor-pointer hover:bg-(--bg-200) transition-colors"
                >
                  {(() => {
                    switch (social.alt) {
                      case "linkedin":
                        return <LinkedinIcon className="w-4 h-4 opacity-70" />;
                      case "contact":
                        return <Phone className="w-4 h-4 opacity-70" />;
                      case "Youtube":
                        return <Youtube className="w-4 h-4 opacity-70" />;
                      default:
                        return <Phone className="w-4 h-4 opacity-70" />;
                    }
                  })()}
                </a>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <figure className="relative group">
            <svg
              className="w-full"
              width="100%"
              height="100%"
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#27272a"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                xlinkHref="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
              />
            </svg>
          </figure>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <div className="lg:absolute right-4 bottom-8 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <div className="flex lg:text-3xl items-center gap-2 mb-2 font-sans">
                <span className="font-semibold uppercase">20+ Years Exp</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs font-sans">
                <span className="font-bold">5x</span>
                <span className="text-(--text-300)">time saved</span>
                <span className="text-(--bg-300) lg:hidden block">|</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          <div className="md:col-span-2">
            <h2 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-sans font-semibold text-foreground mb-8">
              Turning Fragmented Data Into Grounded Intelligence.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="sm:text-base text-xs font-sans text-(--text-300)">
                <p className="leading-relaxed text-justify">
                  Our journey began with a simple belief: enterprise data should
                  accelerate decisions, not bury them. We specialise in
                  transforming fragmented, siloed data into clear, actionable
                  intelligence.
                </p>
              </div>
              <div className="sm:text-base text-xs font-sans text-(--text-300)">
                <p className="leading-relaxed text-justify">
                  Trust is earned through accuracy. Every output from our
                  platform is grounded in your verified data, not guesswork, so
                  teams can act on it with confidence instead of second guessing
                  what the numbers actually mean.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col justify-between">
            <div className="flex-1 flex flex-col items-end justify-center gap-2">
              <h3 className="sm:text-xl md:text-2xl text-2xl !leading-[110%] font-sans font-semibold text-foreground text-right mb-16">
                Entity Intelligence Platform for Enterprises
              </h3>
              <h3 className="text-sm !leading-[110%] font-sans text-foreground text-right"></h3>
            </div>

            <div className="sm:text-base text-xs font-sans text-(--text-300)">
              <p className="leading-relaxed text-justify">
                From messy data to structured knowledge graphs, we help teams
                connect the dots across systems, so every decision is backed by
                context, not guesswork. Our platform turns records into a living
                map of your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
