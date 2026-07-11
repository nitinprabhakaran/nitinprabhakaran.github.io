import { useScrollAnimation } from '../hooks/useScrollAnimation'

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

function SkillCard({ category, items, index }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="terminal-border rounded-lg p-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <h3 className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4 font-mono">
        {CATEGORY_LABELS[category] || category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <span
            key={skill}
            className="skill-tag"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.85)',
              transition: `opacity 0.4s ease ${index * 100 + i * 40}ms, transform 0.4s ease ${index * 100 + i * 40}ms`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills({ data }) {
  const [headingRef, headingVisible] = useScrollAnimation()

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl font-bold mb-10 text-gradient font-mono"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          &gt; skills.yaml
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(data.skills).map(([category, items], i) => (
            <SkillCard key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
