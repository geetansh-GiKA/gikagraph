import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"

export default function VelocityScroll() {
  return (
  <div>
    <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl mt-16 mb-16">
      <ScrollVelocityRow baseVelocity={20} direction={1}>
        Personal Insights
      </ScrollVelocityRow>
      <ScrollVelocityRow baseVelocity={20} direction={-1}>
        Personal Insights
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
 </div>
  )
}