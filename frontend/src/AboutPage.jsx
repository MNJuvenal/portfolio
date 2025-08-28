import './style.css'

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
              Étudiant en dernière année d'école d'ingénieur ayant une solide formation en mathématiques, 
              physiques et en informatique avec une forte aptitude à acquérir de nouvelles connaissances. 
              Capable à la fois de travailler en équipe et de fonctionner de manière autonome.
            </p>
            <div className="languages-section">
              <h3>Compétences Linguistiques</h3>
              <div className="languages-grid">
                <div className="language-item">
                  <span className="language-flag">🇫🇷</span>
                  <span className="language-name">Français</span>
                  <span className="language-level">Courant</span>
                </div>
                <div className="language-item">
                  <span className="language-flag">🇬🇧</span>
                  <span className="language-name">Anglais</span>
                  <span className="language-level">Technique B1/B2</span>
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

        {/* Section Parcours */}
        <div className="education-section">
          <h2 className="section-title">
            <i className='bx bxs-graduation'></i>
            Parcours Académique
          </h2>
          
          <div className="education-timeline">
            <div className="education-item current">
              <div className="education-date">2023 - 2026</div>
              <div className="education-content">
                <div className="institution">
                  <h3>ISTY, École d'ingénieurs</h3>
                  <p className="location">UVSQ-Paris-Saclay, Yvelines, France</p>
                </div>
                <div className="degree">
                  <h4>Diplôme d'ingénieur, spécialité informatique</h4>
                  <p className="status">Actuellement en 5ème année</p>
                  <p className="description">
                    Formation d'ingénieurs polyvalents en informatique (systèmes de décision, 
                    développement logiciels, technologies informatiques, ...).
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
                  <h4>Classes préparatoires aux grandes écoles (CPGE)</h4>
                  <p className="description">
                    Programme intensif de préparation aux concours d'entrée dans les 
                    écoles d'ingénieurs françaises.
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
            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-code-curly'></i>
                <h3>Langages de programmation</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">Java21</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">OCaml</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Bash</span>
                <span className="skill-tag">Assembleur (x86)</span>
                <span className="skill-tag">Rust</span>
                <span className="skill-tag">C#</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-globe'></i>
                <h3>Développement web</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">Angular</span>
                <span className="skill-tag">Vue.js</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">Ruby</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-data'></i>
                <h3>Data Science & IA</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Microsoft Azure</span>
                <span className="skill-tag">Python (Pandas, Matplotlib, Seaborn)</span>
                <span className="skill-tag">R (ggplot2, dplyr, R Markdown)</span>
                <span className="skill-tag">PowerBI</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-cylinder'></i>
                <h3>Bases de données</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">NoSQL</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-brain'></i>
                <h3>Machine Learning & Deep Learning</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">MediaPipe</span>
                <span className="skill-tag">Roboflow</span>
                <span className="skill-tag">Ultralytics YOLOv8</span>
                <span className="skill-tag">Modélisation</span>
                <span className="skill-tag">Visualisation</span>
                <span className="skill-tag">Reporting automatisé</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-library'></i>
                <h3>Frameworks & Bibliothèques</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Maven</span>
                <span className="skill-tag">Pytest</span>
                <span className="skill-tag">Unittest</span>
                <span className="skill-tag">JUnit</span>
                <span className="skill-tag">Rustworkx</span>
                <span className="skill-tag">Networkx</span>
                <span className="skill-tag">ggplot2</span>
                <span className="skill-tag">tidyverse</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">OpenMP</span>
                <span className="skill-tag">ROS</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-server'></i>
                <h3>Conteneurisation & DevOps</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">GitHub Actions (CI/CD)</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-cloud'></i>
                <h3>Déploiement & Hébergement web</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Render</span>
                <span className="skill-tag">NGINX</span>
                <span className="skill-tag">VPS Linux</span>
                <span className="skill-tag">Configuration de domaine</span>
                <span className="skill-tag">Sécurisation HTTPS</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-terminal'></i>
                <h3>Systèmes & Optimisation</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Unix/Linux</span>
                <span className="skill-tag">Scripts Bash</span>
                <span className="skill-tag">Gestion des processus</span>
                <span className="skill-tag">GCC</span>
                <span className="skill-tag">Clang</span>
                <span className="skill-tag">ICX</span>
                <span className="skill-tag">Makefile</span>
                <span className="skill-tag">MAQAO</span>
                <span className="skill-tag">Vintel</span>
                <span className="skill-tag">Valgrind</span>
                <span className="skill-tag">perf</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-header">
                <i className='bx bx-cog'></i>
                <h3>Gestion de projet</h3>
              </div>
              <div className="skills-list">
                <span className="skill-tag">Méthodes agiles (Scrum, Kanban)</span>
                <span className="skill-tag">Cycle en V</span>
                <span className="skill-tag">GitHub Projects</span>
                <span className="skill-tag">Documentation technique</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage