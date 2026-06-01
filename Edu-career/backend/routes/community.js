const express = require('express');
const router = express.Router();
const { getDb } = require('../database');

// @route   GET api/community/posts
// @desc    Get all community posts
router.get('/posts', async (req, res) => {
    try {
        const db = getDb();
        const posts = await db.all(
            `SELECT p.id, p.title, p.content, p.likes, p.createdAt, u.username as authorName 
             FROM posts p
             JOIN users u ON p.authorId = u.id
             ORDER BY p.createdAt DESC`
        );
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/community/posts
// @desc    Create a new post
router.post('/posts', async (req, res) => {
    // Note: In a real app, authorId should come from an authenticated user session (e.g., JWT token)
    const { authorId, title, content } = req.body; 
    if(!authorId || !title || !content) {
        return res.status(400).json({ msg: 'Please include authorId, title, and content' });
    }

    try {
        const db = getDb();
        const result = await db.run(
            'INSERT INTO posts (authorId, title, content) VALUES (?, ?, ?)',
            [authorId, title, content]
        );
        const newPost = await db.get('SELECT * FROM posts WHERE id = ?', [result.lastID]);
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
