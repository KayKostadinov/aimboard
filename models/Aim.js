const mongoose = require('mongoose');

const AimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: Date.now
    },
});

module.exports = Aim = mongoose.model('aim', AimSchema);