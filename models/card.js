const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 },
    strength:  { type: String, required: true, minlength: 5, maxlength: 50  },
    weakness:  { type: String, required: true, minlength: 5, maxlength: 50 },
    dateModified:  { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        strength: Joi.string().min(5).max(50).required(),
        weakness: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(card);
   }
   
exports.Card = Card;
exports.validate = validateCard;
exports.cardSchema = cardSchema;