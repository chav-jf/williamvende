import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { reviews } from '../data/reviews'

export default function Reviews() {
  return (
    <section
      id="resenas"
      className="scroll-mt-24 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28"
    >
      <div className="mb-10">
        <p className="flex items-center gap-2 text-gold-deep text-sm uppercase tracking-[0.28em] font-medium mb-2">
          <span className="text-base leading-none">&#10022;</span>
          Reseñas
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-ink">
          Clientes felices
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="rounded-3xl border border-black/10 bg-white p-6 flex flex-col gap-4 hover:border-gold-deep/40 transition-colors"
          >
            <div className="flex gap-0.5 text-gold-deep">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className="w-4 h-4"
                  fill={s < r.rating ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <p className="text-[#3a443a] leading-relaxed">“{r.text}”</p>
            <div className="mt-auto">
              <p className="font-medium text-black">{r.name}</p>
              <p className="text-sm text-[#738273]">{r.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
