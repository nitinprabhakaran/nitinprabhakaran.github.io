import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SECTIONS = ['about', 'experience', 'skills', 'certifications', 'projects', 'contact']

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 20)

      // Active section tracking
      let current = ''
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-gray-950/95 backdrop-blur-md border-gray-800 shadow-lg shadow-black/50'
            : 'bg-gray-950/80 backdrop-blur-sm border-gray-800/50'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-cyan-400 font-bold text-lg tracking-wider font-mono hover:text-cyan-300 transition-colors"
          >
            &gt; {data.profile.name.split(' ')[0].toLowerCase()}.sh
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            {SECTIONS.map(s => (
              <a
                key={s}
                href={`#${s}`}
                className={`relative capitalize transition-colors hover:text-cyan-400 ${
                  activeSection === s ? 'text-cyan-400' : ''
                }`}
              >
                {s}
                {activeSection === s && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-cyan-400 rounded" style={{ animation: 'fadeIn 0.3s ease' }} />
                )}
              </a>
            ))}
            <Link
              to="/resume"
              target="_blank"
              className="ml-4 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-500/20 transition-all text-xs font-semibold tracking-wider"
            >
              RESUME
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden bg-gray-950/98 border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm text-gray-400"
            style={{ animation: 'fadeInUp 0.25s ease-out' }}
          >
            {SECTIONS.map(s => (
              <a
                key={s}
                href={`#${s}`}
                className={`capitalize transition-colors hover:text-cyan-400 ${activeSection === s ? 'text-cyan-400' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {s}
              </a>
            ))}
            <Link
              to="/resume"
              target="_blank"
              className="text-cyan-400 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              View Resume
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
