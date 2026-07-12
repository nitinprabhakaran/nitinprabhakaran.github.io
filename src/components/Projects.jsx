import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.65s ease ${index * 120}ms`,
      }}
    >
      {/* Card header accent */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <div className="w-2 h-2 rounded-full bg-gray-600" />
      </div>

      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-emerald-100 transition-colors">{project.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded border border-green-500/20 hover:border-green-400/40 hover:bg-green-500/15 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-emerald-400 text-xs hover:text-emerald-300 transition-colors font-mono group/link"
        >
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          <span>View on GitHub</span>
        </a>
      )}
    </div>
  )
}

export default function Projects({ data }) {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading command="ls" args="-la ~/projects/" />
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
