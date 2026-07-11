import { useRef } from 'react'

function formatDate(dateStr) {
  if (dateStr === 'present') return 'Present'
  const [year, month] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(month) - 1]} ${year}`
}

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
  const resumeRef = useRef(null)

  const handleDownload = async () => {
    const { default: html2pdf } = await import('html2pdf.js')
    const opt = {
      margin: 0,
      filename: 'Nitin_Prabhakaran_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }
    html2pdf().set(opt).from(resumeRef.current).save()
  }

  const { profile, contact, experience, skills, certifications } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Print controls - hidden on print */}
      <div className="no-print sticky top-0 bg-gray-100 border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10">
        <span className="text-gray-600 text-sm font-mono">Nitin_Prabhakaran_Resume.pdf</span>
        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-cyan-600 text-white rounded text-sm font-semibold hover:bg-cyan-700 transition-colors"
        >
          ↓ Download PDF
        </button>
      </div>

      {/* Resume content */}
      <div
        ref={resumeRef}
        className="max-w-[210mm] mx-auto bg-white text-gray-900 px-12 py-10 text-sm leading-relaxed"
        style={{ fontFamily: 'Arial, sans-serif', minHeight: '297mm' }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <div className="text-lg text-gray-600 mt-1">{profile.title}</div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{contact.linkedin}</span>
            <span>{contact.github}</span>
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-xs leading-relaxed">{profile.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Experience</h2>
          {experience.map((job, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900 text-sm">{job.role}</div>
                  <div className="text-gray-600 text-xs">{job.company}</div>
                </div>
                <div className="text-gray-500 text-xs font-mono whitespace-nowrap">
                  {formatDate(job.start)} – {formatDate(job.end)}
                </div>
              </div>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((h, j) => (
                  <li key={j} className="text-gray-700 text-xs flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="text-xs">
                <span className="font-semibold text-gray-700">{CATEGORY_LABELS[cat] || cat}:</span>{' '}
                <span className="text-gray-600">{items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          <ul className="grid grid-cols-2 gap-1">
            {certifications.map((cert, i) => (
              <li key={i} className="text-xs text-gray-700 flex gap-2">
                <span className="text-gray-400">✓</span>
                <span>{cert.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
