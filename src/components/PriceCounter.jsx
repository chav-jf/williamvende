/**
 * PriceCounter — animates a COP price from 0 to `value`
 * when the element first enters the viewport (once).
 *
 * Uses motion/react `animate` (imperative) + `useInView`.
 * `tabular-nums` keeps each digit the same width so the
 * text block doesn't shimmy left/right while counting.
 */
import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'motion/react'

const fmtCOP = (n) => '$' + n.toLocaleString('es-CO')

export default function PriceCounter({ value, className = '' }) {
  const ref = useRef(null)
  // once:true  → only fires the first time the element crosses the margin
  // margin     → start a little before the element is fully visible
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmtCOP(display)}
    </span>
  )
}
