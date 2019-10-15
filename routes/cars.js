const express = require('express');
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

let { adminAuth, customerAuth, allAuth } = require('../config/auth');

  router.get('/', allAuth, cars);
  router.post('/add', adminAuth, addCar);
  router.post('/update/:id', adminAuth, updateCar);
  router.get('/delete/:id', adminAuth, deleteCar);
  router.get('/available', allAuth, showAvailableCars);    
  router.post('/book/:id', customerAuth, bookCar);
  router.get('/return/:id', adminAuth, returnCar);
  router.get('/:id', allAuth, viewCar);

module.exports = router;