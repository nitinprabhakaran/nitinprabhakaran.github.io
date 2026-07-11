import { useScrollAnimation } from '../hooks/useScrollAnimation'

function formatDate(dateStr) {
  if (dateStr === 'present') return 'Present'
  const [year, month] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(month) - 1]} ${year}`
}

function JobCard({ job, index }) {
  const [ref, isVisible] = useScrollAnimation()

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
      <div className="absolute left-0 md:left-8 top-5 w-3 h-3 rounded-full bg-cyan-500 -translate-x-1/2 ring-4 ring-gray-950">
        {index === 0 && (
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
        )}
      </div>

      <div className="card-glow rounded-lg p-6 bg-gray-900/50 group">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{job.role}</h3>
            <div className="text-cyan-400 font-semibold mt-1">{job.company}</div>
          </div>
          <div className="text-gray-500 text-sm font-mono bg-gray-900 px-3 py-1 rounded border border-gray-800">
            {formatDate(job.start)} – {formatDate(job.end)}
          </div>
        </div>
        <ul className="space-y-2 mt-4">
          {job.highlights.map((h, j) => (
            <li key={j} className="text-gray-400 text-sm flex gap-3">
              <span className="text-cyan-500 mt-1 flex-shrink-0">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience({ data }) {
  const [headingRef, headingVisible] = useScrollAnimation()

  return (
    <section id="experience" className="py-20 px-4">
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
          &gt; experience.log
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent opacity-30" />
          <div className="space-y-10">
            {data.experience.map((job, i) => (
              <JobCard key={i} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
