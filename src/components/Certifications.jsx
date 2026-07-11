import { useScrollAnimation } from '../hooks/useScrollAnimation'

function CertCard({ cert, index }) {
  const [ref, isVisible] = useScrollAnimation()
  const href = cert.url || `/${cert.file}`

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500/70 group-hover:bg-cyan-500/15 transition-all duration-300">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <div className="text-gray-200 text-sm font-semibold group-hover:text-cyan-300 transition-colors">{cert.name}</div>
        <div className="text-gray-600 text-xs mt-1 group-hover:text-gray-500 transition-colors">
          {cert.url ? 'View Badge →' : 'View Certificate →'}
        </div>
      </div>
    </a>
  )
}

export default function Certifications({ data }) {
  const [headingRef, headingVisible] = useScrollAnimation()

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl font-bold mb-10 text-gradient font-mono"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          &gt; certifications.json
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
