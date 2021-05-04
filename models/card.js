const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    heroName: { type: String, required: true, minlength: 2, maxlength: 255 },
    strength:  { type: String, required: true, minlength: 5, maxlength: 50  },
    weakness:  { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        heroName: Joi.string().min(2).max(50).required(),
        strength: Joi.string().min(2).max(50).required(),
        weakness: Joi.string().min(2).max(50).required(),
    });
    return schema.validate(card);
   }
   
exports.Card = Card;
exports.validateCard = validateCard;
exports.cardSchema = cardSchema;