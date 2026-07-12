/**
 * Shared resume data utilities.
 * Single source of truth for date formatting and experience calculations.
 * Consumed by both portfolio section components and the /resume print page.
 */

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

/** Format a "YYYY-MM" string or the literal "present" into a human-readable label. */
export function formatDate(dateStr) {
  if (dateStr === 'present') return 'Present'
  const [year, month] = dateStr.split('-')
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`
}

/**
 * Derives the overall company date span from its positions array.
 * YYYY-MM strings sort correctly lexicographically; 'present' sorts after any date.
 */
export function companyRange(positions) {
  const starts = positions.map(p => p.start).sort()
  const ends   = positions.map(p => p.end)
  return {
    start: starts[0],
    end:   ends.includes('present') ? 'present' : ends.sort().at(-1),
  }
}

/**
/**
 * Replaces `{years}` in a summary template string with the computed years of experience.
 * Add further `{placeholder}` tokens here as needed.
 */
export function interpolateSummary(summary, experience) {
  return summary.replace('{years}', yearsOfExperience(experience))
}

/**
 * Calculates completed years of experience from the earliest position start date.
 * Returns 0 if experience array is empty.
 */
export function yearsOfExperience(experience) {
  const allStarts = experience
    .flatMap(e => (e.positions || [{ start: e.start }]).map(p => p.start))
    .filter(Boolean)
    .sort()
  if (!allStarts.length) return 0
  const [startYear, startMonth] = allStarts[0].split('-').map(Number)
  const now = new Date()
  return Math.floor((now.getFullYear() - startYear) + (now.getMonth() + 1 - startMonth) / 12)
}
