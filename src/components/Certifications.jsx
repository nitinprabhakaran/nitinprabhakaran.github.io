import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'

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
      <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/30 group-hover:border-emerald-500/70 group-hover:bg-emerald-500/15 transition-all duration-300">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <div className="text-gray-200 text-sm font-semibold group-hover:text-emerald-300 transition-colors">{cert.name}</div>
        <div className="text-gray-600 text-xs mt-1 group-hover:text-gray-500 transition-colors">
          {cert.url ? 'View Badge →' : 'View Certificate →'}
        </div>
      </div>
    </a>
  )
}

export default function Certifications({ data }) {
  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading command="ls" title="certifications" />
        <div className="grid md:grid-cols-2 gap-4">
          {data.certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
