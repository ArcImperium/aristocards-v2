const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const scoreFile = path.join(__dirname, '../data/scores.json')

router.get('/scores', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(scoreFile, 'utf8'))
    res.json(posts)
})

router.post('/scores', (req, res) => {
    const scores = JSON.parse(fs.readFileSync(scoreFile, 'utf8'))

    const newScore = {
        user: req.body.user,
        score: 100
    }

    scores.push(newScore)
    fs.writeFileSync(scoreFile, JSON.stringify(scores, null, 2))

    res.status(201).json(newScore)
})

router.delete('/scores/:user', (req, res) => {
    const scores = JSON.parse(fs.readFileSync(scoreFile, 'utf8'))
    const scoreToDelete = req.params.user

    const filteredScores = scores.filter(score => score.user !== scoreToDelete)
    fs.writeFileSync(scoreFile, JSON.stringify(filteredScores, null, 2))

    res.status(200).json({ message: 'User deleted successfully' })
})

router.put('/scores/:user', (req, res) => {
    const scores = JSON.parse(fs.readFileSync(scoreFile, 'utf8'));
    const username = req.params.user;
    const newScore = req.body.score;

    const userIndex = scores.findIndex(s => s.user === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    scores[userIndex].score = newScore;

    fs.writeFileSync(scoreFile, JSON.stringify(scores, null, 2));

    res.status(200).json(scores[userIndex]);
});

module.exports = router