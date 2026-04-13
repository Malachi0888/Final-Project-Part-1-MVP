const express = require('express');
const router = express.Router();
const { Assignment, Course } = require('../database/models');

router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll({ include: Course });
    res.json(assignments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, { include: Course });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
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
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await assignment.update(req.body);
    res.json(assignment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    await assignment.destroy();
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
