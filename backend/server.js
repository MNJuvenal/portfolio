require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simuler une base de données en mémoire
let comments = [];

// Configurez Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilisez votre service email (par exemple, Gmail)
  auth: {
    user: process.env.EMAIL, // Charge l'email depuis les variables d'environnement
    pass: process.env.EMAIL_PASSWORD, // Charge le mot de passe depuis les variables d'environnement
  },
});

// Route pour récupérer les commentaires d'un projet
app.get('/comments/:projectId', (req, res) => {
  const { projectId } = req.params;
  const projectComments = comments.filter((comment) => comment.projectId === projectId);
  res.json(projectComments);
});

// Route pour ajouter un commentaire
app.post('/comments', (req, res) => {
  const { projectId, text, email } = req.body;
  const newComment = { id: Date.now(), projectId, text, email, replies: [] };
  comments.push(newComment);

  // Envoyer un email de notification
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Votre email pour recevoir les notifications
    subject: 'Nouveau commentaire reçu',
    text: `Un nouveau commentaire a été ajouté au projet ${projectId} :\n\n${text}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    } else {
      console.log('Email envoyé :', info.response);
    }
  });

  res.status(201).json(newComment);
});

// Route pour répondre à un commentaire
app.post('/comments/:id/reply', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const comment = comments.find((comment) => comment.id === parseInt(id));
  if (comment) {
    const reply = { id: Date.now(), text };
    comment.replies.push(reply);
    res.status(201).json(reply);
  } else {
    res.status(404).json({ error: 'Commentaire non trouvé' });
  }
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de votre application il tourne actuelement !) !');
});

// Exporter l'application pour les tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;