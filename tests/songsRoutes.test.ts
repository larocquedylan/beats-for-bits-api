import request from 'supertest';
import express, { Express } from 'express';
// import songRoutes from '../routes/songRoutes';
// import { song } from '../interfaces/songs';

const app: Express = express();
app.use(express.json());
app.use('/songs', songRoutes);

describe('Song routes', () => {
  it('GET /songs - should return all songs', async () => {
    const res = await request(app).get('/songs');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach((song: any) => {
      expect(song).toHaveProperty('id');
      expect(song).toHaveProperty('title');
      expect(song).toHaveProperty('song');
      expect(song).toHaveProperty('image');
    });
  });

  it('GET /songs/:id - should return a specific song', async () => {
    const validId = '1'; // Replace this with a valid song ID from your data
    const res = await request(app).get(`/songs/${validId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', validId);

    const invalidId = 'nonexistent-id';
    const res2 = await request(app).get(`/songs/${invalidId}`);

    expect(res2.status).toBe(404);
  });

  it('GET /songs/download/:songId - should download a song', async () => {
    const validId = '1'; // Replace this with a valid song ID from your data
    const res = await request(app).get(`/songs/download/${validId}`);

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('audio/wav');

    const invalidId = 'nonexistent-id';
    const res2 = await request(app).get(`/songs/download/${invalidId}`);

    expect(res2.status).toBe(404);
  });

  it('GET /songs/stream/:songId - should stream a song', async () => {
    const validId = '1'; // Replace this with a valid song ID from your data
    const res = await request(app)
      .get(`/songs/stream/${validId}`)
      .set('Range', 'bytes=0-');

    expect(res.status).toBe(206);
    expect(res.header['content-type']).toBe('audio/wav');
    expect(res.header).toHaveProperty('content-range');
    expect(res.header).toHaveProperty('accept-ranges');
    expect(res.header).toHaveProperty('content-length');

    const invalidId = 'nonexistent-id';
    const res2 = await request(app).get(`/songs/stream/${invalidId}`);

    expect(res2.status).toBe(404);
  });
});
