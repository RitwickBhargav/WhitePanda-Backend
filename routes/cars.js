const express = require('express');
const router = express.Router();

let {
  cars,
  addCar,
  updateCar,
  deleteCar,
} = require('../controllers/admin_controller');

router.get('/', cars);
router.post('/add', addCar);
router.post('/update/:id', updateCar);
router.get('/delete/:id', deleteCar);
router.get('/:id', viewCar);

module.exports = router;