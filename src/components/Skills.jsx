import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'
import {
  SiTerraform, SiOpentofu,
  SiJenkins, SiGitlab, SiArgo,
  SiDocker, SiKubernetes, SiHelm,
  SiNewrelic, SiSumologic,
  SiPython, SiGnubash, SiApachegroovy,
  SiGithubcopilot, SiClaudecode,
  SiLangchain, SiLanggraph,
} from 'react-icons/si'

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

// react-icons/si components + brand colour per skill.
// null = text-badge fallback (no icon exists in Simple Icons yet).
const SKILL_ICON_MAP = {
  'AWS':                 null,
  'Azure':               null,
  'Terraform':           { Icon: SiTerraform,         color: '#7B42BC' },
  'CloudFormation':      null,
  'Azure ARM Templates': null,
  'OpenTofu':            { Icon: SiOpentofu,          color: '#FFDA18' },
  'Jenkins':             { Icon: SiJenkins,            color: '#D24939' },
  'GitLab CI':           { Icon: SiGitlab,             color: '#FC6D26' },
  'ArgoCD':              { Icon: SiArgo,               color: '#EF7B4D' },
  'Argo Workflows':      { Icon: SiArgo,               color: '#EF7B4D' },
  'Docker':              { Icon: SiDocker,             color: '#2496ED' },
  'Kubernetes':          { Icon: SiKubernetes,         color: '#326CE5' },
  'Helm':                { Icon: SiHelm,               color: '#277FFF' },
  'Kustomize':           null,
  'KEDA':                null,
  'New Relic':           { Icon: SiNewrelic,           color: '#1CE783' },
  'Sumo Logic':          { Icon: SiSumologic,          color: '#6EB0FF' },
  'Python':              { Icon: SiPython,             color: '#3776AB' },
  'Bash':                { Icon: SiGnubash,            color: '#4EAA25' },
  'Groovy':              { Icon: SiApachegroovy,       color: '#4298B8' },
  'GitHub Copilot':      { Icon: SiGithubcopilot,      color: '#ffffff' },
  'Claude Code':         { Icon: SiClaudecode,         color: '#D97757' },
  'AWS Bedrock Agents':  null,
  'AWS Strands Agents':  null,
  'Agno':                null,
  'LangChain':           { Icon: SiLangchain,          color: '#34D399' },
  'LangGraph':           { Icon: SiLanggraph,          color: '#34D399' },
}

// Varying float durations so no two icons move in sync
const FLOAT_DURATIONS = [3.2, 3.8, 4.4, 5.0, 3.6, 4.2, 4.8, 3.4]

function SkillItem({ name, globalIndex }) {
  const iconData = SKILL_ICON_MAP[name]
  const duration = FLOAT_DURATIONS[globalIndex % FLOAT_DURATIONS.length]
  const delay    = (globalIndex * 0.18).toFixed(2)

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
      <div
        className={[
          'w-11 h-11 flex items-center justify-center rounded-xl',
          'bg-gray-800/70 border border-gray-700/50',
          'transition-all duration-300',
          'group-hover:scale-110 group-hover:border-emerald-500/60 group-hover:bg-gray-700/80',
          iconData ? 'p-2' : 'p-1',
        ].join(' ')}
        onMouseEnter={e => { e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(52,211,153,0.45))' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
      >
        {iconData ? (
          <iconData.Icon size={26} color={iconData.color} />
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
        <SectionHeading command="which" args="[tools]" />

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
