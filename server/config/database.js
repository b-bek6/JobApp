const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
// mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log('Database connection failed:', error));
