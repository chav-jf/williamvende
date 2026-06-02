import { useEffect, useRef } from 'react'

const VIDEO_SRC = '/videos/background_video.mp4'

export default function BackgroundVideo() {
  const videoRef = useRef(null)

  // Desktop (>= 1024px): scrub the video with horizontal mouse movement.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX = null
    let targetTime = 0
    let isSeeking = false

    const onSeeked = () => {
      isSeeking = false
    }

    // The clip fades in from black, so on desktop (where there's no autoplay,
    // only scrubbing) we park it near the end to reveal the full figure on load.
    const setInitialFrame = () => {
      if (window.innerWidth < 1024) return
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      targetTime = Math.max(0, duration - 0.1)
      video.currentTime = targetTime
    }

    const handleMove = (e) => {
      if (window.innerWidth < 1024) return
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return

      if (prevX === null) {
        prevX = e.clientX
        return
      }

      const delta = e.clientX - prevX
      prevX = e.clientX

      targetTime += (delta / window.innerWidth) * 0.8 * duration
      targetTime = Math.max(0, Math.min(duration, targetTime))

      // Only issue a new seek once the previous one settled — keeps tracking smooth.
      if (!isSeeking) {
        isSeeking = true
        video.currentTime = targetTime
      }
    }

    if (video.readyState >= 1) setInitialFrame()
    else video.addEventListener('loadedmetadata', setInitialFrame, { once: true })

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', setInitialFrame)
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
      {/* Legibility scrim behind the headline on desktop (the clip is dark). */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white from-5% via-white/85 via-45% to-transparent to-90%" />
    </div>
  )
}
