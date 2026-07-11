export default function Contact({ data }) {
  const { contact, profile } = data
  const links = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/nitinprabhakaran3011', href: contact.linkedin },
    { label: 'GitHub', value: 'github.com/nitinprabhakaran', href: contact.github },
    { label: 'Twitter', value: '@NITINPBK3011', href: contact.twitter },
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gradient font-mono">&gt; contact.sh</h2>
        <p className="text-gray-400 mb-12 text-sm">Let's build something great together.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {links.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="terminal-border rounded-lg p-4 hover:border-cyan-500/50 transition-all group"
            >
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</div>
              <div className="text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors font-mono truncate">{value}</div>
            </a>
          ))}
        </div>
        <footer className="border-t border-gray-800 pt-8 text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} {profile.name} · Built with React + Vite + Tailwind</p>
        </footer>
      </div>
    </section>
  )
}
