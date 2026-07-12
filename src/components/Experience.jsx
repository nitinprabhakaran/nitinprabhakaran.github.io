import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'
import { formatDate, companyRange } from '../utils/resume.js'

function JobCard({ entry, index }) {
  const [ref, isVisible] = useScrollAnimation()
  // Support both new {positions:[]} schema and legacy flat {role,start,end,highlights}
  const positions = entry.positions || [{
    role: entry.role,
    start: entry.start,
    end: entry.end,
    highlights: entry.highlights || [],
  }]
  const { start, end } = companyRange(positions)
  const isMulti = positions.length > 1

  return (
    <div
      ref={ref}
      className="relative pl-8 md:pl-20"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-8 top-5 w-3 h-3 rounded-full bg-emerald-500 -translate-x-1/2 ring-4 ring-gray-950">
        {index === 0 && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
        )}
      </div>

      <div className="card-glow rounded-lg p-6 bg-gray-900/50 group">
        {/* Company header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
          <div className="text-emerald-400 font-bold text-lg group-hover:text-emerald-300 transition-colors">
            {entry.company}
          </div>
          <div className="text-gray-500 text-sm font-mono bg-gray-900 px-3 py-1 rounded border border-gray-800">
            {formatDate(start)} – {formatDate(end)}
          </div>
        </div>

        {/* Positions */}
        <div className={isMulti ? 'space-y-5' : ''}>
          {positions.map((pos, pi) => (
            <div key={pos.role} className={isMulti ? 'border-l-2 border-gray-700/60 pl-4' : ''}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-white font-bold text-base group-hover:text-emerald-100 transition-colors">
                  {pos.role}
                </h3>
                {isMulti && (
                  <span className="text-gray-600 text-xs font-mono">
                    {formatDate(pos.start)} – {formatDate(pos.end)}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {pos.highlights.map((h, j) => (
                  <li key={j} className="text-gray-400 text-sm flex gap-3">
                    <span className="text-emerald-500 mt-1 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience({ data }) {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>&gt; experience.log</SectionHeading>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-green-500 to-transparent opacity-30" />
          <div className="space-y-10">
            {data.experience.map((entry, i) => (
              <JobCard key={i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
