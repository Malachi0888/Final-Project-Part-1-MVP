# Final Project Part 1: MVP REST API

## Project Overview
This project is a backend MVP for a study planner API. It uses Express, Sequelize, and SQLite to manage three related resources:
- Courses
- Assignments
- Study Sessions

The API includes CRUD operations, middleware, error handling, seed data, and basic tests.

## Project Structure
```text
final_project_part1_mvp/
├── app.js
├── server.js
├── package.json
├── .gitignore
├── database/
│   ├── setup.js
│   ├── seed.js
│   └── models/
│       └── index.js
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
├── routes/
│   ├── courses.js
│   ├── assignments.js
│   └── studySessions.js
└── tests/
    └── api.test.js
```

## Installation and Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npm run setup
   ```
4. Seed the database with sample data:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

The API runs locally at:
```text
http://localhost:3000
```

## API Endpoints

### Root
- `GET /`
  - Returns a simple status message.

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get one course by ID
- `POST /courses` - Create a course
- `PUT /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course

Example POST body:
```json
{
  "title": "Backend Development",
  "instructor": "Professor Smith",
  "credits": 3
}
```

### Assignments
- `GET /assignments` - Get all assignments
- `GET /assignments/:id` - Get one assignment by ID
- `POST /assignments` - Create an assignment
- `PUT /assignments/:id` - Update an assignment
- `DELETE /assignments/:id` - Delete an assignment

Example POST body:
```json
{
  "title": "Build Express Routes",
  "dueDate": "2026-04-20",
  "completed": false,
  "CourseId": 1
}
```

### Study Sessions
- `GET /study-sessions` - Get all study sessions
- `GET /study-sessions/:id` - Get one study session by ID
- `POST /study-sessions` - Create a study session
- `PUT /study-sessions/:id` - Update a study session
- `DELETE /study-sessions/:id` - Delete a study session

Example POST body:
```json
{
  "topic": "Sequelize Associations",
  "sessionDate": "2026-04-15",
  "durationMinutes": 60,
  "CourseId": 1
}
```

## Error Handling
The API returns meaningful JSON errors, such as:
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

Example error response:
```json
{
  "error": "Course not found"
}
```

## Testing
Run tests with:
```bash
npm test
```

The tests use Jest and Supertest and include:
- successful requests
- validation errors
- resource creation checks

## Sample Commit Ideas
- `Create Sequelize models and relationships`
- `Add CRUD routes for courses`
- `Implement middleware and error handling`
- `Write API tests and README documentation`
