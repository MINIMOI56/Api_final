var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/games.js');
require('dotenv').config();

/* GET de tout les parties. */
router.get('/', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET d'une partie par id */
router.get('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const games = await Game.findById(req.params.id);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET de partie par la map et le mode de jeu */
router.get('/map/:map/:gamemode', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const games = await Game.find({ chosen_map: req.params.map, chosen_game_mode: req.params.gamemode });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* GET de partie entre un sertain elapsed_time min max */
router.get('/elapsed_time/:min/:max', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const games = await Game.find({ elapsed_time: { $gte: req.params.min, $lte: req.params.max } });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* POST d'une partie */
router.post('/', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const game = new Game({
      name: req.body.name,
      description: req.body.description,
      number_of_round_played: req.body.number_of_round_played,
      time_per_round_played: req.body.time_per_round_played,
      created_date: req.body.created_date,
      chosen_map: req.body.chosen_map,
      chosen_game_mode: req.body.chosen_game_mode,
      is_day: req.body.is_day,
      elapsed_time: req.body.elapsed_time,
      players: req.body.players,
      joinable: req.body.joinable,
      started: req.body.started
    });
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

/* Exemple de requete pour ajouter une partie */
// {
//     "name": "test",
//     "description": "test",
//     "number_of_round_played": 1,
//     "time_per_round_played": [1,2,3],
//     "created_date": "2020-04-01T00:00:00.000Z",
//     "chosen_map": "test",
//     "chosen_game_mode": "test",
//     "is_day": true,
//     "elapsed_time": 1,
//     "players": [
//         {
//             "name": "test",
//             "class": "test"
//         }
//     ],
//     "joinable": true,
//     "started": true
// }  

/* PUT d'une partie */
router.put('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    let updatedGame = req.body;
    delete updatedGame._id;
    const game = await Game.findByIdAndUpdate(req.params.id, { $set: updatedGame });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});


/* DELETE d'une partie */
router.delete('/:id', async(req, res) => {
  await mongoose.connect(process.env.MONGO_APP_URI);
  try {
    const game = await Game.findById(req.params.id);
    if (game == null) {
      return res.status(404).json({ message: 'La partie n\'existe pas' });
    }
    await game.remove();
    res.json({ message: 'La partie a été supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await mongoose.connection.close();
  }
});

module.exports = router;