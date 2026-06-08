import { MessageCircle, MapPin } from 'lucide-react'
import Flags from './Flags'
import Logo from './Logo'
import Garantia from './Garantia'

const WA =
  'https://wa.me/573112179082?text=' +
  encodeURIComponent('Hola William, quiero más información sobre tus productos Apple.')

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9V9c-1.3.1-2.5-.3-3.6-1v6.8c0 3.4-2.5 5.7-5.6 5.7-2.9 0-5.3-2.1-5.3-5.1 0-3.2 2.6-5.4 6.1-4.9v2.4c-.5-.1-1.1-.2-1.6-.1-1.2.2-2.1 1-2 2.4.1 1.3 1.1 2.1 2.4 2 .9 0 1.7-.6 2-1.5.1-.4.1-.8.1-1.2V3h3.5z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Logo variant="dark" className="mb-5" />
          <p className="text-white/70 leading-relaxed">
            Importando desde hace 4 años <Flags />
            <br />
            Venta al detal y por mayor ⌚️
          </p>
          <Garantia variant="dark" className="mt-5" />
        </div>

        <div className="space-y-3">
          <h4 className="text-gold uppercase text-xs tracking-[0.22em] mb-4">Contacto</h4>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-gold transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-gold" /> WhatsApp: 311 217 9082
          </a>
          <a
            href="https://www.tiktok.com/@william.vende7"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-gold transition-colors"
          >
            <TikTokIcon className="w-5 h-5 text-gold" /> @william.vende7
          </a>
          <p className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gold" /> Pasto, Nariño — Colombia
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-gold uppercase text-xs tracking-[0.22em] mb-4">Pedidos</h4>
          <p className="text-white/70">
            Haz tu pedido por WhatsApp y te asesoramos al instante. Envíos a todo el país.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#E9CF8A] via-[#C9A23F] to-[#9C7726] text-ink px-5 py-3 rounded-full font-semibold hover:brightness-110 transition-all mt-2"
          >
            Escríbenos ahora
          </a>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 py-6 text-white/40 text-xs flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} WILLIAM VENDE. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
