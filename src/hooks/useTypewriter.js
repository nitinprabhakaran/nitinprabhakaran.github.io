import { useEffect, useState } from 'react'

/**
 * Types `text` character-by-character.
 * @param {string}  text   Full target string
 * @param {number}  speed  Ms per character (default 55)
 * @param {number}  delay  Ms before typing starts (default 0)
 * @returns [displayed, isDone]
 */
export function useTypewriter(text, speed = 55, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let startTimeout
    let interval

    const start = () => {
      let i = 0
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)
    }

    if (delay > 0) {
      startTimeout = setTimeout(start, delay)
    } else {
      start()
    }

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [text, speed, delay])

  return [displayed, isDone]
}
