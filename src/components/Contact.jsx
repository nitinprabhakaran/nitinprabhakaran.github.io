import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading.jsx'

export default function Contact({ data }) {
  const { contact, profile } = data
  const [contentRef, contentVisible] = useScrollAnimation()

  const links = [
    { label: 'Email',    value: contact.email,                        href: `mailto:${contact.email}` },
    { label: 'Phone',    value: contact.phone,                        href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/nitinprabhakaran3011', href: contact.linkedin },
    { label: 'GitHub',   value: 'github.com/nitinprabhakaran',         href: contact.github },
    { label: 'Twitter',  value: '@NITINPBK3011',                       href: contact.twitter },
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading command="curl" title="contact" className="mb-4" />
        <p
          className="text-gray-400 mb-12 text-sm"
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 150ms',
          }}
        >
          Let's build something great together.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {links.map(({ label, value, href }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="terminal-border rounded-lg p-4 hover:border-emerald-500/50 transition-all duration-300 group"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${200 + i * 80}ms, transform 0.5s ease ${200 + i * 80}ms, border-color 0.3s ease`,
              }}
            >
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</div>
              <div className="text-emerald-400 text-sm group-hover:text-emerald-300 transition-colors font-mono truncate">{value}</div>
            </a>
          ))}
        </div>

        <footer
          ref={contentRef}
          className="border-t border-gray-800 pt-8 text-gray-600 text-sm"
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 700ms',
          }}
        >
          <p>© {new Date().getFullYear()} {profile.name} · Built with React + Vite + Tailwind</p>
        </footer>
      </div>
    </section>
  )
}
