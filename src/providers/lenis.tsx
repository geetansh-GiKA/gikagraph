'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { LazyMotion, domAnimation } from "motion/react"
import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'

function ScrollToTop() {
  const lenis = useLenis()
  const pathname = usePathname()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return null
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ReactLenis root options={{ duration: 1.3 }}>
        <ScrollToTop />
        {/* <FollowCursor /> */}
        {children}
      </ReactLenis>
    </LazyMotion>
  )
}