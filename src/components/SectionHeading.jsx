import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'

/**
 * Section heading that mirrors the Hero's whoami pattern:
 *   ~$ whoami  →  Senior Lead DevOps Engineer  (types in, emerald, cursor blink)
 *   ~$ cat     →  about                        (same behaviour on scroll-in)
 *
 * The command is the small lead-in; the typed title is the visual focus.
 */
export default function SectionHeading({ command, title, className = 'mb-10' }) {
  const [ref, isVisible] = useScrollAnimation()

  // Fire the typewriter exactly once, the first time the element enters the viewport.
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    if (isVisible && !triggered) setTriggered(true)
  }, [isVisible, triggered])

  const [typed, isDone] = useTypewriter(triggered ? title : '', 70)

  return (
    <h2
      ref={ref}
      className={`flex items-center gap-3 ${className}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Command lead-in — small, dim, monospace */}
      <span className="text-gray-500 text-sm font-mono shrink-0">~$ {command}</span>
      {/* Arrow separator */}
      <span className="text-gray-600 text-sm shrink-0">→</span>
      {/* Typed title — emerald, large, bold, with cursor while typing */}
      <span className={`text-2xl font-bold text-emerald-400 font-mono shrink-0${!isDone ? ' cursor-blink' : ''}`}>
        {typed}
      </span>
      {/* Decorative rule — appears once text is done */}
      {isDone && (
        <span className="block h-px flex-1 bg-gray-700/50 min-w-[1.5rem]" aria-hidden="true" />
      )}
    </h2>
  )
}
