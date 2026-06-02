import { useState } from 'react'
import { motion } from 'motion/react'
import { products } from '../data/products'
import ProductCard from './ProductCard'

const FILTERS = ['Todos', 'AirPods', 'Apple Watch']

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
          <p className="text-[#738273] text-sm uppercase tracking-widest">
            Catálogo
          </p>
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#1C2E1E] text-white'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

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
