export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`rounded-2xl text-sm md:text-base h-full bg-secondary border border-border/60 border-t-2 border-t-primary/30 p-8 md:p-10 flex flex-col items-start justify-start text-start gap-4 md:gap-5 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${className}`}>
            {children}
        </div>
    )
}