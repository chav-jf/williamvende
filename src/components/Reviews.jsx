import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { reviews } from '../data/reviews'

/* ── Entrance variant for each card ──────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 48, rotate: 2 },
  show: (col) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.65,
      delay: col * 0.1,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
}

export default function Reviews() {
  return (
    <section
      id="resenas"
      className="scroll-mt-24 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28"
    >
      {/* ── Header ── */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-gold-deep text-sm uppercase tracking-[0.28em] font-medium mb-2"
        >
          <span className="text-base leading-none">&#10022;</span>
          Reseñas
        </motion.p>

        {/* Title reveal — clip-from-bottom */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-ink"
          >
            Clientes felices
          </motion.h2>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => {
          const col = i % 3 // column position drives stagger delay
          return (
            <motion.div
              key={i}
              custom={col}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 22 },
              }}
              viewport={{ once: true, margin: '-60px' }}
              className="group relative rounded-3xl border border-black/10 bg-white p-6 flex flex-col gap-4 overflow-hidden
                hover:border-gold-deep/35 hover:shadow-2xl hover:shadow-black/[0.09] transition-[border-color,box-shadow] duration-300"
            >
              {/* Subtle gold gradient shimmer on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none bg-gradient-to-br from-gold/[0.05] via-transparent to-transparent"
              />

              {/* Decorative large quote mark */}
              <span
                aria-hidden="true"
                className="absolute top-3 right-5 text-[88px] font-serif leading-none text-gold/[0.09] select-none pointer-events-none"
              >
                &ldquo;
              </span>

              {/* Stars — each one pops in with spring stagger */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0, rotate: -25, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: col * 0.1 + s * 0.07,
                      type: 'spring',
                      stiffness: 500,
                      damping: 18,
                    }}
                  >
                    <Star
                      className="w-4 h-4 text-gold-deep"
                      fill={s < r.rating ? 'currentColor' : 'none'}
                      strokeWidth={1.5}
                    />
                  </motion.span>
                ))}
              </div>

              {/* Review text */}
              <p className="relative z-10 text-[#3a443a] leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author row */}
              <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-black/[0.06] mt-auto">
                {/* Initial avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E9CF8A]/50 to-[#C9A23F]/25 flex items-center justify-center text-sm font-semibold text-gold-deep shrink-0 ring-1 ring-gold/20">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-medium text-black leading-tight">{r.name}</p>
                  <p className="text-xs text-[#738273] mt-0.5">{r.location}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
