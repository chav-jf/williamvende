import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'
import { useCart } from '../context/CartContext'

const LINKS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Redes', href: '#redes' },
  { label: 'Contacto', href: '#contacto' },
]

const WHATSAPP =
  'https://wa.me/573112179082?text=' +
  encodeURIComponent('Hola William, quiero más información sobre tus productos Apple.')

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { count, openCart } = useCart()

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <a href="#top" className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            WILLIAM VENDE
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </a>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex flex-row items-center text-[23px] text-black">
          {LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center">
              <a href={l.href} className="hover:opacity-60 transition-opacity">
                {l.label}
              </a>
              {i < LINKS.length - 1 && <span className="opacity-40">,&nbsp;</span>}
            </span>
          ))}
        </nav>

        {/* Right: cart + CTA + hamburger */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative text-black hover:opacity-60 transition-opacity"
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1C2E1E] text-white text-[11px] font-medium flex items-center justify-center"
              >
                {count}
              </motion.span>
            )}
          </button>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            WhatsApp
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black my-[5px] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium tracking-tight text-black"
          >
            {l.label}
          </a>
        ))}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl font-medium tracking-tight text-[#1C2E1E] underline underline-offset-4"
        >
          WhatsApp
        </a>
      </div>
    </>
  )
}
