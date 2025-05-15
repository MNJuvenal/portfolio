import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://portfolio-hwg8.onrender.com'; // URL de votre backend sur Render
function ProjectsPage() {
  const [comments, setComments] = useState({}); // Stocke les commentaires par projet
  const [newComments, setNewComments] = useState({}); // Stocke les commentaires en cours de saisie par projet
  const [authors, setAuthors] = useState({}); // Stocke les auteurs par projet

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

    try {
      const response = await axios.post(`${BACKEND_URL}/comments`, {
        projectId,
        text: newComments[projectId],
        author: authors[projectId],
      });

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
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = async (commentId, projectId) => {
    try {
      await axios.delete(`${BACKEND_URL}/comments/${commentId}`);
      setComments((prev) => ({
        ...prev,
        [projectId]: prev[projectId].filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  // Charger les commentaires pour chaque projet au chargement de la page
  useEffect(() => {
    fetchComments('project1');
    fetchComments('project2');
  }, []);

  return (
    <section className="projects">
      <h1 className="text-4xl font-bold text-center my-12">Mes Projets</h1>

      {/* Projet 1 */}
      <div className="project-card">
        <h3>Projet 1 : Automate à Pile</h3>
        <p>
          Ce projet implémente un automate à pile en C. Il permet de reconnaître des mots de la forme b^n.a^n.
          <br />
          <strong>Technologies :</strong> C, Makefile
        </p>
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
                <button onClick={() => handleDeleteComment(comment.id, 'project1')}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projet 2 */}
      <div className="project-card">
        <h3>Projet 2 : Portfolio React</h3>
        <p>
          Un portfolio moderne développé avec React et Tailwind CSS. Il est entièrement responsive et optimisé pour le SEO.
          <br />
          <strong>Technologies :</strong> React, Tailwind CSS
        </p>
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
                <button onClick={() => handleDeleteComment(comment.id, 'project2')}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;