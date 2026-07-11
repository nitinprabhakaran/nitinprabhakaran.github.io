import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
    if (!resumeRef.current) return

    const pdf = new jsPDF('p', 'pt', 'a4')
    await pdf.html(resumeRef.current, {
      callback: (doc) => doc.save('Nitin_Prabhakaran_Resume.pdf'),
      margin: [0, 0, 0, 0],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 499,
      windowWidth: 794,
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector('.resume-content')
          if (el) {
            el.style.padding = '30px 36px'
            el.style.width = '499pt'
            el.style.maxWidth = '499pt'
            el.style.boxSizing = 'border-box'
            el.style.fontSize = '10px'
            const links = el.querySelectorAll('a')
            links.forEach((a) => {
              a.textContent = a.textContent.replace('https://', '')
            })
          }
        },
      },
    })
  }

  const { profile, contact, experience, skills, certifications } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Print controls - hidden on print */}
      <div className="no-print sticky top-0 bg-gray-100 border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10">
        <span className="text-gray-600 text-sm font-mono">Nitin_Prabhakaran_Resume.pdf</span>
        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-emerald-600 text-white rounded text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          ↓ Download PDF
        </button>
      </div>

      {/* Resume content */}
      <div
        ref={resumeRef}
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
          <h1 className="text-3xl font-bold" style={{ color: '#111827' }}>{profile.name}</h1>
          <div className="text-lg mt-1" style={{ color: '#4b5563' }}>{profile.title}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs" style={{ color: '#6b7280' }}>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{profile.location}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs" style={{ color: '#6b7280' }}>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ats-link">
              linkedin.com/in/nitinprabhakaran3011
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="ats-link">
              github.com/nitinprabhakaran
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Professional Summary</h2>
          <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>{profile.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Experience</h2>
          {experience.map((job, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm" style={{ color: '#111827' }}>{job.role}</div>
                  <div className="text-xs" style={{ color: '#4b5563' }}>{job.company}</div>
                </div>
                <div className="text-xs font-mono whitespace-nowrap" style={{ color: '#6b7280' }}>
                  {formatDate(job.start)} – {formatDate(job.end)}
                </div>
              </div>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((h, j) => (
                  <li key={j} className="text-xs flex gap-2" style={{ color: '#4b5563' }}>
                    <span className="flex-shrink-0" style={{ color: '#9ca3af' }}>-</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Technical Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="text-xs" style={{ color: '#374151' }}>
                <span className="font-semibold" style={{ color: '#374151' }}>{CATEGORY_LABELS[cat] || cat}:</span>{' '}
                <span style={{ color: '#4b5563' }}>{items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: '#1f2937', borderColor: '#d1d5db' }}>Certifications</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {certifications.map((cert, i) => (
              <li key={i} className="text-xs flex gap-2" style={{ color: '#374151' }}>
                <span style={{ color: '#9ca3af' }}>-</span>
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
        .resume-content p,
        .resume-content li,
        .resume-content div {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
