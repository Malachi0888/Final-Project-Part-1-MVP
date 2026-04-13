const { sequelize, Course, Assignment, StudySession } = require('./models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const courses = await Course.bulkCreate([
      { title: 'Backend Development', instructor: 'Professor Smith', credits: 3 },
      { title: 'Database Systems', instructor: 'Professor Johnson', credits: 4 },
      { title: 'Software Testing', instructor: 'Professor Lee', credits: 3 }
    ]);

    await Assignment.bulkCreate([
      { title: 'Build API routes', dueDate: '2026-04-20', completed: false, CourseId: courses[0].id },
      { title: 'Create ER diagram', dueDate: '2026-04-18', completed: true, CourseId: courses[1].id },
      { title: 'Write unit tests', dueDate: '2026-04-22', completed: false, CourseId: courses[2].id }
    ]);

    await StudySession.bulkCreate([
      { topic: 'Express routing', sessionDate: '2026-04-12', durationMinutes: 60, CourseId: courses[0].id },
      { topic: 'Joins and relationships', sessionDate: '2026-04-13', durationMinutes: 45, CourseId: courses[1].id },
      { topic: 'Jest basics', sessionDate: '2026-04-14', durationMinutes: 50, CourseId: courses[2].id }
    ]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Database seed failed:', error.message);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
