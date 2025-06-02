const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Using EJS as the view engine

// Routes - MVC structure
const userAPIRoutes = require('./routes/userAPIRoutes');
const userMVCRoutes = require('./routes/userMVCRoutes');

// serve API under /api/users
app.use('/api/users', userAPIRoutes);

// serve MVC views under /users
app.use('/users', userMVCRoutes);

// Root route
app.get('/', (req, res) => {
  res.render('index', { title: 'Express MVC Demo' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error', 
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});