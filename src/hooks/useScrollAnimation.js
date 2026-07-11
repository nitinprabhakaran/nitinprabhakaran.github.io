import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, isVisible].
 * Attach `ref` to any element — `isVisible` becomes true once
 * the element enters the viewport and stays true (fire-once).
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
