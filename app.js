const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();

mongoose.set('useCreateIndex', true);
require('./config/dbconnection');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Car Rental Agency"
    });
});

const User = require('./models/User');
const Car = require('./models/Cars');

//app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/user'));
app.use('/api/cars', require('./routes/cars'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});