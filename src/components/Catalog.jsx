import { useState } from 'react'
import { motion } from 'motion/react'
import { products } from '../data/products'
import ProductCard from './ProductCard'

const FILTERS = ['Todos', 'AirPods', 'Apple Watch', 'Accesorios']

export default function Catalog() {
  const [filter, setFilter] = useState('Todos')
  const shown =
    filter === 'Todos' ? products : products.filter((p) => p.line === filter)

  return (
    <section
      id="catalogo"
      className="scroll-mt-24 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="flex items-center gap-2 text-gold-deep text-sm uppercase tracking-[0.28em] font-medium">
            <span className="text-base leading-none">&#10022;</span>
            Catálogo
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold tracking-tight text-ink">
            Calidad premium, precio de importador
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-ink text-gold ring-1 ring-gold/30'
                  : 'bg-white text-ink border border-black/15 hover:border-gold-deep hover:text-gold-deep'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <hr className="gold-rule mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
