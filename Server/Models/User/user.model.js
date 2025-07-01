const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_address: {
        StreetAddress: { type: String, required: true },
        Apartment: { type: String },
        PostCode: { type: String, required: true },
    },
    user_role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true, });

module.exports = mongoose.model('User', UserSchema);
