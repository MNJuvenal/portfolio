import './style.css';
import { Link } from 'react-router-dom';
import CodingStats from './CodingStats';

function HomePage() {
  return (
    <section className="home-modern" id="home">
      <div className="home-hero">
        <div className="hero-card">
          <div className="hero-content">
            <div className="profile-section">
              <div className="profile-image-container">
                <img src="/images/profile1.jpeg" alt="Juvenal Malecou - AI/ML & Software Engineer" />
                <div className="profile-overlay">
                  <div className="profile-status">
                    <span className="status-dot"></span>
                    CDI / CDD · Juin 2027
                  </div>
                </div>
              </div>
              <div className="hero-text">
                <h1>Bonjour, je suis <span className="name-highlight">Juvenal</span></h1>
                <h2 className="title-gradient">AI/ML & Software Engineer</h2>
                <p className="description">
                  Ingénieur informatique (ISTY, UVSQ / Paris-Saclay, diplômé en 2027) spécialisé en IA et
                  développement logiciel. Je conçois des systèmes de bout en bout : modèles de Computer Vision
                  et de NLP, agents IA et pipelines RAG, APIs et applications full-stack, jusqu'au déploiement
                  et à l'automatisation.
                </p>
                <div className="hero-availability">
                  <span><i className='bx bx-briefcase'></i> Recherche un CDI / CDD à partir de juin 2027</span>
                  <span><i className='bx bx-map'></i> France entière · Sur site / Hybride / Télétravail</span>
                </div>
              </div>
            </div>

            <div className="action-section">
              <div className="btn-group-modern">
                <Link to="/contact" className="btn-modern primary">
                  <i className='bx bx-envelope'></i>
                  Me contacter
                </Link>
                <Link to="/projects" className="btn-modern secondary">
                  <i className='bx bx-code-alt'></i>
                  Mes Projets
                </Link>
                <Link to="/about" className="btn-modern secondary">
                  <i className='bx bx-user'></i>
                  Mon parcours
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
                <a href="https://leetcode.com/u/lajuve01/" target="_blank" rel="noopener noreferrer" className="social-link leetcode">
                  <i className='bx bx-code-block'></i>
                  <span>LeetCode</span>
                </a>
                <a href="https://www.deep-ml.com/profile/JrKuyw4UG7SbUZeJiSxoiJjRleg2" target="_blank" rel="noopener noreferrer" className="social-link deepml">
                  <i className='bx bx-brain'></i>
                  <span>Deep-ML</span>
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
            <i className='bx bx-brain'></i>
          </div>
          <h3>IA & Machine Learning</h3>
          <p>PyTorch, TensorFlow, YOLOv8, Mediapipe, scikit-learn, XGBoost, MLflow</p>
        </div>
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-bot'></i>
          </div>
          <h3>LLM, Agents & NLP</h3>
          <p>LangChain, RAG, HuggingFace (CodeBERT, SBERT), orchestration multi-agents</p>
        </div>
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-code-curly'></i>
          </div>
          <h3>Software & Full Stack</h3>
          <p>FastAPI, Flask, Spring Boot, Node.js, React, TypeScript, PostgreSQL</p>
        </div>
        <div className="skill-card">
          <div className="skill-icon">
            <i className='bx bx-git-merge'></i>
          </div>
          <h3>Intégration & Automatisation</h3>
          <p>Docker, Kubernetes, CI/CD, RabbitMQ, Kafka, n8n, Airtable</p>
        </div>
      </div>

      {/* Statistiques LeetCode / Deep-ML en temps réel */}
      <CodingStats />
    </section>
  );
}

export default HomePage;
