const { sequelize } = require('./models');

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database tables created successfully.');
  } catch (error) {
    console.error('Database setup failed:', error.message);
  } finally {
    await sequelize.close();
  }
}

setupDatabase();
