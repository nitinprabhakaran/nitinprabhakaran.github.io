import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * Animated section heading used by every section on the portfolio.
 * Fades + slides in once when the element enters the viewport.
 * Accepts an optional className to override bottom margin.
 */
export default function SectionHeading({ children, className = 'mb-10' }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <h2
      ref={ref}
      className={`text-3xl font-bold text-gradient font-mono ${className}`}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </h2>
  )
}
