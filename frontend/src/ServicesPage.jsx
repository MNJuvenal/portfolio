import './style.css'
import { Link } from 'react-router-dom'

const EXPERTISES = [
  {
    icon: 'bx bx-brain',
    title: 'AI / ML Engineering',
    featured: true,
    description: "Concevoir, entraîner et évaluer des modèles, puis les intégrer dans un produit qui tourne en production.",
    label: 'Ce que je fais :',
    items: [
      'Computer Vision : détection, segmentation (YOLOv8, Mediapipe, OpenCV)',
      'Deep Learning & transfer learning (PyTorch, TensorFlow)',
      'ML classique et suivi des expériences (XGBoost, scikit-learn, MLflow)',
      "Deep Reinforcement Learning (agent T-Rex, >95% de survie)"
    ]
  },
  {
    icon: 'bx bx-bot',
    title: 'LLM, Agents & NLP',
    description: 'Construire des assistants et des agents qui exploitent vos données et dialoguent avec vos systèmes.',
    label: 'Ce que je fais :',
    items: [
      'Pipelines RAG sur base documentaire (LangChain, ChromaDB)',
      'Orchestration multi-agents en microservices',
      'Embeddings et similarité sémantique (SBERT, CodeBERT)',
      'Analyse de code par graphes et AST (recherche au LIGM)'
    ]
  },
  {
    icon: 'bx bx-code-alt',
    title: 'Software Engineering Full Stack',
    description: "Développer des applications web complètes, de l'API au frontend, avec une architecture propre et testée.",
    label: 'Stack :',
    items: [
      'Backend : FastAPI, Flask, Spring Boot, Node.js (Express)',
      'Frontend : React, TypeScript, Angular, Vue.js, Blazor',
      'Bases de données : PostgreSQL, MongoDB, SQL',
      'Architecture N-tiers, principes SOLID, tests'
    ]
  },
  {
    icon: 'bx bx-git-merge',
    title: 'Intégration & Automatisation',
    description: "Connecter les services entre eux et automatiser les workflows métier autour de l'IA.",
    label: 'Outils :',
    items: [
      'Communication asynchrone : RabbitMQ, Kafka, SSE',
      'APIs REST et intégration de services tiers',
      "Workflows d'automatisation : n8n, Airtable",
      'Chatbots personnalisés branchés sur les outils internes'
    ]
  },
  {
    icon: 'bx bx-server',
    title: 'MLOps & DevOps',
    description: 'Mettre en production de façon fiable et reproductible.',
    label: 'Outils :',
    items: [
      'Conteneurisation : Docker, Kubernetes',
      'CI/CD : GitHub Actions, GitLab CI, SonarQube',
      'Déploiement VPS Linux, NGINX, HTTPS, Render',
      'Cloud : GCP, AWS, Azure'
    ]
  },
  {
    icon: 'bx bx-chip',
    title: 'Data & Performance',
    description: 'Traiter de gros volumes de données et optimiser le code qui compte.',
    label: 'Compétences :',
    items: [
      'Data engineering : PySpark, Pandas, ETL, PowerBI',
      'Profiling & optimisation : MAQAO, Valgrind, perf',
      'Programmation parallèle : C/C++, OpenMP, Rust',
      'Recherche opérationnelle'
    ]
  }
];

function ServicesPage() {
  return (
    <section className="services-modern">
      <div className="services-container">
        <h1 className="services-title">Mon Expertise</h1>
        <p className="services-subtitle">
          Ce que j'apporte à une équipe : de la recherche au modèle, du modèle au produit en production.
        </p>

        <div className="services-grid">
          {EXPERTISES.map((expertise) => (
            <div key={expertise.title} className={`service-card${expertise.featured ? ' featured' : ''}`}>
              <div className="service-icon">
                <i className={expertise.icon}></i>
              </div>
              <h3>{expertise.title}</h3>
              <p className="service-description">{expertise.description}</p>
              <div className="service-features">
                <h4>{expertise.label}</h4>
                <ul>
                  {expertise.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section Processus de travail */}
        <div className="process-section">
          <h2 className="process-title">Ma Façon de Travailler</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Comprendre le besoin</h3>
                <p>Cadrer le problème métier, les données disponibles et les métriques de succès</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Prototyper vite</h3>
                <p>Baseline simple, état de l'art, puis itérations mesurées</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Industrialiser</h3>
                <p>Code testé, API, conteneurs et CI/CD en méthode agile</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Déployer & suivre</h3>
                <p>Mise en production, monitoring et documentation pour l'équipe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact CTA */}
        <div className="services-cta">
          <div className="cta-content">
            <h2>Vous recrutez pour juin 2027 ?</h2>
            <p>
              Je recherche un CDI ou CDD en AI/ML Engineering ou Software Engineering, partout en France,
              sur site, en hybride ou en télétravail.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-cta primary">
                <i className='bx bx-message-dots'></i>
                Me Contacter
              </Link>
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
