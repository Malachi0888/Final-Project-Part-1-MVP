const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 6 }
  }
});

const Assignment = sequelize.define('Assignment', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  dueDate: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

const StudySession = sequelize.define('StudySession', {
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  sessionDate: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 15 }
  }
});

Course.hasMany(Assignment, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});
Assignment.belongsTo(Course, {
  foreignKey: { allowNull: false }
});

Course.hasMany(StudySession, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE'
});
StudySession.belongsTo(Course, {
  foreignKey: { allowNull: false }
});

module.exports = {
  sequelize,
  Course,
  Assignment,
  StudySession
};
