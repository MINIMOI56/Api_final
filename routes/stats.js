var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/games.js');
require('dotenv').config();

/* GET le nombre de partie dans chaque mode de jeu */
router.get('/gamemode', async(req, res) => {
    await mongoose.connect(process.env.MONGO_APP_URI);
    try {
        const games = await Game.aggregate([
        { $group: { _id: "$chosen_game_mode", count: { $sum: 1 } } }
        ]);
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await mongoose.connection.close();
    }
});


/* GET le nombre de partie dans chaque map */
router.get('/map', async(req, res) => {
    await mongoose.connect(process.env.MONGO_APP_URI);
    try {
        const games = await Game.aggregate([
        { $group: { _id: "$chosen_map", count: { $sum: 1 } } }
        ]);
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await mongoose.connection.close();
    }
});



module.exports = router;