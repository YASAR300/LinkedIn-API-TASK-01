const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

// Define the port and MongoDB URI
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || "mongodb+srv://yasarkhancg:787898@cluster0.s9g7h.mongodb.net/";
const dbName = "Linkedin";

// Middleware
app.use(cors());
app.use(express.json());

let db, users, connections, posts, messages;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        users = db.collection("users");
        connections = db.collection("connections");
        posts = db.collection("posts");
        messages = db.collection("messages");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// ================================ User Management ================================

// GET: Fetch all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await users.find().toArray();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});

// GET: Fetch a specific user
app.get('/users/:userId', async (req, res) => {
    try {
        const user = await users.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).send("User not found.");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send("Error fetching user: " + err.message);
    }
});

// POST: Create a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await users.insertOne(newUser);
        res.status(201).send(`User added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding user: " + err.message);
    }
});

// PATCH: Update user headline
app.patch('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        const result = await users.updateOne({ userId }, { $set: updateData });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating user: " + err.message);
    }
});

// DELETE: Delete a user
app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await users.deleteOne({ userId });
        res.status(200).send(`${result.deletedCount} user(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
});

// ================================ Connections ================================

// GET: Fetch all connections for a user
app.get('/connections/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userConnections = await connections.find({ user1: userId }).toArray();
        res.status(200).json(userConnections);
    } catch (err) {
        res.status(500).send("Error fetching connections: " + err.message);
    }
});

// POST: Send a connection request
app.post('/connections', async (req, res) => {
    try {
        const newConnection = req.body;
        const result = await connections.insertOne(newConnection);
        res.status(201).send(`Connection request created with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error sending connection request: " + err.message);
    }
});

// PATCH: Accept a connection request
app.patch('/connections/:connectionId', async (req, res) => {
    try {
        const connectionId = req.params.connectionId;
        const result = await connections.updateOne({ connectionId }, { $set: { status: "connected" } });
        res.status(200).send(`${result.modifiedCount} connection(s) accepted`);
    } catch (err) {
        res.status(500).send("Error accepting connection: " + err.message);
    }
});

// DELETE: Remove a connection
app.delete('/connections/:connectionId', async (req, res) => {
    try {
        const connectionId = req.params.connectionId;
        const result = await connections.deleteOne({ connectionId });
        res.status(200).send(`${result.deletedCount} connection(s) removed`);
    } catch (err) {
        res.status(500).send("Error removing connection: " + err.message);
    }
});

// ================================ Posts ================================

// GET: Fetch all posts
app.get('/posts', async (req, res) => {
    try {
        const allPosts = await posts.find().toArray();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).send("Error fetching posts: " + err.message);
    }
});

// GET: Fetch a specific post
app.get('/posts/:postId', async (req, res) => {
    try {
        const post = await posts.findOne({ postId: req.params.postId });
        if (!post) return res.status(404).send("Post not found.");
        res.status(200).json(post);
    } catch (err) {
        res.status(500).send("Error fetching post: " + err.message);
    }
});

// POST: Create a new post
app.post('/posts', async (req, res) => {
    try {
        // Create new post object, adding the current date for 'createdAt'
        const newPost = {
            ...req.body,
            createdAt: new Date() // Add the current date and time
        };

        const result = await posts.insertOne(newPost);
        res.status(201).send(`Post added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding post: " + err.message);
    }
});


// PATCH: Add a like to a post
app.patch('/posts/:postId/likes', async (req, res) => {
    try {
        const postId = req.params.postId;
        const result = await posts.updateOne({ postId }, { $inc: { likes: 1 } });
        res.status(200).send(`${result.modifiedCount} post(s) liked`);
    } catch (err) {
        res.status(500).send("Error liking post: " + err.message);
    }
});

// DELETE: Delete a post
app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const result = await posts.deleteOne({ postId });
        res.status(200).send(`${result.deletedCount} post(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting post: " + err.message);
    }
});

// ================================ Messages ================================

// GET: Fetch messages for a user
app.get('/messages/:userId', async (req, res) => {
    try {
        const messagesForUser = await messages.find({ to: req.params.userId }).toArray();
        res.status(200).json(messagesForUser);
    } catch (err) {
        res.status(500).send("Error fetching messages: " + err.message);
    }
});

// POST: Send a message
app.post('/messages', async (req, res) => {
    try {
        const newMessage = {
            ...req.body, 
            sentAt: new Date()
        };
        const result = await messages.insertOne(newMessage);
        res.status(201).send(`Message sent with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error sending message: " + err.message);
    }
});


// DELETE: Delete a message
app.delete('/messages/:messageId', async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const result = await messages.deleteOne({ messageId });
        res.status(200).send(`${result.deletedCount} message(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting message: " + err.message);
    }
});

// ================================ Miscellaneous ================================

// GET: Fetch profile views count
app.get('/users/:userId/profile-views', async (req, res) => {
    try {
        const user = await users.findOne({ userId: req.params.userId }, { profileViews: 1 });
        res.status(200).json(user.profileViews);
    } catch (err) {
        res.status(500).send("Error fetching profile views: " + err.message);
    }
});

// PUT: Add a skill to a user
app.put('/users/:userId/skills', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { skills } = req.body;

        // Validate skill
        if (!skills) {
            return res.status(400).send("Skill is required and cannot be null or undefined");
        }

        const result = await users.updateOne(
            { userId },
            { $push: { skills: skills } }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send("User not found or skill not added");
        } else {
            res.status(200).send(`${result.modifiedCount} skill(s) added`);
        }
    } catch (err) {
        res.status(500).send("Error adding skill: " + err.message);
    }
});


// PATCH: Upgrade to a premium account
app.patch('/users/:userId/premium', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await users.updateOne({ userId }, { $set: { isPremium: true } });
        res.status(200).send(`${result.modifiedCount} user(s) upgraded to premium`);
    } catch (err) {
        res.status(500).send("Error upgrading user to premium: " + err.message);
    }
});

// ================================ End of Routes ================================
