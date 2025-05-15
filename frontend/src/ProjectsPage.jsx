import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000'; // URL de votre serveur backend

function ProjectsPage() {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState({}); // Stocke les réponses par commentaire

  // Fonction pour récupérer les commentaires d'un projet
  const fetchComments = async (projectId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/comments/${projectId}`);
      setComments((prev) => ({ ...prev, [projectId]: response.data }));
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires', error);
    }
  };

  const handleCommentSubmit = async (e, projectId) => {
    e.preventDefault();
  
    // Validation des données
    if (!newComment.trim()) {
      alert("Le commentaire ne peut pas être vide !");
      return;
    }
  
    try {
      const response = await axios.post(`${BACKEND_URL}/comments`, {
        projectId,
        text: newComment,
        email: userEmail, // Utilisez un email dynamique
      });
  
      setComments((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), response.data],
      }));
  
      setNewComment('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      alert("Une erreur s'est produite lors de l'envoi du commentaire.");
    }
  };

  // Fonction pour soumettre une réponse à un commentaire
  const handleReplySubmit = async (e, commentId, projectId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/comments/${commentId}/reply`, {
        text: reply[commentId],
      });
      setComments((prev) => {
        const updatedComments = prev[projectId].map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        );
        return { ...prev, [projectId]: updatedComments };
      });
      setReply((prev) => ({ ...prev, [commentId]: '' }));
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse', error);
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
            <textarea
              placeholder="Posez une question ou laissez un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {comments['project1']?.map((comment) => (
              <li key={comment.id}>
                {comment.text}
                <ul>
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>{reply.text}</li>
                  ))}
                </ul>
                <form onSubmit={(e) => handleReplySubmit(e, comment.id, 'project1')}>
                  <textarea
                    placeholder="Répondre..."
                    value={reply[comment.id] || ''}
                    onChange={(e) =>
                      setReply((prev) => ({ ...prev, [comment.id]: e.target.value }))
                    }
                    required
                  ></textarea>
                  <button type="submit">Répondre</button>
                </form>
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
            <textarea
              placeholder="Posez une question ou laissez un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {comments['project2']?.map((comment) => (
              <li key={comment.id}>
                {comment.text}
                <ul>
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>{reply.text}</li>
                  ))}
                </ul>
                <form onSubmit={(e) => handleReplySubmit(e, comment.id, 'project2')}>
                  <textarea
                    placeholder="Répondre..."
                    value={reply[comment.id] || ''}
                    onChange={(e) =>
                      setReply((prev) => ({ ...prev, [comment.id]: e.target.value }))
                    }
                    required
                  ></textarea>
                  <button type="submit">Répondre</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;