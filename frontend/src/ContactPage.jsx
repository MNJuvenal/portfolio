import './style.css'

function ContactPage() {
  return (
    <section>
      <h1>Contactez-moi</h1>
      <p>Vous pouvez me contacter via les informations ci-dessous :</p>
      <ul>
        <li>Email : <a href="mailto:juvenal.malecou@example.com">juvenal.malecou@example.com</a></li>
        <li>Téléphone : +33 6 12 34 56 78</li>
        <li>LinkedIn : <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Mon profil LinkedIn</a></li>
      </ul>
    </section>
  );
}

export default ContactPage;