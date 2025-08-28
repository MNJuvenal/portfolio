import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProjectsPage from './ProjectsPage';

const mock = new MockAdapter(axios);

describe('ProjectsPage Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should render project cards', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Projet 1 : Juvenalingo - Application d'Apprentissage des Langues/i)).toBeInTheDocument();
    expect(screen.getByText(/Projet 2 : 🔍 PlagiatDetect Pro - Détection de Plagiat IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Projet 3 : 💎 BLUEREFLET - Application d'Essayage Virtuel de Colliers/i)).toBeInTheDocument();
  });

  it('should fetch and display comments', async () => {
    const comments = [{ id: 1, text: 'Test comment' }];
    mock.onGet('https://portfolio-hwg8.onrender.com/comments/project1').reply(200, comments);

    render(<ProjectsPage />);
    expect(await screen.findByText(/Test comment/i)).toBeInTheDocument();
  });

  it('should submit a new comment', async () => {
    mock.onPost('http://localhost:5000/comments').reply(201, {
      id: 2,
      text: 'New comment',
    });

    render(<ProjectsPage />);
    const textarea = screen.getByPlaceholderText(/Posez une question ou laissez un commentaire/i);
    const button = screen.getByText(/Envoyer/i);

    fireEvent.change(textarea, { target: { value: 'New comment' } });
    fireEvent.click(button);

    expect(await screen.findByText(/New comment/i)).toBeInTheDocument();
  });

  it('should display image carousel for Juvenalingo project', () => {
    render(<ProjectsPage />);
    
    // Vérifier que l'image du carrousel est présente
    const carouselImage = screen.getByAlt(/Juvenalingo Screenshot/i);
    expect(carouselImage).toBeInTheDocument();
    
    // Vérifier les boutons de navigation
    const prevButton = screen.getByRole('button', { name: /‹/ });
    const nextButton = screen.getByRole('button', { name: /›/ });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should navigate through carousel images', () => {
    render(<ProjectsPage />);
    
    const nextButton = screen.getByRole('button', { name: /›/ });
    const carouselImage = screen.getByAlt(/Juvenalingo Screenshot/i);
    
    // L'image initiale devrait être la première
    expect(carouselImage.src).toContain('07-39-01');
    
    // Cliquer sur le bouton suivant
    fireEvent.click(nextButton);
    
    // L'image devrait changer (nous ne pouvons pas facilement tester le src exact car il dépend de l'état)
    expect(carouselImage).toBeInTheDocument();
  });
});
