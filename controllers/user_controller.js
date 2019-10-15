module.exports.register = async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    role: req.body.role
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      let message = "";
      if (err.errors.email)
        message += "Email already exists.";
      return res.json({
        success: false,
        email: message
      });
    } else {
      message = "";
      message1 = "";
      message2 = "";
      var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      if (emailRegex.test(newUser.email) == false)
        message += "Email is not valid.";
      if (req.body.password.length < 8)
        message1 += "Password must have atleast 8 characters";
      var isnum = /^\d+$/.test(newUser.contact);
      if (newUser.contact.length < 10 || newUser.contact.length > 10 || isnum == false)
        message2 += "Contact No. should be of 10 digits";
      if (message != "" || message1 != "" || message2 != "")
        return res.json({
          success: false,
          email: message,
          password: message1,
          contact: message2
        }).status(400);
      else
        return res.json({
          success: true,
          message: "Registeration Successful!"
        }).status(200);
    }
  });
}

module.exports.login = (req, res) => {
  let {
    email,
    password
  } = req.body;
  let role = req.originalUrl.split('/')[2];
  User.getUserByEmail(email, role, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!"
      }).status(400);
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
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
        }, config.secret, {
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
    });
  });
}

module.exports.profile = (req, res) => {
  // console.log(req.user);
  return res.json(
    req.user
  );
};