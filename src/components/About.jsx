import { useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AnimatedStat({ value, label, delay }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="text-center p-4 bg-gray-900 rounded border border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="text-emerald-400 font-bold text-lg">{value}</div>
      <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function About({ data }) {
  const [ref, isVisible] = useScrollAnimation()

  const stats = [
    { label: 'Experience', value: '10+ Years' },
    { label: 'Location',   value: data.profile.location },
    { label: 'Focus',      value: 'Platform Engineering' },
    { label: 'AI Adoption',value: 'Active' },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl font-bold mb-10 text-gradient font-mono"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          ref={ref}
        >
          &gt; about.md
        </h2>

        <div
          className="terminal-border rounded-lg p-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease 150ms, transform 0.7s ease 150ms',
          }}
        >
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {data.profile.summary}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map(({ label, value }, i) => (
              <AnimatedStat key={label} value={value} label={label} delay={300 + i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
