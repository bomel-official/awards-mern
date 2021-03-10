const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatarPath: {type: String},
    name: {type: String},
    surname: {type: String},
    city: {type: String},
    school: {type: String},
    classNumber: {type: String},
    classLetter: {type: String},
    classProfile: {type: String},
    awards: [{type: Types.ObjectId, ref: 'Award'}],
    awardsLength: {type: Number, default: 0}
})

module.exports = model('User', schema)