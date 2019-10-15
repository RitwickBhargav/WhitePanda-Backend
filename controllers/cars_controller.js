module.exports.cars = async (req, res) => {
  let cars = await cars.find().sort({ createdAt: 'desc', isBooked: 'asc' });
  res.status(200).json({ message: 'success', cars });
}

module.exports.addCar = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "admin")
  {
    let {
      vehicleNumber,
      model,
      seating
    } = req.body;

    let car = Car.findOne({ vehicleNumber });
    if (car) {
      res.status(400).json({ message: 'Already registered!!' });
    } else {
      car = await Car.create(req.body);
      res.status(200).json({ message: 'Added Successfully!!' });
    }
  }
  else
    res.status(401).json({message: 'Unauthorized'});
}

module.exports.updateCar = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "admin")
  {
    let {
      model,
      seating
    } = req.body;
    let car = await Car.findById(req.params.id);
    if (!car.isBooked) {
      car = await Car.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: 'Updated successfully!!' });
    } else {
      res.status(404).json({ message: 'No such car!!' });
    }
  }
  else
    res.status(401).json({message: 'Unauthorized'});
}

module.exports.deleteCar = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "admin")
  {  
    let car = await Car.findById(req.params.id);
    if (car) {
      Car.deleteById(req.params.id);
      res.status(200).json({ message: 'Deleted Successfully!!' });
    } else {
      res.status(400).json({ message: 'No such Car!!' });
    }
  }
  else
    res.status(401).json({message: 'Unauthorized'});
}

module.exports.viewCar = async (req, res) => {
  let car = await Car.findById(req.params.id);
  if(car.isBooked){
    car = await Car.findById(req.params.id).populate('booking.customer');
  }
  res.status(200).json({ message: 'success', car });
}

module.exports.showAvailableCars = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "admin" || userType == "customer")
  {
    let { seating, model } = req.query;
    let filters = {};
    filters.isBooked = false;
    if (seating) {
      filters.seating = seating;
    }
    if (model) {
      filters.model = model;
    }
    let cars = await Car.find(filters);
    res.status(200).json({ message: 'success', cars });
  }
}

module.exports.bookCar = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "customer")
  {
    let { returnDate } = req.body;
    let car = await Car.findById(req.params.id);
    if (car.isBooked) {
      res.status(400).json({ message: 'Already Booked!!' });
    } else {
      car.isBooked = true;
      car.booking.customer = req.user.id;
      car.booking.issueDate = Date(Date.now()).toDateString();
      car.booking.returnDate = returnDate;
      await car.save();
      res.status(400).json({ message: 'No such car!!' })
    }
  }
  else
    res.status(401).json({message: 'Unauthorized'});
}

module.exports.returnCar = async (req, res) => {
  const userType = req.originalUrl.split('/')[2];
  if(userType == "admin")
  {
    let car = await Car.findById(req.params.id);
    car.isBooked = false;
    car.booking.customer = null;
    car.booking.issueDate = null;
    car.booking.returnCar = null;
    await car.save();
    res.status(200).json({ message: 'Returned successfully!!' });
  }
  else
    res.status(401).json({message: 'Unauthorized'});
}