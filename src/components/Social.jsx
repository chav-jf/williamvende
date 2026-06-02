import { ArrowUpRight, Play } from 'lucide-react'
import { tiktokVideos, tiktokProfile } from '../data/tiktok'
import TikTokEmbed from './TikTokEmbed'

export default function Social() {
  const hasVideos = tiktokVideos.length > 0

  return (
    <section id="redes" className="scroll-mt-24 w-full bg-[#FAFBF9] border-y border-[#F1F3F1]">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#738273] text-sm uppercase tracking-widest mb-2">Redes</p>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-black">
              Míranos en TikTok
            </h2>
          </div>
          <a
            href={tiktokProfile}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start bg-[#1C2E1E] text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-[#2a4430] transition-colors"
          >
            Síguenos @william.vende7 <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {hasVideos ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiktokVideos.map((url) => (
              <div key={url} className="flex justify-center w-full">
                <TikTokEmbed url={url} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <a
                key={i}
                href={tiktokProfile}
                target="_blank"
                rel="noreferrer"
                className="group aspect-[9/16] rounded-3xl border border-dashed border-[#C9D2C9] bg-white flex flex-col items-center justify-center gap-3 text-center p-6 hover:border-[#1C2E1E] transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#1C2E1E] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                </div>
                <p className="text-sm text-[#5A635A]">Próximamente: video de TikTok</p>
                <p className="text-xs text-[#738273]">Toca para ver el perfil</p>
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-[#738273] mt-6">
          ¿Eres el administrador? Pega los links de los videos en{' '}
          <code className="bg-white px-1.5 py-0.5 rounded border border-[#F1F3F1]">
            src/data/tiktok.js
          </code>
          .
        </p>
      </div>
    </section>
  )
}
