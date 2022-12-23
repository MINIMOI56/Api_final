const mongoose = require('mongoose');
const Players = require('./players');
const Schema = mongoose.Schema;

const GamesSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        verify: {
            validator: function (v) {
                return v.length >= 5 && v.length <= 100;
            },
            message: 'Le nom doit contenir entre 5 et 25 caractères'
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000,
        verify: {
            validator: function (v) {
                return v.length >= 5 && v.length <= 1000;
            },
            message: 'La description doit contenir entre 5 et 1000 caractères'
        }
    },
    number_of_round_played: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        verify: {
            validator: function (v) {
                return v >= 0 && v <= 10;
            },
            message: 'Le nombre de round doit être compris entre 0 et 10'
        }
    },
    time_per_round_played: {
        type: [Number],
        required: true,
        min: 0,
        message: 'Le temps par round doit être supérieur à 0'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    chosen_map: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        verify: {
            validator: function (v) {
                return v.length >= 3 && v.length <= 25;
            },
            message: 'Le nom de la map doit contenir entre 3 et 25 caractères'
        }
    },
    chosen_game_mode: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        verify: {
            validator: function (v) {
                return v.length >= 3 && v.length <= 25;
            },
            message: 'Le nom du mode de jeu doit contenir entre 3 et 25 caractères'
        }   
    },
    is_day: {
        type: Boolean,
        required: true,
        message: 'Le jour ou la nuit doit être défini'
    },
    elapsed_time: {
        type: Number,
        required: true,
        min: 0,
        message: 'Le temps écoulé doit être supérieur à 0'
    },
    players: {
        type: [Players.schema],
        required: true,
        minlength: 1,
        message: 'Au moin 1 joueur doit être définis'
    },
    joinable: {
        type: Boolean,
        required: true,
        message: 'Le jeu doit être défini comme joignable ou non'
    },
    started: {
        type: Boolean,
        required: true,
        message: 'Le jeu doit être défini comme démarré ou non'
    }
});

module.exports = mongoose.model('Games', GamesSchema);