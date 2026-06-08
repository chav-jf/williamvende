import { ShieldCheck } from 'lucide-react'

// Warranty seal taken from the catalog: 6 months retail / 1 year wholesale.
export default function Garantia({ variant = 'light', className = '' }) {
  const icon = variant === 'dark' ? 'text-gold' : 'text-gold-deep'
  const text = variant === 'dark' ? 'text-white/70' : 'text-[#5A635A]'
  const strong = variant === 'dark' ? 'text-white' : 'text-[#2a2a2a]'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ShieldCheck className={`w-4 h-4 shrink-0 ${icon}`} strokeWidth={1.8} />
      <span className={`text-[11px] leading-tight ${text}`}>
        Garantía: <strong className={`font-medium ${strong}`}>6 meses</strong> al detal ·{' '}
        <strong className={`font-medium ${strong}`}>1 año</strong> al por mayor
      </span>
    </div>
  )
}
