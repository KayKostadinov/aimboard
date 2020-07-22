const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    about: {
        type: String,
        default: ''
    },
    goals: {
        type: [String],
        default: ''
    },
    interests: {
        type: [String],
        default: ''
    },
    social: {
        youtube: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);