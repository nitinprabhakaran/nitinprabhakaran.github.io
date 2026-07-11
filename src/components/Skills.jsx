const CATEGORY_LABELS = {
  cloud: 'Cloud',
  iac: 'Infrastructure as Code',
  cicd: 'CI/CD',
  containers: 'Containers & Orchestration',
  observability: 'Observability',
  scripting: 'Scripting',
  coding_harness: 'Coding Harness',
  ai_automation: 'AI & Automation',
}

export default function Skills({ data }) {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gradient font-mono">&gt; skills.yaml</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(data.skills).map(([category, items]) => (
            <div key={category} className="terminal-border rounded-lg p-6">
              <h3 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 font-mono">
                {CATEGORY_LABELS[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
