import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

const fmt = (n) => '$' + n.toLocaleString('es-CO')

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const onAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-[#F1F3F1] bg-white overflow-hidden hover:shadow-xl hover:shadow-emerald-950/5 transition-shadow duration-300">
      <div className="relative aspect-square bg-[#FAFBF9] overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 text-[11px] uppercase tracking-wider text-[#738273] bg-white/80 backdrop-blur px-2.5 py-1 rounded-full">
          {product.line}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-medium text-black">{product.name}</h3>
        <p className="text-sm text-[#5A635A] mt-1 mb-4 flex-1">{product.blurb}</p>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#738273]">Desde</p>
            <p className="text-lg font-semibold text-[#1C2E1E]">{fmt(product.priceFrom)}</p>
          </div>
          <button
            onClick={onAdd}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
              added
                ? 'bg-[#4D6D47] text-white'
                : 'bg-[#1C2E1E] text-white hover:bg-[#2a4430]'
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
      </div>
    </div>
  )
}
