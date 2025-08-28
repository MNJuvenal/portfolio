import { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [visitorStats, setVisitorStats] = useState({
    totalVisits: 0,
    todayVisits: 0
  });

  useEffect(() => {
    // Enregistrer la visite au chargement
    const recordVisit = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://portfolio-hwg8.onrender.com'}/visit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (error) {
        console.error('Erreur enregistrement visite:', error);
      }
    };

    // Récupérer les statistiques
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://portfolio-hwg8.onrender.com'}/stats`);
        if (response.ok) {
          const data = await response.json();
          setVisitorStats(data);
        }
      } catch (error) {
        console.error('Erreur récupération stats:', error);
      }
    };

    // Enregistrer la visite puis récupérer les stats
    recordVisit().then(fetchStats);
  }, []);

  return (
    <div className="visitor-counter-footer">
      <span className="visitor-text">
        👥 {visitorStats.totalVisits.toLocaleString()} visiteurs
        {visitorStats.todayVisits > 0 && (
          <> • 📅 {visitorStats.todayVisits} aujourd'hui</>
        )}
      </span>
    </div>
  );
};

export default VisitorCounter;
