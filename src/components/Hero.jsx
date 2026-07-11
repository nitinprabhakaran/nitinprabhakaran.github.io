import { Link } from 'react-router-dom'

export default function Hero({ data }) {
  const { profile, contact } = data

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl w-full">
        <div className="mb-4 text-cyan-500 text-sm font-mono tracking-widest animate-pulse">
          &gt; initializing portfolio...
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="text-gradient">{profile.name}</span>
        </h1>
        <div className="text-xl md:text-2xl text-gray-400 mb-6 font-mono">
          <span className="text-cyan-400">~$</span> whoami <span className="text-gray-500">→</span>{' '}
          <span className="text-white">{profile.title}</span>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
          {profile.summary}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/resume"
            target="_blank"
            className="px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded hover:bg-cyan-400 transition-all text-sm tracking-wider"
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
        <div className="mt-16 flex items-center gap-3 text-gray-600 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Available for senior platform engineering roles</span>
        </div>
      </div>
    </section>
  )
}
