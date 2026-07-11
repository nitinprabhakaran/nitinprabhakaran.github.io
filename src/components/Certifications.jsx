export default function Certifications({ data }) {
  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gradient font-mono">&gt; certifications.json</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.certifications.map((cert, i) => {
            const href = cert.url || `/${cert.file}`
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow rounded-lg p-5 bg-gray-900/50 flex items-start gap-4 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/70 transition-colors">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-200 text-sm font-semibold group-hover:text-cyan-300 transition-colors">{cert.name}</div>
                  <div className="text-gray-600 text-xs mt-1">{cert.url ? 'View Badge →' : 'View Certificate →'}</div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
