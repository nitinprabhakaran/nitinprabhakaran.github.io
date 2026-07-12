import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * Terminal-style section heading, matching the ~$ whoami pattern in the Hero.
 * Renders:  ~$ <command> [args]
 */
export default function SectionHeading({ command, args, className = 'mb-10' }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <h2
      ref={ref}
      className={`flex items-center gap-3 font-mono ${className}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <span className="text-gray-500 text-base">~$</span>
      <span className="text-emerald-400 text-2xl font-bold">{command}</span>
      {args && <span className="text-gray-500 text-base font-normal">{args}</span>}
      <span className="block h-px flex-1 bg-gray-700/50 min-w-[1.5rem] ml-2" aria-hidden="true" />
    </h2>
  )
}
