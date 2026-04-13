const request = require('supertest');
const app = require('../app');
const { sequelize, Course, Assignment, StudySession } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Assignment.destroy({ where: {} });
  await StudySession.destroy({ where: {} });
  await Course.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

test('GET / returns API status message', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Study Planner API is running');
});

test('POST /courses creates a course', async () => {
  const response = await request(app)
    .post('/courses')
    .send({ title: 'Algorithms', instructor: 'Dr. Adams', credits: 3 });

  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe('Algorithms');
});

test('POST /assignments returns 400 when CourseId is invalid', async () => {
  const response = await request(app)
    .post('/assignments')
    .send({ title: 'Quiz 1', dueDate: '2026-04-20', completed: false, CourseId: 999 });

  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe('Valid CourseId is required');
});

test('POST /study-sessions creates a study session', async () => {
  const course = await Course.create({ title: 'Databases', instructor: 'Dr. Kim', credits: 4 });

  const response = await request(app)
    .post('/study-sessions')
    .send({ topic: 'Normalization', sessionDate: '2026-04-15', durationMinutes: 45, CourseId: course.id });

  expect(response.statusCode).toBe(201);
  expect(response.body.topic).toBe('Normalization');
});
