import './style.css';

function ContactPage() {
  return (
    <section className="contact-section">
      <h1>Contactez-moi</h1>
      <p>Vous pouvez me contacter via les informations ci-dessous :</p>
      <ul>
        <li>Email : <a href="mailto:juvenal.malecou-nguimbi@ens.uvsq.fr">juvenal.malecou-nguimbi@ens.uvsq.fr</a></li>
        <li>Téléphone : <a href="tel:+33771504306">+33 (0)7 71 50 43 06</a></li>
        <li>LinkedIn : <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Consultez mon profil LinkedIn</a></li>
      </ul>
    </section>
  );
}

export default ContactPage;

