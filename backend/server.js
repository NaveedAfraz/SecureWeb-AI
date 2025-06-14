// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating and verifying JWTs

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Ensure JWT_SECRET is loaded
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
    process.exit(1);
}

// Middleware for CORS
// IMPORTANT: In production, restrict origin to your actual frontend domain(s)
app.use(cors({
    origin: 'http://localhost:5173', // Allow your Vite frontend to access
    credentials: true, // Allow sending cookies/auth headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// --- User Storage (In-memory for simplicity, use a database in production) ---
// In a real app, you'd fetch/store users in a database (MongoDB, PostgreSQL, etc.)
const users = []; // Stores user objects: { id, username, passwordHash }

// Hash a default user's password when the server starts
(async () => {
    const defaultPassword = 'password123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);
    users.push({
        id: 'user1',
        username: 'testuser',
        passwordHash: passwordHash,
        roles: ['user'] // Example roles
    });
    console.log(`Default user 'testuser' with password 'password123' created.`);
})();


// --- JWT Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    // Get token from Authorization header: "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part

    if (token == null) {
        return res.status(401).json({ message: 'No token provided. Unauthorized.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification failed:', err.message);
            // If token is invalid (e.g., expired, malformed), send 403 Forbidden
            return res.status(403).json({ message: 'Invalid token. Forbidden.' });
        }
        req.user = user; // Attach user payload from JWT to request
        next(); // Proceed to the next middleware/route handler
    });
};


// --- API Routes ---

// 1. User Registration (Optional, but good for a full example)
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(), // Simple unique ID
            username,
            passwordHash,
            roles: ['user']
        };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});


// 2. User Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user by username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // If credentials are valid, create a JWT
    // Payload should contain non-sensitive data, typically user ID and roles
    const tokenPayload = { id: user.id, username: user.username, roles: user.roles };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

    res.json({ message: 'Login successful!', token: accessToken, username: user.username });
});


// 3. Protected Route
app.get('/api/protected-data', authenticateToken, (req, res) => {
    // If this middleware is reached, req.user will contain the decoded JWT payload
    console.log('Accessing protected data for user:', req.user.username);
    res.json({
        message: 'This is highly confidential data, only accessible to authenticated users!',
        data: {
            timestamp: new Date().toISOString(),
            accessedBy: req.user.username,
            userId: req.user.id,
            userRoles: req.user.roles,
        },
    });
});


// 4. Public Route (no authentication required)
app.get('/api/public-data', (req, res) => {
    res.json({ message: 'This is public data, anyone can see it!' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
    console.log(`Public data: http://localhost:${PORT}/api/public-data`);
    console.log(`Login: POST http://localhost:${PORT}/api/login`);
    console.log(`Protected data: http://localhost:${PORT}/api/protected-data (requires JWT)`);
    console.log(`Test user: username 'testuser', password 'password123'`);
});