import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Resume from './pages/Resume'
import resumeData from './data/resume.json'

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar data={resumeData} /><Home data={resumeData} /></>} />
      <Route path="/resume" element={<Resume data={resumeData} />} />
    </Routes>
  )
}

export default App
