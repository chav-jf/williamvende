// Brand lockup inspired by the WILLIAM VENDE print catalog:
// gold "W" emblem with a sparkle + "William.vende" wordmark + tagline.
export default function Logo({ variant = 'light', className = '' }) {
  const wordmark = variant === 'dark' ? 'text-white' : 'text-black'
  const accent = variant === 'dark' ? 'text-gold' : 'text-gold-deep'

  return (
    <a href="#top" className={`flex items-center gap-3 select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-9 h-9 sm:w-11 sm:h-11 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="wv-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9CF8A" />
            <stop offset="50%" stopColor="#C9A23F" />
            <stop offset="100%" stopColor="#9C7726" />
          </linearGradient>
        </defs>
        {/* sparkle */}
        <path
          d="M50 4 C51.5 13 55 16.5 64 18 C55 19.5 51.5 23 50 32 C48.5 23 45 19.5 36 18 C45 16.5 48.5 13 50 4 Z"
          fill="url(#wv-gold)"
        />
        {/* W monogram */}
        <path
          d="M14 34 L31 82 L50 45 L69 82 L86 34"
          fill="none"
          stroke="url(#wv-gold)"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-serif italic text-[19px] sm:text-[23px] font-semibold tracking-tight ${wordmark}`}>
          William<span className={accent}>.</span>vende
        </span>
        <span className={`mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.28em] ${accent}`}>
          Premium Apple Products
        </span>
      </span>
    </a>
  )
}
