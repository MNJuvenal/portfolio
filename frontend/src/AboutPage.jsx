import './style.css'

const EXPERIENCES = [
  {
    date: 'Juin 2026 - Oct. 2026',
    title: 'Research Engineer (stage)',
    company: 'LIGM / DICIEN, Université Gustave Eiffel',
    location: 'Champs-sur-Marne · Projet ComplexeID',
    current: true,
    description:
      "Mesure et caractérisation de la similarité entre exercices de programmation pour la recommandation d'exercices pédagogiques (BUT Informatique), via des approches hybrides NLP, graphes et AST.",
    points: [
      'Extraction de représentations de code (AST, graphes de dépendances) avec tree-sitter et NetworkX',
      'Embeddings de code et de texte avec GraphCodeBERT, CodeBERT et SBERT, comparés à des baselines TF-IDF',
      'Évaluation expérimentale et veille bibliographique (Zotero)'
    ],
    stack: 'Python, tree-sitter, HuggingFace, NetworkX, NumPy, scikit-learn'
  },
  {
    date: 'Juin 2025 - Août 2025',
    title: 'Développeur Full Stack & IA (stage)',
    company: 'Bleu Reflet',
    location: 'Station F, Paris',
    description: "Virtual try-on : simulation réaliste de colliers sur des photos haute résolution.",
    points: [
      'Modèle YOLOv8 personnalisé (Roboflow) pour la segmentation du cou',
      'Fusion avec Mediapipe Face Mesh (478 points clés) dans un pipeline de vision unique',
      'API Flask + frontend React déployés sur VPS (NGINX reverse proxy, SSL)'
    ],
    stack: 'Python, OpenCV, Ultralytics, TypeScript, React, GitLab, Jira'
  },
  {
    date: 'Oct. 2023 - Présent',
    title: 'Mentor & Enseignant particulier',
    company: 'Département des Yvelines + Complétude',
    location: 'Yvelines',
    description:
      'Accompagnement en mathématiques et physique du secondaire au supérieur : programmes de révision sur mesure, préparation Bac et Brevet.'
  }
];

const SKILLS = [
  {
    icon: 'bx bx-brain',
    title: 'IA / Deep Learning',
    tags: ['PyTorch', 'TensorFlow', 'Keras', 'YOLOv8', 'Mediapipe', 'OpenCV', 'scikit-learn', 'XGBoost', 'MLflow', 'Deep RL']
  },
  {
    icon: 'bx bx-bot',
    title: 'NLP, LLM & Agents',
    tags: ['HuggingFace', 'GraphCodeBERT', 'CodeBERT', 'SBERT', 'LangChain', 'RAG', 'ChromaDB', 'Agents multi-services', 'tree-sitter']
  },
  {
    icon: 'bx bx-data',
    title: 'Data Engineering',
    tags: ['PySpark', 'Pandas', 'SQL', 'PostgreSQL', 'MongoDB', 'ETL', 'PowerBI', 'W&B', 'GCP', 'AWS', 'Azure']
  },
  {
    icon: 'bx bx-server',
    title: 'Backend & Intégration',
    tags: ['FastAPI', 'Flask', 'Django', 'Node.js (Express)', 'Spring Boot', 'REST', 'SSE', 'RabbitMQ', 'Kafka']
  },
  {
    icon: 'bx bx-code-curly',
    title: 'Frontend',
    tags: ['React', 'TypeScript', 'Angular', 'Vue.js', 'Blazor (.NET)', 'HTML5/CSS3', 'Tailwind']
  },
  {
    icon: 'bx bx-git-merge',
    title: 'DevOps & Automatisation',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'NGINX', 'Linux', 'SonarQube', 'n8n', 'Airtable']
  },
  {
    icon: 'bx bx-chip',
    title: 'HPC & Performance',
    tags: ['C/C++', 'Rust', 'Assembleur x86', 'OpenMP', 'MAQAO', 'Valgrind', 'perf', 'GCC/Clang']
  },
  {
    icon: 'bx bx-code-alt',
    title: 'Langages',
    tags: ['Python', 'Java 21', 'TypeScript', 'JavaScript', 'C/C++', 'C#', 'Rust', 'SQL', 'Bash', 'OCaml', 'R']
  },
  {
    icon: 'bx bx-cog',
    title: 'Gestion de projet',
    tags: ['Scrum', 'Kanban', 'Cycle en V', 'Jira', 'GitHub Projects', 'Documentation technique']
  }
];

