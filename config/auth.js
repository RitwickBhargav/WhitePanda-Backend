const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.adminAuth = (req, res, next) => {
	debugger
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({ message: "Access denied!!" });
	} else {
		const decodedPayload = jwt.verify(token, process.env.secret);
		req.user = decodedPayload;
		if (req.user.data.role === "admin") {
			return next();
		} else {
			return res.status(401).json({ message: "Access denied!!" });
		}
	}
};

module.exports.customerAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({ message: "Access denied!!" });
	} else {
		const decodedPayload = jwt.verify(token, process.env.secret);
		req.user = decodedPayload;
		if (req.user.data.role === "customer") {
			return next();
		} else {
			return res.status(401).json({ message: "Access denied!!" });
		}
	}
};

module.exports.allAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({ message: "Access denied!!" });
	} else {
		const decodedPayload = jwt.verify(token, process.env.secret);
		req.user = decodedPayload;
		return next();
	}
};
