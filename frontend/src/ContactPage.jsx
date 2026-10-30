import './style.css'

const CONTACTS = [
  {
    icon: '📧',
    title: 'Email',
    label: 'njuvenal62@gmail.com',
    href: 'mailto:njuvenal62@gmail.com'
  },
  {
    icon: '📱',
    title: 'Téléphone',
    label: '+33 6 20 01 75 67',
    href: 'tel:+33620017567'
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    label: 'linkedin.com/in/juvenal-mn',
    href: 'https://linkedin.com/in/juvenal-mn'
  },
  {
    icon: '🐙',
    title: 'GitHub',
    label: 'github.com/MNJuvenal',
    href: 'https://github.com/MNJuvenal'
  },
  {
    icon: '🧩',
    title: 'LeetCode',
    label: 'leetcode.com/u/lajuve01',
    href: 'https://leetcode.com/u/lajuve01/'
  },
  {
    icon: '🧠',
    title: 'Deep-ML',
    label: 'Mon profil Deep-ML',
    href: 'https://www.deep-ml.com/profile/JrKuyw4UG7SbUZeJiSxoiJjRleg2'
  }
];

function ContactPage() {
  return (
    <section className="contact">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-moi 📧</h1>
        <p className="contact-description">
          Je recherche un <strong>CDI ou CDD à partir de juin 2027</strong> en AI/ML Engineering ou Software
          Engineering (full-stack, agents IA, intégration, automatisation). France entière, sur site, en hybride
          ou en télétravail. Une offre, une question sur un projet ? Écrivez-moi !
        </p>

        <div className="contact-cards">
          {CONTACTS.map((contact) => (
            <div key={contact.title} className="contact-card">
              <div className="contact-icon">{contact.icon}</div>
              <h3>{contact.title}</h3>
              <a
                href={contact.href}
                className="contact-link"
                {...(contact.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {contact.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
