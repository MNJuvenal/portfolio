const request = require('supertest');
const express = require('express');
const app = require('./server'); // Assurez-vous que votre serveur est exporté dans server.js

describe('Backend API Tests', () => {
  it('GET /comments/:projectId - should return comments for a project', async () => {
    const response = await request(app).get('/comments/project1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /comments - should add a new comment', async () => {
    const newComment = {
      projectId: 'project1',
      text: 'This is a test comment',
      email: 'test@example.com',
    };

    const response = await request(app).post('/comments').send(newComment);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('text', newComment.text);
  });

  it('POST /comments/:id/reply - should add a reply to a comment', async () => {
    const commentId = 1; // Remplacez par un ID valide si nécessaire
    const reply = { text: 'This is a test reply' };

    const response = await request(app).post(`/comments/${commentId}/reply`).send(reply);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('text', reply.text);
  });
});