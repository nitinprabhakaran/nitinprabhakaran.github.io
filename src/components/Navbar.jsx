import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-cyan-400 font-bold text-lg tracking-wider font-mono">
          &gt; {data.profile.name.split(' ')[0].toLowerCase()}.sh
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {['about','experience','skills','certifications','projects','contact'].map(s => (
            <a key={s} href={`#${s}`} className="hover:text-cyan-400 transition-colors capitalize">
              {s}
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
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm text-gray-400">
          {['about','experience','skills','certifications','projects','contact'].map(s => (
            <a key={s} href={`#${s}`} className="hover:text-cyan-400 transition-colors capitalize" onClick={() => setMenuOpen(false)}>
              {s}
            </a>
          ))}
          <Link to="/resume" target="_blank" className="text-cyan-400 font-semibold">View Resume</Link>
        </div>
      )}
    </nav>
  )
}
