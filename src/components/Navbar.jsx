import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'
import { useCart } from '../context/CartContext'
import Logo from './Logo'

const LINKS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Redes', href: '#redes' },
  { label: 'Contacto', href: '#contacto' },
]

const WHATSAPP =
  'https://wa.me/573112179082?text=' +
  encodeURIComponent('Hola William, quiero más información sobre tus productos Apple.')

/* ── motion variants ─────────────────────────────────────────── */
const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 28 } },
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()

  /* Glass effect on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-10 px-5 sm:px-8 flex flex-row justify-between items-center transition-all duration-300 ${
          scrolled
            ? 'py-3 sm:py-3 bg-white/88 backdrop-blur-xl border-b border-black/[0.07] shadow-sm shadow-black/[0.04]'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Logo variant="light" />

        {/* Center nav — desktop */}
        <motion.nav
          className="hidden md:flex items-center gap-0.5"
          variants={navContainer}
          initial="hidden"
          animate="show"
        >
          {LINKS.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              variants={navItem}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="px-3.5 py-2 text-[13.5px] font-medium tracking-[0.01em] text-black/70 hover:text-ink rounded-full hover:bg-black/[0.06] transition-colors duration-200"
            >
              {l.label}
            </motion.a>
          ))}

          {/* WhatsApp pill */}
          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            variants={navItem}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="ml-2 px-4 py-[7px] text-[13.5px] font-medium text-black/75 hover:text-ink border border-black/[0.14] rounded-full hover:border-gold-deep/60 transition-colors duration-200"
          >
            WhatsApp
          </motion.a>
        </motion.nav>

        {/* Right: cart + hamburger */}
        <div className="flex items-center gap-4 sm:gap-5">
          <motion.button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative text-black hover:text-gold-deep transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-gold text-[11px] font-semibold flex items-center justify-center ring-1 ring-gold/40"
              >
                {count}
              </motion.span>
            )}
          </motion.button>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                isMobileMenuOpen ? 'bg-gold rotate-45 translate-y-[7px]' : 'bg-black'
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black my-[5px] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                isMobileMenuOpen ? 'bg-gold -rotate-45 -translate-y-[7px]' : 'bg-black'
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile navigation overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-ink/97 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-6 left-6">
          <Logo variant="dark" />
        </div>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium tracking-tight text-white hover:text-gold transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl font-serif italic font-semibold tracking-tight text-gold underline underline-offset-4 decoration-gold/50"
        >
          WhatsApp
        </a>
      </div>
    </>
  )
}
