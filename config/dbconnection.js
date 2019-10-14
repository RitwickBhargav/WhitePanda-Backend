const mongoose = require('mongoose');
require('dotenv').config();

const dburl = process.env.MONGO_URI;
mongoose.connect(config.database, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database connected successfully!');
    }).catch(err => {
        console.log(err);
    });
