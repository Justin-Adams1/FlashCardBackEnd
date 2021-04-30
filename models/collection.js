const mongoose = require('mongoose');
const Joi = require('joi');
const { cardSchema } = require('./card');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true},
    cards: { type: [cardSchema], default: [] }
});

const Collection = mongoose.model('Collection', collectionSchema);

function validateCollection(collection) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required()
    });
    return schema.validate(collection);
}

exports.Collection = Collection;
exports.validateCollection = validateCollection;