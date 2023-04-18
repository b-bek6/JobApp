const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/jobapp')
  .then(() => console.log('Database Connected'));
