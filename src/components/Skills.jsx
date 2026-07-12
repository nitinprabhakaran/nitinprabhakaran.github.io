import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'

const CATEGORY_LABELS = {
  cloud:          'Cloud',
  iac:            'Infrastructure as Code',
  cicd:           'CI/CD',
  containers:     'Containers & Orchestration',
  observability:  'Observability',
  scripting:      'Scripting',
  coding_harness: 'Coding Harness',
  ai_automation:  'AI & Automation',
}

// Simple Icons CDN: cdn.simpleicons.org/slug/hex  — null = text-badge fallback
const SKILL_ICONS = {
  'AWS':                 'https://cdn.simpleicons.org/amazonaws/FF9900',
  'Azure':               'https://cdn.simpleicons.org/microsoftazure/0078D4',
  'Terraform':           'https://cdn.simpleicons.org/terraform/7B42BC',
  'CloudFormation':      'https://cdn.simpleicons.org/amazonaws/FF9900',
  'Azure ARM Templates': 'https://cdn.simpleicons.org/microsoftazure/0078D4',
  'OpenTofu':            'https://cdn.simpleicons.org/opentofu/FFDA18',
  'Jenkins':             'https://cdn.simpleicons.org/jenkins/D24939',
  'GitLab CI':           'https://cdn.simpleicons.org/gitlab/FC6D26',
  'ArgoCD':              'https://cdn.simpleicons.org/argo/EF7B4D',
  'Argo Workflows':      'https://cdn.simpleicons.org/argo/EF7B4D',
  'Docker':              'https://cdn.simpleicons.org/docker/2496ED',
  'Kubernetes':          'https://cdn.simpleicons.org/kubernetes/326CE5',
  'Helm':                'https://cdn.simpleicons.org/helm/277FFF',
  'Kustomize':           null,
  'New Relic':           'https://cdn.simpleicons.org/newrelic/1CE783',
  'Sumo Logic':          'https://cdn.simpleicons.org/sumologic/6EB0FF',
  'Python':              'https://cdn.simpleicons.org/python/3776AB',
  'Bash':                'https://cdn.simpleicons.org/gnubash/4EAA25',
  'Groovy':              'https://cdn.simpleicons.org/apachegroovy/4298B8',
  'GitHub Copilot':      'https://cdn.simpleicons.org/githubcopilot/ffffff',
  'Claude Code':         'https://cdn.simpleicons.org/anthropic/D97757',
  'AWS Bedrock Agents':  'https://cdn.simpleicons.org/amazonaws/FF9900',
  'AWS Strands Agents':  'https://cdn.simpleicons.org/amazonaws/FF9900',
  'Agno':                null,
  'LangChain':           'https://cdn.simpleicons.org/langchain/34D399',
  'LangGraph':           null,
}

// Varying durations so icons never float in sync
const FLOAT_DURATIONS = [3.2, 3.8, 4.4, 5.0, 3.6, 4.2, 4.8, 3.4]

function SkillItem({ name, globalIndex }) {
  const [imgOk, setImgOk] = useState(true)
  const iconUrl  = SKILL_ICONS[name]
  const duration = FLOAT_DURATIONS[globalIndex % FLOAT_DURATIONS.length]
  const delay    = (globalIndex * 0.18).toFixed(2)
  const showIcon = iconUrl && imgOk

  return (
    <div
      className="group flex flex-col items-center gap-1.5 cursor-default"
      style={{
        animation: `techFloat ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      title={name}
    >
      {/* Icon tile */}
      <div className={[
        'w-11 h-11 flex items-center justify-center rounded-xl',
        'bg-gray-800/70 border border-gray-700/50',
        'transition-all duration-300',
        'group-hover:scale-110 group-hover:border-emerald-500/60',
        'group-hover:bg-gray-700/80',
        showIcon ? 'p-2' : 'p-1',
      ].join(' ')}
        style={{ filter: 'drop-shadow(0 0 0px rgba(52,211,153,0))' }}
        onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(52,211,153,0.45))'}
        onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(52,211,153,0))'}
      >
        {showIcon ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-full h-full object-contain"
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="text-emerald-400 text-[9px] font-bold font-mono leading-tight text-center">
            {name.length > 8 ? name.slice(0, 7) + '\u2026' : name}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="text-gray-500 text-[10px] font-mono text-center leading-tight
                       group-hover:text-gray-300 transition-colors duration-200
                       max-w-[72px] break-words">
        {name}
      </span>
    </div>
  )
}

function SkillCard({ category, items, cardIndex, globalOffset }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className="terminal-border rounded-lg p-5"
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${cardIndex * 100}ms, transform 0.6s ease ${cardIndex * 100}ms`,
      }}
    >
      <h3 className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-5 font-mono">
        {CATEGORY_LABELS[category] || category}
      </h3>
      <div className="flex flex-wrap gap-5">
        {items.map((skill, i) => (
          <SkillItem key={skill} name={skill} globalIndex={globalOffset + i} />
        ))}
      </div>
    </div>
  )
}

export default function Skills({ data }) {
  let globalOffset = 0
  const categories = Object.entries(data.skills)

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>&gt; skills.yaml</SectionHeading>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map(([category, items], cardIndex) => {
            const offset = globalOffset
            globalOffset += items.length
            return (
              <SkillCard
                key={category}
                category={category}
                items={items}
                cardIndex={cardIndex}
                globalOffset={offset}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
