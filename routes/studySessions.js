const express = require('express');
const router = express.Router();
const { StudySession, Course } = require('../database/models');

router.get('/', async (req, res, next) => {
  try {
    const sessions = await StudySession.findAll({ include: Course });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const session = await StudySession.findByPk(req.params.id, { include: Course });
    if (!session) {
      return res.status(404).json({ error: 'Study session not found' });
    }
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.body.CourseId);
    if (!course) {
      return res.status(400).json({ error: 'Valid CourseId is required' });
    }
    const session = await StudySession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const session = await StudySession.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Study session not found' });
    }
    await session.update(req.body);
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const session = await StudySession.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Study session not found' });
    }
    await session.destroy();
    res.json({ message: 'Study session deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
