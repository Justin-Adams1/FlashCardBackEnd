const { Card, validateCard } = require('../models/card');
const { Collection, validateCollection } = require('../models/collection')
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { // get all collections
    try {
        const collection = await Collection.find();
        return res.send(collection);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => { // get specific collection
    try{
        const collection = await Collection.findById(req.params.id);
        if(!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
        return res.send(collection);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});   

router.get('/:collectionId/cards', async (req, res) => { // get all cards from specific collection
    try{
        const collection = await Collection.findById(req.params.collectionId);
        if(!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
        return res.send(collection.cards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});  

router.get('/:collectionId/:cardId', async (req, res) => { // gets a specific card
    try{
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The card with id "${req.params.collectionId}" is not in this collection.`);

        const card = await collection.cards.id(req.params.cardId);
        if(!card)
            return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
        return res.send(card);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/newCollection", async (req, res) => { // post a new collection
  try {
    const { error } = validateCollection(req.body);
    if (error) return res.status(400).send(error);
    const collection = new Collection({
      name: req.body.name,
      cards: [],
    });
    const awaitConst = await collection.save();
    return res.send(awaitConst);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post('/:collectionId/', async (req, res) => { // posts a new card into a given collection
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id: "${req.params.collectionId}" does not exist;`);

        collection.cards.push({
            title: req.body.title,
            definitionOne: req.body.definitionOne,
            definitionTwo: req.body.definitionTwo
        });

        await collection.save();
        return res.send(collection.cards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:collectionId/:cardId', async (req, res) => { // amends a card in a given collection
    try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    const card = collection.cards.id(req.params.cardId);
    if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" is not in this collection.`);
        card.title = req.body.title;
        card.definitionOne = req.body.definitionOne;
        card.definitionTwo = req.body.definitionTwo;
    await collection.save();
    return res.send(card);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:collectionId/:cardId', async (req, res) => { // deletes a card in a given collection
    try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    let card = collection.cards.id(req.params.cardId);
    if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" is not in this collection`);
    card = await card.remove();
    await collection.save();
    return res.send(card);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => { // deletes a specific collection
    try{
        const collection = await Collection.findByIdAndRemove(req.params.id);
        if (!collection)
            return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
        return res.send(collection);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;
