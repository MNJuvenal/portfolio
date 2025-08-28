import './style.css'

function ServicesPage() {
  return (
    <section className="services-modern">
      <div className="services-container">
        <h1 className="services-title">Mes Services</h1>
        <p className="services-subtitle">
          Solutions technologiques sur mesure alliant expertise technique et innovation
        </p>

        <div className="services-grid">
          {/* Service 1: Développement Web Full Stack */}
          <div className="service-card featured">
            <div className="service-icon">
              <i className='bx bx-code-alt'></i>
            </div>
            <h3>Développement Web Full Stack</h3>
            <p className="service-description">
              Création d'applications web modernes et performantes avec les dernières technologies.
            </p>
            <div className="service-features">
              <h4>Technologies maîtrisées :</h4>
              <ul>
                <li>Frontend : React, Vue.js, Angular, TypeScript</li>
                <li>Backend : Python (FastAPI), Node.js, Java21</li>
                <li>Bases de données : PostgreSQL, MongoDB, MySQL</li>
                <li>Déploiement : Docker, Nginx, CI/CD</li>
              </ul>
            </div>
          </div>

          {/* Service 2: Intelligence Artificielle & Machine Learning */}
          <div className="service-card">
            <div className="service-icon">
              <i className='bx bx-brain'></i>
            </div>
            <h3>Intelligence Artificielle & ML</h3>
            <p className="service-description">
              Développement de solutions d'IA personnalisées pour automatiser et optimiser vos processus.
            </p>
            <div className="service-features">
              <h4>Spécialisations :</h4>
              <ul>
                <li>Vision par ordinateur (OpenCV, YOLO v8)</li>
                <li>Traitement du langage naturel (NLP)</li>
                <li>Détection et reconnaissance (MediaPipe)</li>
                <li>Analyse de données et prédiction</li>
              </ul>
            </div>
          </div>

          {/* Service 3: Applications Mobiles & Web */}
          <div className="service-card">
            <div className="service-icon">
              <i className='bx bx-mobile-alt'></i>
            </div>
            <h3>Applications Mobiles & Web</h3>
            <p className="service-description">
              Applications cross-platform modernes avec interface utilisateur intuitive.
            </p>
            <div className="service-features">
              <h4>Solutions proposées :</h4>
              <ul>
                <li>Applications web progressives (PWA)</li>
                <li>Interfaces responsive et accessibles</li>
                <li>Intégration APIs et services externes</li>
                <li>Optimisation des performances</li>
              </ul>
            </div>
          </div>

          {/* Service 4: Data Science & Analyse */}
          <div className="service-card">
            <div className="service-icon">
              <i className='bx bx-data'></i>
            </div>
            <h3>Data Science & Analyse</h3>
            <p className="service-description">
              Transformation de vos données en insights stratégiques avec des outils d'analyse avancés.
            </p>
            <div className="service-features">
              <h4>Outils utilisés :</h4>
              <ul>
                <li>Python (Pandas, Matplotlib, Seaborn)</li>
                <li>R (ggplot2, dplyr, R Markdown)</li>
                <li>PowerBI et tableaux de bord interactifs</li>
                <li>Modélisation prédictive et statistique</li>
              </ul>
            </div>
          </div>

          {/* Service 5: Déploiement & DevOps */}
          <div className="service-card">
            <div className="service-icon">
              <i className='bx bx-server'></i>
            </div>
            <h3>Déploiement & DevOps</h3>
            <p className="service-description">
              Mise en production sécurisée et automatisation des processus de déploiement.
            </p>
            <div className="service-features">
              <h4>Services inclus :</h4>
              <ul>
                <li>Configuration serveurs (VPS Linux, Nginx)</li>
                <li>Conteneurisation (Docker, Kubernetes)</li>
                <li>CI/CD avec GitHub Actions</li>
                <li>Sécurisation HTTPS et monitoring</li>
              </ul>
            </div>
          </div>

          {/* Service 6: Conseil & Formation */}
          <div className="service-card">
            <div className="service-icon">
              <i className='bx bx-chalkboard'></i>
            </div>
            <h3>Conseil & Formation</h3>
            <p className="service-description">
              Accompagnement technique et formation sur les technologies modernes.
            </p>
            <div className="service-features">
              <h4>Domaines d'expertise :</h4>
              <ul>
                <li>Audit technique et recommandations</li>
                <li>Formation développement web moderne</li>
                <li>Initiation à l'IA et Machine Learning</li>
                <li>Méthodologies agiles (Scrum, Kanban)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Processus de travail */}
        <div className="process-section">
          <h2 className="process-title">Mon Processus de Travail</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Analyse & Consultation</h3>
                <p>Étude de vos besoins et définition des objectifs techniques</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Conception & Architecture</h3>
                <p>Design de l'architecture technique et prototype fonctionnel</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Développement</h3>
                <p>Codage avec méthodologies agiles et tests continus</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Déploiement & Suivi</h3>
                <p>Mise en production et maintenance préventive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact CTA */}
        <div className="services-cta">
          <div className="cta-content">
            <h2>Prêt à démarrer votre projet ?</h2>
            <p>Discutons de vos besoins et trouvons ensemble la solution technique idéale.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-cta primary">
                <i className='bx bx-message-dots'></i>
                Me Contacter
              </a>
              <a href="https://linkedin.com/in/juvenal-mn" target="_blank" rel="noopener noreferrer" className="btn-cta secondary">
                <i className='bx bxl-linkedin'></i>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage