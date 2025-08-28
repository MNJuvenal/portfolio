require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de l'envoi d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou votre service email préféré
  auth: {
    user: process.env.EMAIL_USER || 'votre-email@gmail.com', // Votre email
    pass: process.env.EMAIL_PASS || 'votre-mot-de-passe-app' // Mot de passe d'application Gmail
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'juvenal.moussavou@gmail.com'; // Votre email pour recevoir les notifications

// Base de données en mémoire pour les statistiques
let visitorStats = {
  totalVisits: 0,
  todayVisits: 0,
  lastResetDate: new Date().toDateString(),
  visitsToday: []
};

// Middleware
app.use(cors({
  origin: true, // Temporaire: autorise toutes les origines pour les tests
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// Fonction pour réinitialiser les stats quotidiennes
const resetDailyStats = () => {
  const today = new Date().toDateString();
  if (visitorStats.lastResetDate !== today) {
    visitorStats.todayVisits = 0;
    visitorStats.visitsToday = [];
    visitorStats.lastResetDate = today;
  }
};

// Route pour récupérer les statistiques de visiteurs
app.get('/stats', (req, res) => {
  resetDailyStats();
  
  // Compter les visiteurs uniques aujourd'hui
  const uniqueVisitorsToday = new Set(visitorStats.visitsToday).size;
  
  res.json({
    totalVisits: visitorStats.totalVisits,
    todayVisits: uniqueVisitorsToday,
    onlineNow: Math.floor(Math.random() * 3) + 1 // Simulation simple
  });
});

// Route pour enregistrer une visite
app.post('/visit', (req, res) => {
  const visitorIP = req.ip || req.connection.remoteAddress || 'unknown';
  
  resetDailyStats();
  
  // Incrémenter le compteur total
  visitorStats.totalVisits++;
  
  // Ajouter à la liste d'aujourd'hui (pour les visiteurs uniques)
  visitorStats.visitsToday.push(visitorIP);
  
  console.log('📊 Nouvelle visite enregistrée. Total:', visitorStats.totalVisits);
  
  res.json({ success: true, totalVisits: visitorStats.totalVisits });
});

// Route pour supprimer un commentaire (réservé à l'admin)
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  
  // Vérifier l'authentification admin
  const adminPassword = 'Gloireadri_2023@'; // Mot de passe administrateur
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token d\'authentification requis' });
  }
  
  const token = authHeader.substring(7); // Enlever "Bearer "
  
  if (token !== adminPassword) {
    return res.status(401).json({ error: 'Token d\'authentification invalide' });
  }

  const commentIndex = comments.findIndex((comment) => comment.id === parseInt(id));
  if (commentIndex !== -1) {
    const deletedComment = comments.splice(commentIndex, 1);
    console.log('Commentaire supprimé par admin :', deletedComment);
    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } else {
    res.status(404).json({ error: 'Commentaire non trouvé' });
  }
});

// Fonction pour envoyer un email de notification
const sendNotificationEmail = async (type, data) => {
  try {
    let subject, html;
    
    if (type === 'visit') {
      subject = `🎯 Nouvelle visite sur votre portfolio !`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a90e2;">👋 Nouvelle visite sur votre portfolio !</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>📅 Date :</strong> ${new Date(data.timestamp).toLocaleString('fr-FR')}</p>
            <p><strong>🌐 Page visitée :</strong> ${data.url}</p>
            <p><strong>🔧 Navigateur :</strong> ${data.userAgent}</p>
            <p><strong>📍 Référent :</strong> ${data.referrer || 'Accès direct'}</p>
          </div>
          <p style="color: #666;">Votre portfolio attire de nouveaux visiteurs ! 🚀</p>
        </div>
      `;
    } else if (type === 'comment') {
      subject = `💬 Nouveau commentaire sur "${data.projectId}" !`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">💬 Nouveau commentaire !</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Auteur :</strong> ${data.author}</p>
            <p><strong>📝 Projet :</strong> ${data.projectId}</p>
            <p><strong>💭 Commentaire :</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #28a745; margin: 10px 0;">
              "${data.text}"
            </div>
            <p><strong>📅 Date :</strong> ${new Date(data.timestamp).toLocaleString('fr-FR')}</p>
            <p><strong>🌐 URL :</strong> ${data.url}</p>
          </div>
          <p style="color: #666;">Quelqu'un s'intéresse à vos projets ! 👏</p>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de notification envoyé pour : ${type}`);
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
  }
};

// Route pour recevoir les notifications
app.post('/notify', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log(`📧 Notification reçue - Type: ${type}`);
    
    // Envoyer l'email de notification
    await sendNotificationEmail(type, data);
    
    res.status(200).json({ message: 'Notification envoyée avec succès' });
  } catch (error) {
    console.error('Erreur notification:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la notification' });
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
