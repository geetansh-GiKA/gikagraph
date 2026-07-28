import Image from "next/image";

export interface Testimonial {
  quote: string;
  emphasis: string;
  author: string;
  role: string;
  company: string;
  image: string;
  alt?: string;
}

/* Splits the quote on the emphasis phrase and sets it in italic serif,
 * mirroring an editor's annotation mark on a proof sheet. */
function Quote({ text, emphasis }: { text: string; emphasis: string }) {
  const parts = text.split(emphasis);
  if (parts.length !== 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <em className="font-serif italic font-normal">{emphasis}</em>
      {parts[1]}
    </>
  );
}

export function TestimonialCard({
  quote,
  emphasis,
  author,
  role,
  company,
  image,
  alt,
}: Testimonial) {
  return (
    <div className="relative flex h-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative px-6 pt-7">
        {/* fading dot-grid field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            backgroundPosition: "-3px -3px",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <span
          aria-hidden="true"
          className="relative block font-sans text-5xl font-normal leading-[0.7] text-primary/50"
        >
          &ldquo;
        </span>

        <p className="relative pb-1 pt-2 font-sans text-base font-bold leading-[1.3] tracking-tight text-justify">
          <Quote text={quote} emphasis={emphasis} />
        </p>
      </div>

      <div className="mt-auto">
        <hr className="mx-6 mt-5 border-border" />

        <div className="flex items-center gap-3 px-6 py-4">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-foreground bg-muted">
            <Image
              src={image}
              alt={alt ?? author}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate font-sans text-sm font-bold tracking-tight">
              {author}
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
              {role} — {company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
