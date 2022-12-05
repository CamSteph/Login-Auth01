const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // mongoose.set('useNewUrlParser', true);
  // mongoose.set('useUnifiedTopology', true);

  try {
    mongoose.connect(process.env.MONGO_DB_URL, connectionParams);
    console.log(`Connected to database successfully`);
  } catch (error) {
    console.log(`Could not connect to database: `, error);
  }
}