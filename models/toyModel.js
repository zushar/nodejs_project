const mongoose = require('mongoose');
const joi = require('joi');

const toySchema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    img_url: String,
    price: Number,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true});
exports.ToyModel = mongoose.model('toys', toySchema);

exports.validateToy = (toy) => {
    const schema = joi.object({
        name: joi.string().min(2).max(100).required(),
        info: joi.string().min(2).max(999).required(),
        category: joi.string().min(2).max(100).required(),
        img_url: joi.string().min(2).max(400).allow(null, ''),
        price: joi.number().min(2).max(10000).required()
    });
    return schema.validate(toy);
}