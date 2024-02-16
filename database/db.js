const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/MERA_MANN")
    .then(() => console.log("connection successfull..."))
    .catch((err) => console.log(err));
    