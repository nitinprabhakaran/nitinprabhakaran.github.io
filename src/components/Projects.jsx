export default function Projects({ data }) {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gradient font-mono">&gt; projects.tf</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, i) => (
            <div key={i} className="card-glow rounded-lg p-6 bg-gray-900/50 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-3">{project.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-cyan-400 text-xs hover:text-cyan-300 transition-colors font-mono"
                >
                  → View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
