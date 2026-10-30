import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { trackEvent, sendEmailNotification } from './analytics';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://portfolio-hwg8.onrender.com';

// Autres projets (recherche, IA, agents, software engineering)
const OTHER_PROJECTS = [
  {
    title: 'Similarité de code par graphes (LIGM)',
    category: 'Recherche · NLP & Graphes',
    description: "Mesure de similarité entre programmes Python via graphes de dépendances (PDG : CFG + DDG) et approches hybrides avec embeddings de code.",
    stack: ['Python', 'tree-sitter', 'NetworkX', 'GraphCodeBERT'],
    url: 'https://github.com/MNJuvenal/code-similarity-pdg-ged'
  },
  {
    title: 'IA-Orchestrator',
    category: 'Agents · Microservices',
    description: 'Orchestration de plusieurs agents IA en microservices, avec communication asynchrone par file de messages, REST et SSE.',
    stack: ['Spring Boot', 'Python', 'Blazor/.NET', 'RabbitMQ', 'PostgreSQL', 'Docker'],
    url: 'https://github.com/MNJuvenal/ia_orchestrator'
  },
  {
    title: 'Chatbot RAG (Qwen)',
    category: 'LLM · RAG',
    description: 'Chatbot de questions-réponses sur une base de connaissances personnalisée, avec recherche documentaire en temps réel.',
    stack: ['Python', 'LangChain', 'HuggingFace', 'ChromaDB'],
    url: 'https://github.com/MNJuvenal/chatbot-qwen'
  },
  {
    title: 'Agent T-Rex (Deep RL)',
    category: 'Reinforcement Learning',
    description: "Agent de Deep Reinforcement Learning qui maîtrise le jeu T-Rex de Chrome : >95% de survie, reward shaping, obstacles complexes.",
    stack: ['PyTorch', 'Pygame', 'Python'],
    url: 'https://github.com/MNJuvenal/T-RexWithAi'
  },
  {
    title: 'Pipeline Vision DL (CIFAR-10)',
    category: 'Computer Vision',
    description: "Classification d'images : transfer learning, augmentation de données et évaluation complète des métriques.",
    stack: ['PyTorch', 'torchvision', 'scikit-learn'],
    url: 'https://github.com/MNJuvenal/Projet_Vision_CIFAR10'
  },
  {
    title: 'Prédiction de Churn',
    category: 'Machine Learning · MLOps',
    description: 'Prédiction du départ client avec feature engineering avancé et suivi des expériences dans MLflow.',
    stack: ['XGBoost', 'Pandas', 'scikit-learn', 'MLflow'],
    url: 'https://github.com/MNJuvenal/Pr-diction-de-Churn-avec-XGBoost'
  },
  {
    title: 'Gestion de Bibliothèque (Java)',
    category: 'Software Engineering',
    description: 'Application en architecture N-tiers (Modèle-Service-Repository) appliquant les principes POO et SOLID.',
    stack: ['Java 21', 'POO/SOLID', 'CLI', 'Git'],
    url: 'https://github.com/MNJuvenal/Library-management_V2'
  },
  {
    title: 'Profilage & optimisation de code',
    category: 'HPC · Performance',
    description: "Profilage puis optimisation d'un code C de calcul intensif avec les outils d'analyse de performance.",
    stack: ['C', 'MAQAO', 'perf', 'GCC/Clang'],
    url: 'https://github.com/MNJuvenal/Profilage-optimisation-de-code'
  },
  {
    title: 'Solutions LeetCode & Deep-ML',
    category: 'Algorithmique · ML from scratch',
    description: "Mes solutions commentées d'algorithmique (LeetCode) et d'implémentations ML from scratch (Deep-ML).",
    stack: ['Python', 'Java', 'NumPy'],
    url: 'https://github.com/MNJuvenal/deep-ml'
  }
];


