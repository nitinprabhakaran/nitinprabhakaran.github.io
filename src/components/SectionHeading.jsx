import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * Section heading that mirrors the Hero's whoami pattern:
 *   ~$ whoami  →  Senior Lead DevOps Engineer
 *   ~$ cat     →  about
 *
 * The command is the small lead-in; the section title is the visual focus.
 */
export default function SectionHeading({ command, title, className = 'mb-10' }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <h2
      ref={ref}
      className={`flex items-center gap-3 ${className}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Command lead-in — small, dim, monospace (like ~$ whoami) */}
      <span className="text-gray-500 text-sm font-mono shrink-0">
        ~$ {command}
      </span>
      {/* Arrow separator */}
      <span className="text-gray-600 text-sm shrink-0">→</span>
      {/* Section title — the actual focus, large and white */}
      <span className="text-2xl font-bold text-white shrink-0">{title}</span>
      {/* Decorative rule */}
      <span className="block h-px flex-1 bg-gray-700/50 min-w-[1.5rem]" aria-hidden="true" />
    </h2>
  )
}
