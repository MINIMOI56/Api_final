const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        verify: {
            validator: function (v) {
                return v.length >= 5 && v.length <= 25;
            },
            message: 'Le nom doit contenir entre 5 et 25 caractères'
        }
    },
    class: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        verify: {
            validator: function (v) {
                return v.length >= 5 && v.length <= 25;
            },
            message: 'La classe doit contenir entre 5 et 25 caractères'
        }
    }
});

PlayersSchema.set('toJSON', { virtuals: true })
module.exports = mongoose.model('Players', PlayersSchema);

PlayersSchema.virtual("url", () => {
    return "https://ui-avatars.com/api/?name=" + this.name + "&background=random";
});

PlayersSchema.virtual("ip", () => {
    return "http://ip-api.com/json/?fields=query";
});

module.exports = mongoose.model('Players', PlayersSchema);