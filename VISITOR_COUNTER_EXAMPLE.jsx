// Exemple de composant compteur simple
import { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Incrémenter le compteur à chaque nouvelle visite
    const updateVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setVisitors(data.totalVisitors);
      } catch (error) {
        console.error('Erreur compteur visiteurs:', error);
      }
    };

    updateVisitorCount();
  }, []);

  return (
    <div className="visitor-counter">
      <span>👥 {visitors.toLocaleString()} visiteurs</span>
    </div>
  );
};

export default VisitorCounter;
