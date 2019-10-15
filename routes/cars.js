const express = require('express');
const passport = require('passport');
const router = express.Router();

let {
  cars,
  addCar,
  updateCar,
  deleteCar,
  showAvailableCars,
  bookCar,
  returnCar,
  viewCar
} = require('../controllers/cars_controller');


  router.get('/', passport.authenticate('jwt', {session: false}), cars);
  router.get('/:id', passport.authenticate('jwt', {session: false}), viewCar);
  router.post('/add', passport.authenticate('jwt', {session: false}), addCar);
  router.post('/update/:id', passport.authenticate('jwt', {session: false}), updateCar);
  router.get('/delete/:id', passport.authenticate('jwt', {session: false}), deleteCar);
  router.get('/available', passport.authenticate('jwt', {session: false}), showAvailableCars);    
  router.post('/book/:id', passport.authenticate('jwt', {session: false}), bookCar);
  router.get('/return/:id', passport.authenticate('jwt', {session: false}), returnCar);

module.exports = router;