import { useState, useEffect } from 'react';

// Compteur persistant hébergé par Abacus (API publique, sans compte) :
// indépendant du backend Render, il ne se remet pas à zéro quand le serveur redémarre.
const COUNTER_URL = 'https://abacus.jasoncameron.dev';
const COUNTER_PATH = 'mnjuvenal-portfolio/visits';
const SESSION_KEY = 'portfolio-visit-recorded';

// Une visite n'est comptée qu'une fois par session de navigation :
// les rechargements et changements de page ne gonflent pas le compteur.
const alreadyRecorded = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

const markRecorded = () => {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // stockage indisponible (navigation privée) : on ignore
  }
};

const VisitorCounter = () => {
  const [totalVisits, setTotalVisits] = useState(null);

  useEffect(() => {
    // En mode StrictMode, l'effet est lancé deux fois en dev : on marque la visite avant la requête
    const shouldRecord = !alreadyRecorded();
    if (shouldRecord) markRecorded();

    fetch(`${COUNTER_URL}/${shouldRecord ? 'hit' : 'get'}/${COUNTER_PATH}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data) => setTotalVisits(data.value))
      .catch((error) => console.error('Erreur compteur de visites:', error));
  }, []);

  // Rien n'est affiché si le service ne répond pas : pas de "0 visites"
  if (totalVisits === null) return null;

  return (
    <div className="visitor-counter-footer">
      <span className="visitor-text">
        👥 {totalVisits.toLocaleString('fr-FR')} visites
      </span>
    </div>
  );
};

export default VisitorCounter;
