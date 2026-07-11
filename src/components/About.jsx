export default function About({ data }) {
  return (
    <section id="about" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gradient font-mono">&gt; about.md</h2>
        <div className="terminal-border rounded-lg p-8">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {data.profile.summary}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Experience', value: '10+ Years' },
              { label: 'Location', value: data.profile.location },
              { label: 'Focus', value: 'Platform Engineering' },
              { label: 'AI Adoption', value: 'Active' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-4 bg-gray-900 rounded border border-gray-800">
                <div className="text-cyan-400 font-bold text-lg">{value}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