function ProjectsPage() {
  const [comments, setComments] = useState({}); // Stocke les commentaires par projet
  const [newComments, setNewComments] = useState({}); // Stocke les commentaires en cours de saisie par projet
  const [authors, setAuthors] = useState({}); // Stocke les auteurs par projet
  const [currentImageIndex, setCurrentImageIndex] = useState({}); // Index de l'image actuelle pour chaque projet

  // Images du projet Juvenalingo
  const juvenalingoImages = [
    '/images/juvenalingo/Screenshot from 2025-08-28 07-39-01.png',
    '/images/juvenalingo/Screenshot from 2025-08-28 07-39-30.png',
    '/images/juvenalingo/Screenshot from 2025-08-28 07-39-43.png',
    '/images/juvenalingo/Screenshot from 2025-08-28 07-39-49.png',
    '/images/juvenalingo/Screenshot from 2025-08-28 07-39-55.png'
  ];

  // Images du projet PlagiatDetect Pro
  const plagiatappImages = [
    '/images/plagiatapp/Screenshot from 2025-08-28 08-15-55.png',
    '/images/plagiatapp/Screenshot from 2025-08-28 08-16-35.png',
    '/images/plagiatapp/Screenshot from 2025-08-28 08-42-28.png'
  ];

  // Images du projet BLUEREFLET
  const bluerefletImages = [
    '/images/bluereflet/Screenshot from 2025-08-28 08-53-33.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-53-47.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-53-57.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-54-08.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-54-30.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-54-49.png',
    '/images/bluereflet/Screenshot from 2025-08-28 08-56-41.png'
  ];

  // Fonction pour changer d'image dans le carrousel
  const nextImage = (projectId, imagesArray) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % imagesArray.length,
    }));
  };

  const prevImage = (projectId, imagesArray) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + imagesArray.length) % imagesArray.length,
    }));
  };

  // Fonction pour récupérer les commentaires d'un projet
  const fetchComments = async (projectId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/comments/${projectId}`);
      setComments((prev) => ({
        ...prev,
        [projectId]: response.data, // Met à jour uniquement les commentaires du projet spécifique
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires', error);
    }
  };

  // Fonction pour soumettre un nouveau commentaire
  const handleCommentSubmit = async (e, projectId) => {
    e.preventDefault();

    // Validation des données
    if (!newComments[projectId]?.trim() || !authors[projectId]?.trim()) {
      alert("Le commentaire et l'auteur ne peuvent pas être vides !");
      return;
    }

    console.log('Tentative d\'envoi du commentaire:', {
      projectId,
      text: newComments[projectId],
      author: authors[projectId],
      backendUrl: BACKEND_URL
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/comments`, {
        projectId,
        text: newComments[projectId],
        author: authors[projectId],
      });

      console.log('Commentaire envoyé avec succès:', response.data);

      // Tracker l'événement dans Google Analytics
      trackEvent('comment_submitted', 'Projects', projectId);
      
      // Envoyer une notification email
      console.log('🚀 Tentative envoi notification email...');
      try {
        await sendEmailNotification('comment', {
          projectId,
          author: authors[projectId],
          text: newComments[projectId],
          timestamp: new Date().toISOString(),
        });
        console.log('✅ Notification email envoyée avec succès');
      } catch (emailError) {
        console.error('❌ Erreur notification email:', emailError);
      }

      // Met à jour les commentaires pour ce projet
      setComments((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), response.data],
      }));

      // Réinitialise les champs de saisie pour ce projet
      setNewComments((prev) => ({
        ...prev,
        [projectId]: '',
      }));
      setAuthors((prev) => ({
        ...prev,
        [projectId]: '',
      }));

      alert('Commentaire ajouté avec succès !');
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      console.error("Détails de l'erreur:", error.response?.data || error.message);
      
      if (error.response?.status === 400) {
        alert("Erreur : Données manquantes. Vérifiez que tous les champs sont remplis.");
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        alert("Erreur de connexion : Impossible de contacter le serveur. Vérifiez votre connexion internet.");
      } else {
        alert("Erreur lors de l'ajout du commentaire. Veuillez réessayer plus tard.");
      }
    }
  };

  // Fonction pour supprimer un commentaire (réservé à l'admin)
  const handleDeleteComment = async (commentId, projectId) => {
    // Demander un mot de passe admin
    const adminPassword = prompt("Mot de passe administrateur requis pour supprimer ce commentaire :");
    
    if (!adminPassword) {
      return; // Annulé par l'utilisateur
    }

    try {
      await axios.delete(`${BACKEND_URL}/comments/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${adminPassword}`
        }
      });
      
      setComments((prev) => ({
        ...prev,
        [projectId]: prev[projectId].filter((comment) => comment.id !== commentId),
      }));
      
      alert('Commentaire supprimé avec succès !');
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
      
      if (error.response?.status === 401) {
        alert("Erreur : Mot de passe administrateur incorrect.");
      } else if (error.response?.status === 404) {
        alert("Erreur : Commentaire non trouvé.");
      } else {
        alert("Erreur lors de la suppression du commentaire. Veuillez réessayer plus tard.");
      }
    }
  };

  // Charger les commentaires pour chaque projet au chargement de la page
  useEffect(() => {
    fetchComments('project1');
    fetchComments('project2');
    fetchComments('project3');
  }, []);

  return (
    <section className="projects">
      <h1 className="text-4xl font-bold text-center my-12">Mes Projets</h1>
      <p className="projects-intro">
        Une sélection de projets en IA, agents, full-stack et software engineering.
        Tout le code est disponible sur <a href="https://github.com/MNJuvenal" target="_blank" rel="noopener noreferrer">mon GitHub</a>.
      </p>

      {/* Projet 1 */}
      <div className="project-card">
        <h3>Projet 1 : Juvenalingo - Application d'Apprentissage des Langues 🌐</h3>
        
        {/* Carrousel d'images */}
        <div className="image-carousel">
          <div className="carousel-container">
            <button 
              className="carousel-btn prev-btn"
              onClick={() => prevImage('project1', juvenalingoImages)}
            >
              ‹
            </button>
            <img 
              src={juvenalingoImages[currentImageIndex['project1'] || 0]} 
              alt={`Juvenalingo Screenshot ${(currentImageIndex['project1'] || 0) + 1}`}
              className="carousel-image"
              onClick={() => nextImage('project1', juvenalingoImages)}
            />
            <button 
              className="carousel-btn next-btn"
              onClick={() => nextImage('project1', juvenalingoImages)}
            >
              ›
            </button>
          </div>
          <div className="image-indicators">
            {juvenalingoImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === (currentImageIndex['project1'] || 0) ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(prev => ({ ...prev, project1: index }))}
              />
            ))}
          </div>
        </div>

        <div className="project-description">
          <p>
            Application web moderne inspirée de Duolingo, intégrant une intelligence artificielle conversationnelle pour l'apprentissage interactif des langues (français, anglais, espagnol).
          </p>
          
          <div className="project-links">
            <a href="https://github.com/MNJuvenal/duolingo-beta" target="_blank" rel="noopener noreferrer" className="github-link">
              📂 Voir le code source
            </a>
            <a href="https://duolingo-frontend.onrender.com" target="_blank" rel="noopener noreferrer" className="demo-link">
              🚀 Tester l'application
            </a>
          </div>

          <div className="features">
            <h4>🚀 Fonctionnalités Clés :</h4>
            <ul>
              <li>Chat IA Multilingue : Conversation naturelle avec correction automatique</li>
              <li>Synthèse Vocale : Text-to-Speech avec Azure Cognitive Services</li>
              <li>Authentification JWT : Système de connexion sécurisé + mode invité</li>
              <li>IA Autonome : Fonctionne entièrement hors ligne</li>
              <li>Interface Responsive : Optimisée mobile et desktop</li>
            </ul>
          </div>

          <div className="technologies">
            <h4>🛠️ Technologies Utilisées :</h4>
            <div className="tech-stack">
              <div className="tech-category">
                <strong>Backend :</strong>
                <span>FastAPI (Python), SQLite, IA locale intégrée, JWT</span>
              </div>
              <div className="tech-category">
                <strong>Frontend :</strong>
                <span>React + Vite, Tailwind CSS, Axios, React Router</span>
              </div>
            </div>
          </div>

          <div className="highlights">
            <h4>🌟 Points Forts :</h4>
            <ul>
              <li>Architecture modulaire et scalable</li>
              <li>IA conversationnelle fonctionnant sans dépendances externes</li>
              <li>Support multilingue natif</li>
              <li>Mode hors ligne complet</li>
              <li>Interface utilisateur moderne et intuitive</li>
            </ul>
          </div>
        </div>
        <div className="comments-section">
          <h4>Commentaires / Questions</h4>
          <form onSubmit={(e) => handleCommentSubmit(e, 'project1')} className="comment-form">
            <input
              type="text"
              placeholder="Votre nom"
              value={authors['project1'] || ''}
              onChange={(e) =>
                setAuthors((prev) => ({
                  ...prev,
                  project1: e.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="Posez une question ou laissez un commentaire..."
              value={newComments['project1'] || ''}
              onChange={(e) =>
                setNewComments((prev) => ({
                  ...prev,
                  project1: e.target.value,
                }))
              }
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {comments['project1']?.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author} :</strong> {comment.text}
                <button 
                  onClick={() => handleDeleteComment(comment.id, 'project1')} 
                  className="delete-btn admin-only"
                  title="Suppression réservée à l'administrateur"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projet 2 : PlagiatDetect Pro */}
      <div className="project-card">
        <h3>Projet 2 : 🔍 PlagiatDetect Pro - Détection de Plagiat IA</h3>
        
        {/* Carrousel d'images */}
        <div className="image-carousel">
          <div className="carousel-container">
            <button 
              className="carousel-btn prev-btn"
              onClick={() => prevImage('project2', plagiatappImages)}
            >
              ‹
            </button>
            <img 
              src={plagiatappImages[currentImageIndex['project2'] || 0]} 
              alt={`PlagiatDetect Pro Screenshot ${(currentImageIndex['project2'] || 0) + 1}`}
              className="carousel-image"
              onClick={() => nextImage('project2', plagiatappImages)}
            />
            <button 
              className="carousel-btn next-btn"
              onClick={() => nextImage('project2', plagiatappImages)}
            >
              ›
            </button>
          </div>
          <div className="image-indicators">
            {plagiatappImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === (currentImageIndex['project2'] || 0) ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(prev => ({ ...prev, project2: index }))}
              />
            ))}
          </div>
        </div>

        <div className="project-description">
          <p>
            Plateforme avancée de détection de plagiat et reformulation de texte utilisant l'intelligence artificielle pour détecter le plagiat dans les textes et documents, avec fonctionnalités de reformulation intelligente.
          </p>
          
          <div className="project-links">
            <a href="https://github.com/MNJuvenal/plagiat-app" target="_blank" rel="noopener noreferrer" className="github-link">
              📂 Voir le code source
            </a>
          </div>

          <div className="features">
            <h4>⚡ Fonctionnalités Clés :</h4>
            <ul>
              <li>Détection de plagiat avancée avec analyse sémantique et recherche web intelligente</li>
              <li>Reformulation IA utilisant pipeline de traduction + paraphrase + retraduction</li>
              <li>Support multi-formats : PDF, DOCX, texte brut</li>
              <li>Interface moderne responsive avec glisser-déposer et animations</li>
              <li>API RESTful complète avec documentation Swagger</li>
            </ul>
          </div>

          <div className="technologies">
            <h4>🛠️ Technologies Utilisées :</h4>
            <div className="tech-stack">
              <div className="tech-category">
                <strong>Backend :</strong>
                <span>Python, FastAPI, SentenceTransformers, T5 Paraphrase Model</span>
              </div>
              <div className="tech-category">
                <strong>Frontend :</strong>
                <span>React, Vite, CSS Modules, Axios</span>
              </div>
              <div className="tech-category">
                <strong>IA/ML :</strong>
                <span>Modèles de NLP pré-entraînés, analyse sémantique</span>
              </div>
              <div className="tech-category">
                <strong>Déploiement :</strong>
                <span>Docker, Render.com, CI/CD</span>
              </div>
            </div>
          </div>

          <div className="highlights">
            <h4>🏆 Points Forts Techniques :</h4>
            <ul>
              <li>Architecture microservices avec séparation frontend/backend</li>
              <li>Intégration de modèles de Machine Learning pour le traitement du langage naturel</li>
              <li>Pipeline de reformulation intelligent préservant le sens original</li>
              <li>Sécurité robuste avec CORS, validation Pydantic et rate limiting</li>
              <li>Déploiement automatisé en production avec monitoring</li>
            </ul>
          </div>

          <div className="performance-stats">
            <h4>📊 Performance :</h4>
            <ul>
              <li>Temps de réponse {'<'} 2s pour textes courts</li>
              <li>Précision de détection ~85%</li>
              <li>Réduction du score de similarité de 60-80% après reformulation</li>
              <li>Support de fichiers jusqu'à 10MB</li>
            </ul>
          </div>
        </div>

        <div className="comments-section">
          <h4>Commentaires / Questions</h4>
          <form onSubmit={(e) => handleCommentSubmit(e, 'project2')} className="comment-form">
            <input
              type="text"
              placeholder="Votre nom"
              value={authors['project2'] || ''}
              onChange={(e) =>
                setAuthors((prev) => ({
                  ...prev,
                  project2: e.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="Posez une question ou laissez un commentaire..."
              value={newComments['project2'] || ''}
              onChange={(e) =>
                setNewComments((prev) => ({
                  ...prev,
                  project2: e.target.value,
                }))
              }
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {comments['project2']?.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author} :</strong> {comment.text}
                <button 
                  onClick={() => handleDeleteComment(comment.id, 'project2')} 
                  className="delete-btn admin-only"
                  title="Suppression réservée à l'administrateur"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projet 3 : BLUEREFLET */}
      <div className="project-card">
        <h3>Projet 3 : 💎 BLUEREFLET - Application d'Essayage Virtuel de Colliers</h3>
        <div className="project-stage-info">
          <span className="stage-badge">💼 Expérience en entreprise</span>
          <span className="company-name">Entreprise : BLUEREFLET</span>
        </div>
        
        {/* Carrousel d'images */}
        <div className="image-carousel">
          <div className="carousel-container">
            <button 
              className="carousel-btn prev-btn"
              onClick={() => prevImage('project3', bluerefletImages)}
            >
              ‹
            </button>
            <img 
              src={bluerefletImages[currentImageIndex['project3'] || 0]} 
              alt={`BLUEREFLET Screenshot ${(currentImageIndex['project3'] || 0) + 1}`}
              className="carousel-image"
              onClick={() => nextImage('project3', bluerefletImages)}
            />
            <button 
              className="carousel-btn next-btn"
              onClick={() => nextImage('project3', bluerefletImages)}
            >
              ›
            </button>
          </div>
          <div className="image-indicators">
            {bluerefletImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === (currentImageIndex['project3'] || 0) ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(prev => ({ ...prev, project3: index }))}
              />
            ))}
          </div>
        </div>

        <div className="project-description">
          <p>
            Application web d'intelligence artificielle révolutionnaire permettant l'essayage virtuel de colliers en temps réel sur des photos. Utilise des algorithmes de vision par ordinateur pour un rendu ultra-réaliste.
          </p>
          
          <div className="project-links">
            <a href="https://github.com/MNJuvenal/BR-online" target="_blank" rel="noopener noreferrer" className="github-link">
              📂 Voir le code source
            </a>
            <a href="http://54.36.189.250/#demo" target="_blank" rel="noopener noreferrer" className="demo-link">
              🚀 Tester l'application
            </a>
          </div>

          <div className="features">
            <h4>🚀 Fonctionnalités Principales :</h4>
            <ul>
              <li>IA de Détection Faciale : Reconnaissance automatique des visages avec MediaPipe</li>
              <li>Positionnement Intelligent : Placement précis des colliers selon la morphologie</li>
              <li>Rendu Réaliste : Ajustement automatique de la luminosité, ombres et reflets</li>
              <li>Interface Intuitive : Upload par glisser-déposer et aperçu temps réel</li>
              <li>Gestion d'Assets : Scan automatique et refresh dynamique</li>
            </ul>
          </div>

          <div className="technologies">
            <h4>🛠️ Stack Technique :</h4>
            <div className="tech-stack">
              <div className="tech-category">
                <strong>Frontend :</strong>
                <span>React + TypeScript, Vite, TailwindCSS</span>
              </div>
              <div className="tech-category">
                <strong>Backend :</strong>
                <span>Python Flask, OpenCV, MediaPipe, YOLO</span>
              </div>
              <div className="tech-category">
                <strong>DevOps :</strong>
                <span>Nginx + PM2, Scripts de déploiement automatisés</span>
              </div>
            </div>
          </div>

          <div className="highlights">
            <h4>🌟 Points Forts Techniques :</h4>
            <ul>
              <li>Architecture modulaire full-stack</li>
              <li>Intelligence artificielle embarquée</li>
              <li>Scripts d'automatisation complets</li>
              <li>Documentation technique exhaustive</li>
              <li>Déploiement production prêt</li>
            </ul>
          </div>

          <div className="performance-stats">
            <h4>🎯 Performances & Metrics :</h4>
            <ul>
              <li>Temps de traitement : 2-5 secondes par image</li>
              <li>Précision de détection : {'>'} 85% (visage frontal)</li>
              <li>Formats supportés : JPG, PNG, WEBP (jusqu'à 20MB)</li>
              <li>Architecture scalable avec API REST complète</li>
            </ul>
          </div>
        </div>

        <div className="comments-section">
          <h4>Commentaires / Questions</h4>
          <form onSubmit={(e) => handleCommentSubmit(e, 'project3')} className="comment-form">
            <input
              type="text"
              placeholder="Votre nom"
              value={authors['project3'] || ''}
              onChange={(e) =>
                setAuthors((prev) => ({
                  ...prev,
                  project3: e.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="Posez une question ou laissez un commentaire..."
              value={newComments['project3'] || ''}
              onChange={(e) =>
                setNewComments((prev) => ({
                  ...prev,
                  project3: e.target.value,
                }))
              }
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {comments['project3']?.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author} :</strong> {comment.text}
                <button 
                  onClick={() => handleDeleteComment(comment.id, 'project3')} 
                  className="delete-btn admin-only"
                  title="Suppression réservée à l'administrateur"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Autres projets */}
      <div className="other-projects">
        <h2>Autres projets</h2>
        <div className="other-projects-grid">
          {OTHER_PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="other-project-card"
            >
              <span className="other-project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="other-project-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <span className="other-project-link"><i className='bx bxl-github'></i> Voir le code →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
