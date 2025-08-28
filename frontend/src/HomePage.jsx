import './style.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="home-modern" id="home">
      <div className="home-hero">
        <div className="hero-card">
          <div className="hero-content">
            <div className="profile-section">
              <div className="profile-image-container">
                <img src="/images/profile1.jpeg" alt="Juvenal - Développeur Full Stack" />
                <div className="profile-overlay">
                  <div className="profile-status">
                    <span className="status-dot"></span>
                    Disponible pour Stage
                  </div>
                </div>
              </div>
              <div className="hero-text">
                <h1>Bonjour, je suis <span className="name-highlight">Juvenal</span></h1>
                <h2 className="title-gradient">Développeur Full Stack & Passionné d'IA</h2>
                <p className="description">
                  Passionné par le développement web, la science des données et l'intelligence artificielle. 
                  Actuellement étudiant en dernière année à l'ISTY, UVSQ Paris-Saclay. 
                  Je crée des applications web modernes et innovantes. 
                </p>
              </div>
            </div>
            
            <div className="action-section">
              <div className="btn-group-modern">
                <Link to="/about" className="btn-modern primary">
                  <i className='bx bx-user'></i>
                  En savoir plus
                </Link>
                <Link to="/projects" className="btn-modern secondary">
                  <i className='bx bx-code-alt'></i>
                  Mes Projets
                </Link>
              </div>
            </div>
            
            <div className="social-section">
              <h3 className="social-title">Retrouvez-moi sur :</h3>
              <div className="social-icons-modern">
                <a href="https://linkedin.com/in/juvenal-mn" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <i className='bx bxl-linkedin'></i>
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/MNJuvenal" target="_blank" rel="noopener noreferrer" className="social-link github">
                  <i className='bx bxl-github'></i>
                  <span>GitHub</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <i className='bx bxl-instagram-alt'></i>
                  <span>Instagram</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <i className='bx bxl-twitter'></i>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des compétences en bref */}
      <div className="skills-preview">
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-code-curly'></i>
          </div>
          <h3>Frontend</h3>
          <p>React, Vue.js, TypeScript</p>
        </div>
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-server'></i>
          </div>
          <h3>Backend</h3>
          <p>Python, FastAPI, Node.js</p>
        </div>
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-brain'></i>
          </div>
          <h3>IA & ML</h3>
          <p>Machine Learning, DeepLearning</p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
