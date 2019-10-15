const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports.register = async (req, res) => {
  let {
    name,
    email,
    contact,
    password,
    role
  } = req.body;
  if (!name || !email || !contact || !password || !role) {
    return res.status(400).json({ message: 'All fields are mandatory!!' });
  }
  let emailRegex = /^\S+@\S+\.\S+/,
    phoneRegex = /(^[6-9]{1}[0-9]{9}$)/,
    passwordRegex = /^[\S]{8,}/;
  if (emailRegex.test(email)) {
    if (passwordRegex.test(String(password))) {
      if (phoneRegex.test(Number(contact))) {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'User already registered!!' });
        } else {
          let newUser = {
            name, email, password, role, contact
          };
          const salt = await bcrypt.genSalt(10);
          newUser.password = await bcrypt.hash(newUser.password, salt);
          user = await User.create(newUser);
          return res.status(200).json({
            success: true,
            message: "Registeration Successful!"
          });
        }
      } else {
        res.status(400).json({
          message: 'Contact number not valid!!'
        });
      }
    } else {
      res.status(400).json({
        message: 'Password must be atleast 8 characters long!!'
      });
    }
  } else {
    res.status(400).json({ message: 'EmailID is not valid!!' });
  }
}
module.exports.login = async (req, res) => {
  let {
    email,
    password
  } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      message: "User not found!"
    }).status(400);
  }
  debugger
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({
      type: "user",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    }, process.env.secret, {
      expiresIn: 604800 // for 1 week time in milliseconds
    });
    return res.json({
      success: true,
      token: "JWT " + token
    }).status(200);
  } else {
    return res.json({
      success: true,
      message: "Wrong Password."
    }).status(401);
  }
}
module.exports.profile = (req, res) => {
  // console.log(req.user);
  return res.json(
    req.user
  );
};