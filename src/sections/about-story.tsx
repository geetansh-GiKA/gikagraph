import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Scroll } from "lucide-react";

export default function AboutStory() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text="Our Story" Icon={Scroll}/>
        </SlideEffect>

        <SlideEffect
          direction="top"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mx-auto"
        >
          We backed the data, not the crowd
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground"
        >
          Most AI companies are trying to fix a broken foundation. We started
          from a different first principle: a model is only as reliable as
          the data structure it sits on.
        </SlideEffect>
      </div>

      <SlideEffect
        delay={0.1}
        className="max-w-3xl mx-auto text-sm lg:text-base leading-relaxed text-muted-foreground space-y-5 text-justify"
      >
        <p>
          The core reason traditional database systems are inherently
          reliable and verifiable is that structure comes before data. Modern
          Large Language Models, trained via self-supervised learning,
          possess no inherent structure&mdash;and even when structured data
          was present, the training process flattened it. This is one of the
          foundational reasons for the modern model context limitation and
          hallucination problem. LLMs are phenomenal reasoning engines, but
          they are incredibly poor database managers.
        </p>
        <p>
          GiKA was founded by Dr. Manoj Agarwal to solve this crisis from
          first principles. Manoj&apos;s career has been shaped by
          architecting some of the largest, most sophisticated data
          intelligence networks in the world&mdash;as a Senior Staff Engineer
          at Uber AI, spearheading knowledge graph integration and semantic
          search for Uber Eats, and as a Principal Applied Scientist at
          Microsoft AI &amp; Research, where he was the chief architect
          behind the web-scale Microsoft Product Knowledge Graph.
        </p>
        <p>
          Combined with his early foundational work at IBM Research and a
          PhD focused on deep data mining, pattern recognition, and
          information retrieval, the technical blueprint for a more
          reliable, deterministic AI architecture was set.
        </p>
      </SlideEffect>

      <div className="max-w-3xl mx-auto w-full space-y-5">
        <SlideEffect
          direction="top"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          The team behind GiKA: engineering a new standard
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="text-sm lg:text-base leading-relaxed text-muted-foreground space-y-5 text-justify"
        >
          <p>
            Turning a paradigm-shifting idea into an enterprise-grade reality
            requires an exceptional collective. GiKA is built by a
            world-class team of engineers, scientists, and product builders
            who have spent their careers at the absolute frontier of
            technology and hyper-scale execution, drawing deep expertise from
            pioneering engineering organizations and leading educational
            institutions.
          </p>
          <p>
            Having collectively engineered platforms that handle billions of
            facts, millions of transactions, and zero-tolerance
            infrastructure, we realized that enterprise AI required a
            structural paradigm shift if it has to be trustworthy and
            reliable at enterprise scale.
          </p>
          <p>
            GiKA was born from this exact realization. Together, we&apos;ve
            engineered the industry&apos;s leading high-dimensional Context
            Graph topology over heterogeneous, multi-layered enterprise data
            silos&mdash;in a massively distributed, scalable manner. With
            this breakthrough architecture in hand, context is no longer a
            limiting factor.
          </p>
          <p className="text-foreground font-medium">
            We didn&apos;t just wrap an API. We are a team that has spent
            decades mastering the data architecture required to make
            enterprise AI actually work. Today, our shared mission is to
            build the world&apos;s most reliable, deterministic context graph
            to solve the most complex, high-stakes enterprise problems on
            earth.
          </p>
        </SlideEffect>
      </div>
    </div>
  );
}
