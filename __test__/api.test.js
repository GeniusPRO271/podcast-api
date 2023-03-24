const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { Serie } = require('../models/series_models');
const PORT = process.env.PORT;
let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }); // assign the server variable when starting the server
  server = app.listen(PORT, () =>
    console.log(`Test started on port ${(PORT, process.env.MONGOURI)}`)
  );
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // delete the test database
  await mongoose.connection.close(); // close the database connection
  await server.close(); // close the server
});

describe('Show API tests', () => {
  let testShowId;

  it('/POST should create a new show', async () => {
    const response = await request(app)
      .post('/shows')
      .send({
        title: 'Test Show',
        showDate: new Date('2023-04-01'),
        image: 'https://example.com/image.jpg',
        location: 'Test Theater',
        buyticketlink: 'https://example.com/buytickets',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Show');
    testShowId = response.body._id;
  });

  it('/GET should return all shows', async () => {
    const response = await request(app).get('/shows');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Test Show');
  });

  it('/GET should return a show by ID', async () => {
    const response = await request(app).get(`/shows/${testShowId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Test Show');
  });

  it('/PUT should update a show by ID', async () => {
    const response = await request(app)
      .put(`/shows/${testShowId}`)
      .send({ title: 'Updated Show' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Show');
  });

  it('/DELETE should delete a show by ID', async () => {
    const response = await request(app).delete(`/shows/${testShowId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Show');
  });

  it('should return a 404 error for a non-existent show', async () => {
    const response = await request(app).get('/shows/123456789012');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Show not found');
  });
});

describe('Series API tests', () => {
  let testSerieId;

  it('/POST should create a new serie', async () => {
    const response = await request(app)
      .post('/series')
      .send({
        title: 'Test Serie',
        serieDays: ['Monday', 'Wednesday'],
        serieStart: new Date('2023-04-01'),
        serieEnd: new Date('2023-05-01'),
        imagesMain: 'https://example.com/image.jpg',
        images: [
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg',
        ],
        description: 'Test description',
        members: ['John Doe', 'Jane Doe'],
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        brochure: 'https://example.com/brochure.pdf',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Serie');
    testSerieId = response.body._id;
  });

  it('/GET should return all series', async () => {
    const response = await request(app).get('/series');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Test Serie');
  });

  it('/GET should return a serie by ID', async () => {
    const response = await request(app).get(`/series/${testSerieId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Test Serie');
  });

  it('/PUT should update a serie by ID', async () => {
    const response = await request(app)
      .put(`/series/${testSerieId}`)
      .send({ title: 'Updated Serie' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Serie');
  });

  it('/DELETE should delete a serie by ID', async () => {
    const response = await request(app).delete(`/series/${testSerieId}`);
    expect(response.statusCode).toBe(200);
    const deletedSerie = await Serie.findById(testSerieId);
    expect(deletedSerie).toBeNull();
  });
});
