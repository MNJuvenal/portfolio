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
    expect(screen.getByText(/Projet 1 : Automate à Pile/i)).toBeInTheDocument();
    expect(screen.getByText(/Projet 2 : Portfolio React/i)).toBeInTheDocument();
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
});
