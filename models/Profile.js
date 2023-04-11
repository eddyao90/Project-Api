const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            required: [true, 'Gender is required']
        },
        birthday: {
            type: Date,
            required: [true, 'Birthday is required']
        },
        language: {
            type: String,
            required: [true, 'At least one language is required']
        },
        looking: {
            type: String,
            required: [true, 'Required'],
            enum: ["friends", "travel companionship", "travel bussiness partnership"]
        },
        travel: {
            type: String,
            required: [true, 'Required'],
        },
        activities: {
            type: String,
            required: [true, 'Required'],
        },
        books: {
            type: String,
            required: [true, 'Required'],
        },
        music: {
            type: String,
            required: [true, 'Required'],
        },
        food: {
            type: String,
            required: [true, 'Required'],
        },
        top3: {
            type: String,
            required: [true, 'Required'],
        },
        friends: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true,
        toObject: { 
          virtuals: true
        },
    }
)

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;