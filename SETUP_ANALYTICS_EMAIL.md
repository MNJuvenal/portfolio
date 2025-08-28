# 📊 Configuration Google Analytics et Email

## 🔧 Étapes pour finaliser la configuration :

### 1. **Google Analytics Setup**
1. Va sur https://analytics.google.com/
2. Créer un compte gratuit si pas encore fait
3. Créer une propriété pour ton site : `https://portfolio-9e70.onrender.com`
4. Récupérer ton **Measurement ID** (format: G-XXXXXXXXXX)
5. Dans le fichier `frontend/src/analytics.js`, remplacer `'G-XXXXXXXXXX'` par ton vrai ID

### 2. **Configuration Email (Gmail)**
1. Aller dans ton compte Gmail → Paramètres → Sécurité
2. Activer "Validation en 2 étapes" si pas encore fait
3. Créer un "Mot de passe d'application" :
   - Aller dans Sécurité → Mots de passe d'application
   - Choisir "Autre" et taper "Portfolio"
   - Noter le mot de passe généré (16 caractères)

### 3. **Variables d'environnement**
Dans Render.com, ajouter ces variables d'environnement pour le backend :

```bash
EMAIL_USER=ton-email@gmail.com
EMAIL_PASS=ton-mot-de-passe-app-16-caracteres
ADMIN_EMAIL=juvenal.moussavou@gmail.com
```

## 🎯 Ce que tu recevras par email :

### 📧 **Notification de visite :**
- Date et heure de la visite
- Page visitée
- Navigateur utilisé
- Site référent (Google, direct, etc.)

### 💬 **Notification de commentaire :**
- Nom de la personne
- Projet commenté
- Contenu du commentaire
- Date et heure
- Lien vers la page

## 📊 **Google Analytics te donnera :**
- Nombre de visiteurs uniques
- Pages les plus visitées
- Pays des visiteurs
- Appareils utilisés (mobile/desktop)
- Sources de trafic
- Temps passé sur le site

## 🚀 **Prochaines étapes :**
1. Obtenir ton Measurement ID Google Analytics
2. Configurer le mot de passe d'application Gmail
3. Mettre à jour les variables d'environnement sur Render
4. Redéployer le backend avec nodemailer
5. Tester le système complet
