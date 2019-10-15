const Car = require("../models/Cars");

module.exports.cars = async (req, res) => {
	let cars = await Car.find().sort({ createdAt: "desc", isBooked: "asc" });
	res.status(200).json({ message: "success", cars });
};

module.exports.addCar = async (req, res) => {
	debugger
	let { vehicleNumber, model, seating } = req.body;
	let car = await Car.findOne({ vehicleNumber });
	if (car) {
		res.status(400).json({ message: "Already registered!!" });
	} else {
		await Car.create({ vehicleNumber, model, seating });
		res.status(200).json({ message: "Added Successfully!!" });
	}
};

module.exports.updateCar = async (req, res) => {
	let { model, seating } = req.body;
	let car = await Car.findById(req.params.id);
	if (!car.isBooked) {
		car = await Car.findByIdAndUpdate(req.params.id, req.body);
		res.status(200).json({ message: "Updated successfully!!" });
	} else {
		res.status(404).json({ message: "No such car!!" });
	}
};

module.exports.deleteCar = async (req, res) => {
	let car = await Car.findById(req.params.id);
	if (car) {
		Car.deleteById(req.params.id);
		res.status(200).json({ message: "Deleted Successfully!!" });
	} else {
		res.status(400).json({ message: "No such Car!!" });
	}
};

module.exports.viewCar = async (req, res) => {
	let car = await Car.findById(req.params.id);
	if (car.isBooked) {
		car = await Car.findById(req.params.id).populate("booking.customer");
	}
	res.status(200).json({ message: "success", car });
};

module.exports.showAvailableCars = async (req, res) => {
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
	res.status(200).json({ message: "success", cars });
};

module.exports.bookCar = async (req, res) => {
	let { returnDate } = req.body;
	let car = await Car.findById(req.params.id);
	if (car.isBooked) {
		res.status(400).json({ message: "Already Booked!!" });
	} else {
		car.isBooked = true;
		car.booking.customer = req.user.id;
		car.booking.issueDate = new Date(Date(Date.now())).toDateString();
		car.booking.returnDate = returnDate;
		await car.save();
		res.status(400).json({ message: "Booked!!" });
	}
};

module.exports.returnCar = async (req, res) => {
	let car = await Car.findById(req.params.id);
	car.isBooked = false;
	car.booking.customer = null;
	car.booking.issueDate = null;
	car.booking.returnCar = null;
	await car.save();
	res.status(200).json({ message: "Returned successfully!!" });
};
