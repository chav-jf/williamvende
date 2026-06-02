import { motion, AnimatePresence } from 'motion/react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const fmt = (n) => '$' + n.toLocaleString('es-CO')
const PHONE = '573112179082'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, estimatedTotal, clear } =
    useCart()

  const checkout = () => {
    const lines = items.map((i) => `• ${i.qty}x ${i.name}`).join('\n')
    const msg = `Hola William! 👋 Quiero cotizar este pedido:\n\n${lines}\n\nEstimado desde: ${fmt(
      estimatedTotal,
    )}\n\n¿Me confirmas disponibilidad y precio final?`
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F3F1]">
              <h3 className="text-xl font-medium tracking-tight">Tu carrito</h3>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="hover:opacity-60 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
                <ShoppingBag className="w-12 h-12 text-[#C9D2C9]" strokeWidth={1.2} />
                <p className="text-[#5A635A]">Tu carrito está vacío.</p>
                <a
                  href="#catalogo"
                  onClick={closeCart}
                  className="text-[#1C2E1E] underline underline-offset-4"
                >
                  Ver catálogo
                </a>
              </div>
            ) : (
              <>
                <div className="cart-scroll flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.div
                        key={it.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 items-center"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-[#FAFBF9] border border-[#F1F3F1] flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-black truncate">{it.name}</p>
                          <p className="text-sm text-[#1C2E1E] font-semibold">
                            Desde {fmt(it.priceFrom)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-[#F1F3F1] rounded-full">
                              <button
                                onClick={() => updateQty(it.id, -1)}
                                className="p-1.5 hover:opacity-60"
                                aria-label="Disminuir cantidad"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm">{it.qty}</span>
                              <button
                                onClick={() => updateQty(it.id, 1)}
                                className="p-1.5 hover:opacity-60"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(it.id)}
                              className="text-[#9aa39a] hover:text-red-500 transition-colors"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-[#F1F3F1] px-6 py-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5A635A]">Estimado desde</span>
                    <span className="text-lg font-semibold text-[#1C2E1E]">
                      {fmt(estimatedTotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#738273] -mt-1">
                    El precio final se confirma por WhatsApp.
                  </p>
                  <button
                    onClick={checkout}
                    className="w-full bg-[#1C2E1E] text-white rounded-full py-3.5 font-medium hover:bg-[#2a4430] transition-colors"
                  >
                    Finalizar pedido por WhatsApp
                  </button>
                  <button
                    onClick={clear}
                    className="text-xs text-[#738273] hover:text-[#1C2E1E] transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
