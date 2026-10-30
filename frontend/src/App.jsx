import './style.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ServicesPage from './ServicesPage'
import ProjectsPage from './ProjectsPage'
import ContactPage from './ContactPage'
import { useGoogleAnalytics } from './analytics'
import VisitorCounter from './VisitorCounter'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Router>
      <AnalyticsTracker />
      <div className={darkMode ? 'dark' : ''}>
        <header className="header">
          <Link to="/" className="logo">
            Juvenal <span>Malecou</span>
          </Link>
          <nav className="navbar">
            <Link to="/" className="active">Accueil</Link>
            <Link to="/about">À propos</Link>
            <Link to="/services">Expertise</Link>
            <Link to="/projects">Projets</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <button onClick={() => setDarkMode(!darkMode)} className="text-cyan-400">🌓</button>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        {/* Compteur de visiteurs discret */}
        <VisitorCounter />
      </div>
    </Router>
  )
}

// Composant pour tracker les changements de page
function AnalyticsTracker() {
  useGoogleAnalytics();
  return null;
}

export default App