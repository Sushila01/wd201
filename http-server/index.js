const express = require('express');
const path = require('path');
const minimist = require('minimist');
// Parse command-line arguments for port
const args = minimist(process.argv.slice(2));
const PORT = args.port || 3000; // Default to 3000 if no port is specified

const app = express();

// Serve static files (HTML, CSS, client-side JS)
app.use(express.static(path.join(__dirname)));

// Route to serve home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route to serve project.html
app.get('/project', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'));
});

// Route to serve registration.html
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
