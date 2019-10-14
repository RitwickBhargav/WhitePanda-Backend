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
} = require('../controllers/admin_controller');

router.get('/', cars);
router.post('/add', addCar);
router.post('/update/:id', updateCar);
router.get('/delete/:id', deleteCar);
router.get('/available', showAvailableCars);
router.post('/book/:id', bookCar);
router.get('/return/:id', returnCar);
router.get('/:id', viewCar);

module.exports = router;