// noteModel.js

const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const {
    noteColours
} = require('../config/colourThemes');
const {
    noteTypes
} = require('../config/noteTypes');


const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    colour: {
        type: String,
        required: true,
        enum: noteColours,
        default: 'Light',
    },
    type: {
        type: String,
        required: true,
        enum: noteTypes,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // To be updated when Users are implemented
        ref: 'User',
    },
    boxId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Box',
    },
    text: {
        type: String,
        trim: true,
    },
    checkboxes: [{
        label: String,
        checked: {
            type: Boolean,
            default: false
        },
    }],
    list: [{
        type: String,
        trim: true,
    }],

    links: [{
        label: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
        },
    }],
    images: [{
        src: {
            type: String,
            trim: true,
        },
        alt: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    }],
    tags: [{
        type: String,
        trim: true,
        lowercase: true,
        required: false,
    }],
    archived: {
        type: Boolean,
        default: false,
        required: true,
    },

    order: {
        type: Number,
        default: 0,
        required: true,
    },
    collapsed: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true
});

noteSchema.index({
    boxId: 1
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {
    Note
}