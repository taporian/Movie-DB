const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        min:1000, 
        max:9999,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 4,
    }
});
module.exports = mongoose.model('Movies',PostSchema);