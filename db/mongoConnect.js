const mongoose = require('mongoose');
const { config } = require('../config/secret');
//connect to mongoDB
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(config.MONGO_URI);
  console.log('Connected to MongoDB');
}