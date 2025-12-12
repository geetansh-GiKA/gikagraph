'use client'
const settings = {
  copyright: '© 2025 GiKA AI. All rights reserved.'
}

export function Footer() {
  return (
    <footer className="w-full py-2 md:py-8 flex flex-col items-center justify-center gap-2 md:gap-10 text-sm border-t border-border text-foreground -mt-12 md:-mt-20 lg:-mt-24">
      <p className="text-center text-foreground">{settings.copyright}</p>
    </footer>
  )
}

export default Footer