function AboutPage() {
  return (
    <section className="about-modern">
      <div className="about-container">
        <h1 className="about-title">À propos de moi</h1>

        {/* Section de présentation personnelle */}
        <div className="about-intro">
          <div className="intro-card">
            <h2>Qui suis-je ?</h2>
            <p className="intro-text">
              Élève-ingénieur en dernière année à l'ISTY (UVSQ / Université Paris-Saclay), spécialisé en IA et
              développement logiciel. Après une prépa MP et deux expériences en IA appliquée (recherche au LIGM,
              Computer Vision en startup à Station F), je recherche un <strong>CDI ou CDD à partir de juin 2027</strong> en
              tant qu'<strong>AI/ML Engineer</strong> ou <strong>Software Engineer</strong> : full-stack avec intégration
              d'IA, agents, automatisation, MLOps.
            </p>
            <p className="intro-text">
              Ce qui me motive : les systèmes complexes, transformer un modèle en produit qui tourne en production,
              et la recherche appliquée. Autonome rapidement, rigoureux, à l'aise en équipe comme en autonomie.
              Ancien capitaine et MVP de l'équipe championne universitaire de basket-ball (2023).
            </p>
            <div className="languages-section">
              <h3>Compétences Linguistiques</h3>
              <div className="languages-grid">
                <div className="language-item">
                  <span className="language-flag">🇫🇷</span>
                  <span className="language-name">Français</span>
                  <span className="language-level">Langue maternelle</span>
                </div>
                <div className="language-item">
                  <span className="language-flag">🇬🇧</span>
                  <span className="language-name">Anglais</span>
                  <span className="language-level">Professionnel</span>
                </div>
                <div className="language-item">
                  <span className="language-flag">🇪🇸</span>
                  <span className="language-name">Espagnol</span>
                  <span className="language-level">Notions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Expériences */}
        <div className="education-section">
          <h2 className="section-title">
            <i className='bx bx-briefcase'></i>
            Expériences Professionnelles
          </h2>

          <div className="education-timeline">
            {EXPERIENCES.map((experience) => (
              <div key={experience.title} className={`education-item${experience.current ? ' current' : ''}`}>
                <div className="education-date">{experience.date}</div>
                <div className="education-content">
                  <div className="institution">
                    <h3>{experience.title}</h3>
                    <p className="location">{experience.company} · {experience.location}</p>
                  </div>
                  <div className="degree">
                    <p className="description">{experience.description}</p>
                    {experience.points && (
                      <ul className="experience-points">
                        {experience.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {experience.stack && (
                      <p className="experience-stack"><strong>Stack :</strong> {experience.stack}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Parcours */}
        <div className="education-section">
          <h2 className="section-title">
            <i className='bx bxs-graduation'></i>
            Parcours Académique
          </h2>

          <div className="education-timeline">
            <div className="education-item current">
              <div className="education-date">2023 - 2027</div>
              <div className="education-content">
                <div className="institution">
                  <h3>ISTY, École d'ingénieurs</h3>
                  <p className="location">UVSQ / Université Paris-Saclay, Yvelines, France</p>
                </div>
                <div className="degree">
                  <h4>Diplôme d'ingénieur, spécialité informatique</h4>
                  <p className="status">Dernière année · Diplôme en 2027</p>
                  <p className="description">
                    IA, Big Data, HPC, cybersécurité, programmation parallèle et distribuée, recherche
                    opérationnelle, profiling et optimisation de code, réseaux mobiles et véhiculaires.
                  </p>
                </div>
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2020 - 2023</div>
              <div className="education-content">
                <div className="institution">
                  <h3>Sup' Management</h3>
                  <p className="location">Libreville, Gabon</p>
                </div>
                <div className="degree">
                  <h4>CPGE MPSI / MP option Informatique</h4>
                  <p className="description">
                    Préparation intensive aux concours d'entrée des grandes écoles d'ingénieurs françaises.
                    Champion universitaire de basket-ball 2023 (capitaine et MVP).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Compétences */}
        <div className="skills-section">
          <h2 className="section-title">
            <i className='bx bx-code-alt'></i>
            Compétences Techniques
          </h2>

          <div className="skills-grid">
            {SKILLS.map((category) => (
              <div key={category.title} className="skill-category">
                <div className="category-header">
                  <i className={category.icon}></i>
                  <h3>{category.title}</h3>
                </div>
                <div className="skills-list">
                  {category.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Certifications */}
        <div className="skills-section">
          <h2 className="section-title">
            <i className='bx bx-award'></i>
            Certifications
          </h2>
          <div className="skills-list">
            <span className="skill-tag">Machine Learning / Deep Learning Specialization · DeepLearning.AI & Stanford Online (2025)</span>
            <span className="skill-tag">MATLAB · MathWorks (2025)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
