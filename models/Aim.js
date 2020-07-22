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
    main: {
        type: Boolean,
        default: false
    },
    complete: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aim',
        default: null
    },
    children: []
});

module.exports = Aim = mongoose.model('aim', AimSchema);