const { Collection } = require ('../models/collection');
const { Card, validate } = require('../models/card');
const express = require("express");
const router = express.Router();

router.post('/:collectionId/:cardId', async (req, res) => { // posts a new card into a given collection
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id: "${req.params.collectionId}" does not exist;`);

        const card = await Card.findById(req.params.cardId);
        if (!card) return res.status(400).send(`the card with id: "${req.params.cardId}" does not exist`);

        collection.card.push(card);

        await collection.save();
        return res.send(collection.cardCollection);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:collectionId/:cardId', async (req, res) => { // amends a card in a given collection
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.userId}" does not exist.`);

    const card = collection.cardCollection.id(req.params.cardId);
    if (!cards) return res.status(400).send(`The card with id "${req.params.productId}" is not in this collection.`);
        cards.name = req.body.name;
        cards.strength = req.body.strength;
        cards.weakness = req.body.weakness;
    await collection.save();
    return res.send(cards);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
   
router.delete('/:collectionId/:cardId', async (req, res) => { // deletes a card in a given collection
    try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.userId}" does not exist.`);

    let cards = collection.cardCollection.id(req.params.cardId);
    if (!cards) return res.status(400).send(`The card with id "${req.params.productId}" is not in this collection`);
    cards = await cards.remove();
    await collection.save();
    return res.send(cards);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

   
router.get('/:collectionId/cards', async (req, res) => { // gets all cards in a collection
    try {
        const cards = await Cards.find();
        return res.send(cards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:collectionId/:cardId', async (req, res) => { // gets a specific card in a collection
    try{
        const cards = await Card.findById(req.params.cardId);
        if(!cards)
            return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
        return res.send(cards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;
