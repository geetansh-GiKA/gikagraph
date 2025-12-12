'use client'

import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/sections/footer"
import { settings } from "@/app/pricing/data/setting"

// 📌 Function to redirect all CTA buttons
const handleContactSales = () => {
  window.open("https://cal.com/gikagraph/30-mins", "_blank")
}

export default function Pricing() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-20 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth">
      <Navbar />

      <div id='pricing' className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 mx-auto text-center -mt-32">

        {/* Title */}
        <SlideEffect>
          <h2 className="text-2xl md:text-4xl lg:text-header capitalize text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 font-medium leading-normal">
            {settings.title}
          </h2>
        </SlideEffect>

        {/* Description */}
        <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-3/4 mx-auto text-sm lg:text-base">
          {settings.description}
        </SlideEffect>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PLAN 1 */}
          <SlideEffect isSpring={false} delay={0.1} className="text-base">
            <Card className="bg-background border border-border">
              <div className="capitalize text-start text-foreground">{settings.plan_1.planName}</div>

              <div className="flex items-baseline gap-1">
                <span className="font-medium text-4xl text-foreground">
                  {settings.plan_1.currency}{settings.plan_1.price}
                </span>
                <span className="text-sm">/month</span>
              </div>

              <Button className="w-full" onClick={handleContactSales}>
                {settings.plan_1.cta}
              </Button>

              <div className="text-start space-y-6">
                <p className="text-foreground text-sm">{settings.plan_1.description}</p>

                <div className="flex flex-col items-start gap-4 text-sm">
                  {settings.plan_1.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CircleCheck className="text-primary" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </SlideEffect>

          {/* PLAN 2 */}
          <SlideEffect isSpring={false} delay={0.2} className="flex flex-col gap-6 text-base">
            <Card className="bg-secondary">
              <div className="w-full flex items-center gap-2 justify-between">
                <div className="capitalize text-start text-foreground">{settings.plan_2.planName}</div>
                <div className="text-xs bg-accent px-2 py-1 rounded-full text-foreground/90 font-medium capitalize dark:text-black">
                  most popular
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-medium text-4xl text-foreground">
                  {settings.plan_2.currency}{settings.plan_2.price}
                </span>
                <span className="text-sm">/month</span>
              </div>

              <Button className="w-full" onClick={handleContactSales}>
                {settings.plan_2.cta}
              </Button>

              <div className="text-start space-y-6">
                <p className="text-foreground text-sm">{settings.plan_2.description}</p>

                <div className="flex flex-col items-start gap-4 text-sm">
                  {settings.plan_2.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CircleCheck className="text-primary" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </SlideEffect>

          {/* PLAN 3 */}
          <SlideEffect isSpring={false} delay={0.3} className="flex flex-col gap-6 text-base">
            <Card className="bg-background border border-border">
              <div className="capitalize text-start text-foreground">{settings.plan_3.planName}</div>

              <div className="flex items-baseline gap-1">
                <span className="font-medium text-4xl text-foreground">
                  {settings.plan_3.currency}{settings.plan_3.price}
                </span>
                <span className="text-sm">/month</span>
              </div>

              <Button className="w-full" onClick={handleContactSales}>
                {settings.plan_3.cta}
              </Button>

              <div className="text-start space-y-6">
                <p className="text-foreground text-sm">{settings.plan_3.description}</p>
                  <div className="flex flex-col items-start gap-4 text-sm">
                    {settings.plan_3.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CircleCheck className="text-primary" size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
          </SlideEffect>
          </div>
        </div>
      <Footer />
    </div>
  )
}
