'use client'

import HeroWave from '@/components/ui/dynamic-wave-canvas-background'

function SiteBackground() {
  return (
    <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950'>
      {/* Dynamic wave canvas background */}
      <HeroWave />
      {/* Accent glow at the bottom */}
      <div className='absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-emerald-500/30 via-teal-500/18 to-transparent' />
    </div>
  )
}

export default SiteBackground
