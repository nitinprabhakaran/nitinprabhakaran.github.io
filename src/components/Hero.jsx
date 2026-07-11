import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'

const STAGGER = (i) => ({
  opacity: 1,
  transform: 'translateY(0)',
  transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s ease ${i * 150}ms`,
})

export default function Hero({ data }) {
  const { profile, contact } = data
  const [typedRole, rolesDone] = useTypewriter(profile.title, 52, 900)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">

      {/* ── Animated background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-grid absolute inset-0" />
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', animation: 'orbPulse 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', animation: 'orbPulse 10s ease-in-out infinite 3s' }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative max-w-4xl w-full">

        {/* Prompt label */}
        <div
          className="mb-4 text-cyan-500 text-sm font-mono tracking-widest"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}
        >
          <span className="animate-pulse">&gt;</span> initializing portfolio...
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ animation: 'fadeInUp 0.7s ease-out 200ms both' }}
        >
          <span className="text-gradient">{profile.name}</span>
        </h1>

        {/* Typewriter role */}
        <div
          className="text-xl md:text-2xl text-gray-400 mb-6 font-mono min-h-[2rem]"
          style={{ animation: 'fadeInUp 0.7s ease-out 400ms both' }}
        >
          <span className="text-cyan-400">~$</span> whoami <span className="text-gray-500">→</span>{' '}
          <span className={`text-white${!rolesDone ? ' cursor-blink' : ''}`}>{typedRole}</span>
        </div>

        {/* Summary */}
        <p
          className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed"
          style={{ animation: 'fadeInUp 0.7s ease-out 600ms both' }}
        >
          {profile.summary}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4"
          style={{ animation: 'fadeInUp 0.7s ease-out 800ms both' }}
        >
          <Link
            to="/resume"
            target="_blank"
            className="px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded hover:bg-cyan-400 transition-all text-sm tracking-wider shadow-lg hover:shadow-cyan-500/30"
          >
            ↓ DOWNLOAD RESUME
          </Link>
          <a
            href="#projects"
            className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded hover:bg-cyan-500/10 transition-all text-sm tracking-wider"
          >
            VIEW PROJECTS
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-700 text-gray-400 font-semibold rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-sm tracking-wider"
          >
            LINKEDIN
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-700 text-gray-400 font-semibold rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-sm tracking-wider"
          >
            GITHUB
          </a>
        </div>

        {/* Status indicator */}
        <div
          className="mt-16 flex items-center gap-3 text-gray-600 text-sm"
          style={{ animation: 'fadeInUp 0.7s ease-out 1000ms both' }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Available for senior platform engineering roles</span>
        </div>
      </div>
    </section>
  )
}
