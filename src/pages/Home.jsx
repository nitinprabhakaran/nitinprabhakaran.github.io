import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Certifications from '../components/Certifications'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home({ data }) {
  return (
    <main className="min-h-screen">
      <Hero data={data} />
      <About data={data} />
      <Experience data={data} />
      <Skills data={data} />
      <Certifications data={data} />
      <Projects data={data} />
      <Contact data={data} />
    </main>
  )
}
