import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Check, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Garantia from './Garantia'

const fmt = (n) => '$' + n.toLocaleString('es-CO')

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [showWholesale, setShowWholesale] = useState(false)

  const onAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-black/10 bg-white overflow-hidden hover:border-gold-deep/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
      <div className="relative aspect-square bg-[#FAFBF9] overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.18em] font-semibold text-gold-deep bg-white/85 backdrop-blur px-2.5 py-1 rounded-full">
          {product.line}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-medium text-ink">{product.name}</h3>
        <p className="text-sm text-[#5A635A] mt-1 mb-4 flex-1">{product.blurb}</p>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep font-semibold">Desde</p>
            <p className="text-lg font-semibold text-ink">{fmt(product.priceFrom)}</p>
          </div>
          <button
            onClick={onAdd}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
              added
                ? 'bg-ink text-gold ring-1 ring-gold/40'
                : 'bg-ink text-white hover:text-gold'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Añadido
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Añadir
              </>
            )}
          </button>
        </div>

        {/* Wholesale price tiers (from the print catalog) */}
        {product.wholesale?.length > 0 && (
          <div className="mt-4 border-t border-black/5 pt-3">
            <button
              onClick={() => setShowWholesale((v) => !v)}
              aria-expanded={showWholesale}
              className="flex items-center justify-between w-full text-[11px] uppercase tracking-[0.16em] font-semibold text-gold-deep hover:text-ink transition-colors"
            >
              Ver precios por mayor
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showWholesale ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {showWholesale && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-3 space-y-1.5">
                    {product.wholesale.map((t) => (
                      <li key={t.qty} className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#5A635A] w-12">
                          <strong className="text-ink font-semibold">{t.qty}</strong> u
                        </span>
                        <span className="text-ink font-medium flex-1">{fmt(t.unit)} c/u</span>
                        <span className="rounded-full bg-ink text-gold px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
                          {fmt(t.qty * t.unit)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Warranty seal */}
        <Garantia className="mt-4 pt-3 border-t border-black/5" />
      </div>
    </div>
  )
}
