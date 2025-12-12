// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Multer errors (file upload)
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 10MB' 
      });
    }
    return res.status(400).json({ 
      error: err.message || 'File upload error' 
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ 
      error: 'Validation error', 
      details: messages 
    });
  }

  // Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      error: 'Invalid ID format' 
    });
  }

  // Custom application errors
  if (err.status) {
    return res.status(err.status).json({ 
      error: err.message 
    });
  }

  // Default server error
  res.status(500).json({ 
    error: err.message || 'Internal server error' 
  });
}

module.exports = errorHandler;
