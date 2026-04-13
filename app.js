const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const courseRoutes = require('./routes/courses');
const assignmentRoutes = require('./routes/assignments');
const studySessionRoutes = require('./routes/studySessions');

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'Study Planner API is running' });
});

app.use('/courses', courseRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/study-sessions', studySessionRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
