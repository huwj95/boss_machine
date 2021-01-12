const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter();

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById(minions, id);
  if(minion){
    req.minion = minion;
    next();}
  else {
    res.status(404).send('Minion not found');
  }
});

//GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase(minions));
});

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  let newMinion  = addToDatabase(minions, req.body);
  res.status(201).send(newMinion);
});

//GET /api/minions/:minionId to get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

//PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinion = req.body;
  let updatedInstance = updateInstanceInDatabase(minions, updatedMinion);
  res.send(updatedInstance);
});
//DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId(minions, req.minion.id);
});
