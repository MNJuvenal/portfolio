require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Middleware
app.use(cors({
  origin: 'https://juvenal.onrender.com' // ou l'URL exacte de votre frontend
}));
app.use(bodyParser.json());

// Simuler une base de données en mémoire
let comments = [];

// Route pour récupérer les commentaires d'un projet
app.get('/comments/:projectId', (req, res) => {
  const { projectId } = req.params;
  const projectComments = comments.filter((comment) => comment.projectId === projectId);
  res.json(projectComments);
});

// Route pour ajouter un commentaire
app.post('/comments', (req, res) => {
  const { projectId, text, author } = req.body;

  if (!projectId || !text || !author) {
    return res.status(400).json({ error: 'Données manquantes (projectId, text, author requis)' });
  }

  const newComment = { id: Date.now(), projectId, text, author, replies: [] };
  comments.push(newComment);

  console.log('Nouveau commentaire ajouté :', newComment);
  res.status(201).json(newComment);
});

// Route pour répondre à un commentaire
app.post('/comments/:id/reply', (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Données manquantes (text et author requis)' });
  }

  const comment = comments.find((comment) => comment.id === parseInt(id));
  if (comment) {
    const reply = { id: Date.now(), text, author };
    comment.replies.push(reply);
    res.status(201).json(reply);
  } else {
    res.status(404).json({ error: 'Commentaire non trouvé' });
  }
});

// Route pour supprimer un commentaire
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;

  const commentIndex = comments.findIndex((comment) => comment.id === parseInt(id));
  if (commentIndex !== -1) {
    const deletedComment = comments.splice(commentIndex, 1);
    console.log('Commentaire supprimé :', deletedComment);
    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } else {
    res.status(404).json({ error: 'Commentaire non trouvé' });
  }
});

// Route par défaut
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de votre application il tourne actuellement !) !');
});

// Exporter l'application pour les tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
