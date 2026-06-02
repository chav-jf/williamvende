import { useEffect, useRef } from 'react'

const VIDEO_SRC = '/videos/background_video.mp4'

export default function BackgroundVideo() {
  const videoRef = useRef(null)

  // Desktop (>= 1024px): scrub the video with horizontal mouse movement.
  // Mouse events only update a TARGET time; a requestAnimationFrame loop eases
  // the real playhead toward it, so motion stays smooth and never stutters.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX = null
    let targetTime = null
    let displayTime = null
    let rafId = null

    const isDesktop = () => window.innerWidth >= 1024

    // The clip fades in from black, so on desktop (no autoplay, only scrubbing)
    // we park it near the end to reveal the full figure on load.
    const initFrame = () => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      targetTime = Math.max(0, duration - 0.1)
      displayTime = targetTime
      if (isDesktop()) video.currentTime = displayTime
    }

    const handleMove = (e) => {
      if (!isDesktop()) return
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      if (targetTime === null) initFrame()

      if (prevX === null) {
        prevX = e.clientX
        return
      }

      const delta = e.clientX - prevX
      prevX = e.clientX

      targetTime += (delta / window.innerWidth) * 0.8 * duration
      targetTime = Math.max(0, Math.min(duration, targetTime))
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      if (!isDesktop() || targetTime === null || displayTime === null) return
      const diff = targetTime - displayTime
      if (Math.abs(diff) > 0.0008) {
        displayTime += diff * 0.2 // easing — higher = snappier, lower = smoother
        try {
          video.currentTime = displayTime
        } catch {
          /* ignore transient seek errors */
        }
      }
    }

    if (video.readyState >= 1) initFrame()
    else video.addEventListener('loadedmetadata', initFrame, { once: true })

    window.addEventListener('mousemove', handleMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafId) cancelAnimationFrame(rafId)
      video.removeEventListener('loadedmetadata', initFrame)
    }
  }, [])

  // Mobile (< 1024px): scrubbing is disabled, so just autoplay/loop normally.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.innerWidth < 1024) {
      video.muted = true
      video.loop = true
      video.autoplay = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }, [])

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  )
}
