const express = require('express');
const path = require('path');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/users');
const communityRoutes = require('./routes/community');
const marketplaceRoutes = require('./routes/marketplace');
const aiRoutes = require('./routes/ai');

const { setupDatabase } = require('./database');

const app = express();
const port = 3000;

// Setup database on startup
setupDatabase();

// Middleware to parse JSON bodies
app.use(cors()); // Use cors middleware
app.use(express.json());

// Serve static files from the parent directory (for index.html)
app.use(express.static(path.join(__dirname, '..')));

// Use API routes
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/ai', aiRoutes);

// Serve the main index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log('API Endpoints are available under /api');
});
