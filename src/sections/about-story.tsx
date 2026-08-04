import Badge from "@/components/badge";
import SlideEffect from "@/components/slide-effect";
import { Scroll } from "lucide-react";

export default function AboutStory() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-5">
        <SlideEffect>
          <Badge text="Our Story" Icon={Scroll} />
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
          Most AI companies today are trying to fix a broken foundation. When
          the world rushed to build bigger language models, they overlooked a
          fundamental truth: a model is only as reliable and accurate as the
          data structure it sits on.
        </SlideEffect>
      </div>

      <SlideEffect
        delay={0.1}
        className="max-w-3xl mx-auto text-sm lg:text-base leading-relaxed text-muted-foreground space-y-5 text-justify"
      >
        <p>
          At GiKA, we didn&apos;t follow the crowd &mdash; we backed the data.
        </p>
        <p>
          The core reason traditional database systems are inherently reliable
          and verifiable is that structure comes before data. On the contrary,
          modern Large Language Models possess no inherent data structure. Even
          when structured data was present, the training process flattened it.
          This architectural oversight is the precise root cause of the modern
          model context limitation and hallucination problem.
        </p>
        <p>
          GiKA was founded by Dr. Manoj Agarwal to take on this problem from
          first principles. Manoj&apos;s career has been defined by architecting
          some of the largest, most sophisticated data intelligence networks in
          the world&mdash;serving as a Senior Staff Engineer at Uber AI
          (spearheading knowledge graph integration and semantic search for Uber
          Eats) and as a Principal Applied Scientist at Microsoft AI &amp;
          Research, where he was the chief architect behind the web-scale
          Microsoft Product Knowledge Graph.
        </p>
        <p>
          Combined with his early foundational work at IBM Research and a PhD
          focused on deep data mining, pattern recognition, and information
          retrieval, the technical blueprint for a more reliable, deterministic
          AI architecture was set.
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
            requires an exceptional collective. GiKA is built by a world-class
            team of engineers, scientists, and product builders who have spent
            their careers at the absolute frontier of technology and hyper-scale
            execution.
          </p>
          <p>
            Our team draws its deep expertise from pioneering engineering
            organizations&mdash;including Microsoft, Uber, IBM Research,
            Rippling, and Razorpay to name a few&mdash;and brings together elite
            minds educated at the IITs, IIITs, UT Austin, and other leading
            national and global educational institutions.
          </p>
        </SlideEffect>
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-5">
        <SlideEffect
          direction="top"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          GiKA&apos;s foundational foresight meets enterprise intelligence
          reality
        </SlideEffect>

        <SlideEffect
          delay={0.1}
          className="text-sm lg:text-base leading-relaxed text-muted-foreground space-y-5 text-justify"
        >
          <p>
            While the rest of the industry is just waking up to the critical
            importance of Context Graphs, GiKA built the foundation years ahead
            of the curve. When we founded GiKA, the market believed brute-force
            LLM context windows would solve enterprise complexity. Years ago,
            the concept of a multi-layered, graph-based data framework for
            reliable AI systems sounded contrarian.
          </p>
          <p>But, we knew otherwise.</p>
          <p>
            Still today, understanding that you need a Context Graph is easy.
            Knowing how to actually build and scale at enterprise scale is a
            problem very few teams in the world can solve.
          </p>
          <p>
            Today, GiKA stands as the world&apos;s most pioneering team in this
            space. We have engineered the industry&apos;s leading
            high-dimensional Context Graph topology over heterogeneous,
            multi-layered enterprise data silos&mdash;and we&apos;ve done it in
            a massively distributed, scalable manner. Our tech maps the most
            complex, chaotic enterprise realities into a clean, deterministic
            operational matrix designed to handle the hardest enterprise tasks.
          </p>
          <p>
            With this breakthrough architecture in hand, context is no longer a
            limiting factor.
          </p>
          <p className="text-foreground font-medium">
            We didn&apos;t just wrap an API. We are a team that has spent
            decades mastering the data architecture required to make enterprise
            AI reliable, that enterprises can trust with their data and with
            their most critical decisions.
          </p>
        </SlideEffect>
      </div>
    </div>
  );
}
