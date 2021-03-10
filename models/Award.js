const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    contestName: {type: String, required: true},
    contestDate: {type: Date, required: true},
    contestCity: {type: String, required: true},
    contestPlace: {type: String, required: true},
    imagePath: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'},
    ownerFullname: {type: String, required: true},
    ownerCity: {type: String, required: true},
    ownerClass: {type: String, required: true}
})

module.exports = model('Award', schema)