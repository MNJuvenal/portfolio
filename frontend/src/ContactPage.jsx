import './style.css'

function ContactPage() {
  return (
    <section className="contact">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-moi 📧</h1>
        <p className="contact-description">
          Vous avez un projet en tête une proposition de stage ? Une question à poser ? N'hésitez pas à me contacter !
        </p>
        
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <a href="mailto:njuvenal62@gmail.com" className="contact-link">
              njuvenal62@gmail.com
            </a>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h3>Téléphone</h3>
            <a href="tel:+33612345678" className="contact-link">
              +33 6 71 50 43 06
            </a>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              Mon profil LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;