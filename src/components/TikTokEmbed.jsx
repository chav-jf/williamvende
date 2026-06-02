import { useEffect } from 'react'

let scriptAppended = false

function loadOrRefreshTikTok() {
  // If the embed library is already present, ask it to (re)render the blockquotes.
  if (window.tiktokEmbed?.lib?.render) {
    window.tiktokEmbed.lib.render(document.querySelectorAll('.tiktok-embed'))
    return
  }
  if (scriptAppended) return
  const s = document.createElement('script')
  s.src = 'https://www.tiktok.com/embed.js'
  s.async = true
  document.body.appendChild(s)
  scriptAppended = true
}

function getVideoId(url) {
  const m = String(url).match(/video\/(\d+)/)
  return m ? m[1] : ''
}

export default function TikTokEmbed({ url }) {
  useEffect(() => {
    loadOrRefreshTikTok()
  }, [url])

  const id = getVideoId(url)

  return (
    <blockquote
      className="tiktok-embed"
      cite={url}
      data-video-id={id}
      style={{ width: '100%', maxWidth: '100%', minWidth: 0, margin: 0 }}
    >
      <section>
        <a href={url} target="_blank" rel="noreferrer">
          Ver en TikTok
        </a>
      </section>
    </blockquote>
  )
}
