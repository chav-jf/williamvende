import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, ArrowUpRight } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'
import Flags from './Flags'

const OPTIONS = ['AirPods Pro', 'Apple Watch', 'Al por mayor', 'Otro']

export default function Hero() {
  const { displayed, done } = useTypewriter('AirPods Pro y\nApple Watch')
  const [services, setServices] = useState([])

  const toggle = (opt) =>
    setServices((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt],
    )

  const waHref =
    'https://wa.me/573112179082?text=' +
    encodeURIComponent(`Hola William, estoy interesado en: ${services.join(', ')}.`)

  return (
    <div className="w-full">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="flex items-center gap-2 text-gold-deep text-xs sm:text-sm uppercase tracking-[0.28em] font-medium mb-5">
          <span className="text-base leading-none">&#10022;</span>
          Premium Apple Products
        </p>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
          )}
        </h1>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
          Productos Apple 100% originales, importados desde hace 4 años <Flags />.
          <br />
          Venta al detal y por mayor en Pasto, Nariño — escríbenos y te asesoramos.
        </p>
      </motion.div>

      {/* Interest pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-medium tracking-tight mb-2 text-black">
          ¿Qué estás buscando?
        </h2>
        <p className="opacity-85 text-[#738273] mb-8">Selecciona todo lo que aplique</p>

        <div className="flex flex-wrap gap-3">
          {OPTIONS.map((opt) => {
            const active = services.includes(opt)
            return (
              <motion.button
                key={opt}
                onClick={() => toggle(opt)}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-colors ${
                  active
                    ? 'bg-ink text-white shadow-md shadow-black/5 ring-1 ring-gold/40 transform'
                    : 'bg-white text-ink border border-black/15 hover:border-gold-deep hover:text-gold-deep'
                }`}
              >
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ scale: 0, width: 0 }}
                      animate={{ scale: 1, width: 'auto' }}
                      exit={{ scale: 0, width: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="inline-flex overflow-hidden"
                    >
                      <Check className="w-4 h-4 text-gold" strokeWidth={2.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {opt}
              </motion.button>
            )
          })}
        </div>

        {/* Contingent feedback banner */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {services.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="italic text-xs text-ink"
              >
                Haz clic para seleccionar arriba.
              </motion.p>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFBF9] border border-black/5 border-l-2 border-l-gold rounded-2xl px-5 py-4 max-w-2xl">
                  <p className="text-sm text-ink">
                    Listo para consultar:{' '}
                    <span className="font-medium">{services.join(', ')}</span>
                  </p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-gold-deep uppercase text-xs font-semibold tracking-wide hover:gap-2 transition-all whitespace-nowrap"
                  >
                    Vamos <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
