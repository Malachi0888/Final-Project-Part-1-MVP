function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((error) => error.message)
    });
  }

  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;
