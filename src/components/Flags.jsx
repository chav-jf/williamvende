// Country flags rendered as Twemoji SVG images.
// Windows + Chrome do NOT render flag emoji (🇨🇳🇺🇸 show as "CNUS"),
// so we use images to guarantee consistent display on every device.
const BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/'

export default function Flags({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 align-middle ${className}`}>
      <img src={`${BASE}1f1e8-1f1f3.svg`} alt="China" className="inline h-[0.9em] w-auto" />
      <img src={`${BASE}1f1fa-1f1f8.svg`} alt="Estados Unidos" className="inline h-[0.9em] w-auto" />
    </span>
  )
}
