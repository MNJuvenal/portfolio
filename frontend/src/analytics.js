import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Configuration Google Analytics
const GA_MEASUREMENT_ID = 'G-TZQWTEHFS6';

// Hook pour suivre les changements de page
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics est maintenant chargé directement dans index.html
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location]);
};

// Fonction pour suivre les événements personnalisés
export const trackEvent = (action, category = 'User Interaction', label = '', value = 0) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fonction pour envoyer une notification par email
export const sendEmailNotification = async (type, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://portfolio-hwg8.onrender.com'}/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    });
    
    if (!response.ok) {
      console.error('Erreur envoi notification email');
    }
  } catch (error) {
    console.error('Erreur notification email:', error);
  }
};

export default { useGoogleAnalytics, trackEvent, sendEmailNotification };
