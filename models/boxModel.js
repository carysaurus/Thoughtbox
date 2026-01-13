// boxModel.js

const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const {
    boxColours
} = require('../config/colourThemes');

const boxSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    colour: {
        type: String,
        required: true,
        enum: boxColours,
        default: 'Light',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // To be updated when Users are implemented
        ref: 'User',
    },
    order: {
        type: Number,
        required: true,
        default: 0,
    },
    archived: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Box = mongoose.model('Box', boxSchema);

module.exports = {
    Box
}