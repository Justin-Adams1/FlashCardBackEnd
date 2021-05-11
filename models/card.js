const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 255 },
    definitionOne:  { type: String, required: true, minlength: 5, maxlength: 50  },
    definitionTwo:  { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        definitionOne: Joi.string().min(2).max(50).required(),
        definitionTwo: Joi.string().min(2).max(50).required(),
    });
    return schema.validate(card);
   }
   
exports.Card = Card;
exports.validateCard = validateCard;
exports.cardSchema = cardSchema;