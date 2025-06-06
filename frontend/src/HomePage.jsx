// filepath: /home/juve/Documents/update portfolio/portfolio/frontend/src/HomePage.jsx
import './style.css';
import profileImage from "./profile1.jpeg";

function HomePage() {
  return (
    <section className="home" id="home" style={{ backgroundColor: 'black' }}>
      <div className="home-content">
        <div className="typewriter">
          <h1 style={{ color: 'white' }}>Bonjour, je suis <span>Juvenal</span></h1>
        </div>
        <h3 style={{ color: 'white' }}>Je suis un développeur passionné</h3>
        <p>
          Passionné par le développement web, la science des données et l'IA. Actuellement étudiant en 4ème année à l'ISTY, UVSQ Paris-Saclay.
        </p>
        <div className="social-icons">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin'></i></a>
          <a href="https://github.com/MNJuvenal" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram-alt'></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className='bx bxl-twitter'></i></a>
        </div>
      </div>
      <div className="home-img">
        <img src={profileImage} alt="Juvenal" />
      </div>
    </section>
  );
}

export default HomePage;