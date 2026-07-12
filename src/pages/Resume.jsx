import { formatDate, companyRange, interpolateSummary } from '../utils/resume.js'

const CATEGORY_LABELS = {
  cloud: 'Cloud',
  iac: 'IaC',
  cicd: 'CI/CD',
  containers: 'Containers',
  observability: 'Observability',
  scripting: 'Scripting',
  coding_harness: 'Coding Harness',
  ai_automation: 'AI & Automation',
}

export default function Resume({ data }) {
  const { profile, contact, experience, skills, certifications, projects } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Print controls – hidden on print */}
      <div className="no-print sticky top-0 bg-gray-100 border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10">
        <span className="text-gray-600 text-sm font-mono">Nitin_Prabhakaran_Resume.pdf</span>
        <button
          data-testid="download-pdf-btn"
          onClick={() => window.print()}
          className="px-5 py-2 bg-emerald-600 text-white rounded text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          ↓ Download PDF
        </button>
      </div>

      {/* Resume content */}
      <div
        className="resume-content max-w-[210mm] mx-auto bg-white text-sm leading-relaxed"
        style={{
          fontFamily: 'Arial, sans-serif',
          minHeight: '297mm',
          color: '#111827',
          backgroundColor: '#ffffff',
          width: '210mm',
          padding: '40px 48px',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="border-b-2 pb-4 mb-6" style={{ borderColor: '#1f2937' }}>
          <h1 className="text-3xl font-bold" data-testid="resume-name" style={{ color: '#111827' }}>{profile.name}</h1>
          <div className="text-lg mt-1" style={{ color: '#4b5563' }}>{profile.title}</div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs" style={{ color: '#6b7280' }}>
            <span><span className="font-semibold" style={{ color: '#374151' }}>Email:</span> {contact.email}</span>
            <span><span className="font-semibold" style={{ color: '#374151' }}>Phone:</span> {contact.phone}</span>
            <span><span className="font-semibold" style={{ color: '#374151' }}>Location:</span> {profile.location}</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1 text-xs" style={{ color: '#6b7280' }}>
            <span>
              <span className="font-semibold" style={{ color: '#374151' }}>LinkedIn:</span>{' '}
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ats-link">
                linkedin.com/in/nitinprabhakaran3011
              </a>
            </span>
            <span>
              <span className="font-semibold" style={{ color: '#374151' }}>GitHub:</span>{' '}
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="ats-link">
                github.com/nitinprabhakaran
              </a>
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Professional Summary</h2>
          <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>{interpolateSummary(profile.summary, experience)}</p>
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Experience</h2>
          {experience.map((entry, i) => {
            const positions = entry.positions
            const { start, end } = companyRange(positions)
            const isMulti = positions.length > 1
            return (
              <div key={i} className="mb-4" style={{ breakInside: 'avoid' }}>
                {/* Company row */}
                <div className="flex justify-between items-start">
                  <div className="font-bold text-sm" style={{ color: '#111827' }}>{entry.company}</div>
                  <div className="text-xs font-mono whitespace-nowrap" style={{ color: '#6b7280' }}>
                    {formatDate(start)} – {formatDate(end)}
                  </div>
                </div>

                {/* Positions */}
                <div className={isMulti ? 'mt-2 space-y-2' : 'mt-1'}>
                  {positions.map((pos, pi) => (
                    <div key={pi} style={{ breakInside: 'avoid' }}>
                      <div className="flex justify-between items-baseline">
                        <div
                          className={isMulti ? 'text-xs font-semibold' : 'text-xs'}
                          style={{ color: '#374151', paddingLeft: isMulti ? '8px' : '0' }}
                        >
                          {pos.role}
                        </div>
                        {isMulti && (
                          <div className="text-xs font-mono whitespace-nowrap" style={{ color: '#9ca3af' }}>
                            {formatDate(pos.start)} – {formatDate(pos.end)}
                          </div>
                        )}
                      </div>
                      <ul className="mt-1 space-y-0.5" style={{ paddingLeft: isMulti ? '8px' : '0' }}>
                        {pos.highlights.map((h, j) => (
                          <li key={j} className="text-xs flex gap-2" style={{ color: '#4b5563' }}>
                            <span className="flex-shrink-0" style={{ color: '#9ca3af' }}>–</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Skills */}
        <div className="mb-5" style={{ breakInside: 'avoid' }}>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Technical Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="text-xs" style={{ color: '#374151' }}>
                <span className="font-semibold" style={{ color: '#374151' }}>{CATEGORY_LABELS[cat] || cat}:</span>{'  '}
                <span style={{ color: '#4b5563' }}>{items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-5" style={{ breakInside: 'avoid' }}>
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Key Projects</h2>
            <ul className="space-y-2">
              {projects.map((proj, i) => (
                <li key={i} className="text-xs" style={{ breakInside: 'avoid' }}>
                  <span className="font-semibold" style={{ color: '#111827' }}>{proj.name}</span>
                  {proj.tags && (
                    <span className="ml-2 font-mono" style={{ color: '#9ca3af' }}>
                      [{proj.tags.join(', ')}]
                    </span>
                  )}
                  <span style={{ color: '#9ca3af' }}> – </span>
                  <span style={{ color: '#4b5563' }}>{proj.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        <div style={{ breakInside: 'avoid' }}>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Certifications</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {certifications.map((cert, i) => (
              <li key={i} className="text-xs flex gap-2" style={{ color: '#374151', breakInside: 'avoid' }}>
                <span style={{ color: '#9ca3af' }}>–</span>
                <span style={{ color: '#4b5563' }}>{cert.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .resume-content, .resume-content * {
          color-scheme: light !important;
        }
        .ats-link {
          color: #6b7280;
          text-decoration: none;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; }
          .resume-content {
            width: 100% !important;
            max-width: 100% !important;
            /* padding comes from @page margin below, which repeats on every page */
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          @page {
            size: A4;
            /* 18 mm margin on all sides, applied to every printed page */
            margin: 18mm;
          }
        }
      `}</style>
    </div>
  )
}
