const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://JobApp:jobapp@cluster0.dkoidso.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log('Database connection failed:', error));
