const mongoose = require('mongoose');
const knjigaShema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    knjiga: String,
    autor: String
});

module.exports = mongoose.model('Knjiga', knjigaShema);