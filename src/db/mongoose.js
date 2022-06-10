require("dotenv").config();

MONGODB_URI ="mongodb+srv://saidinesh898:9962341414@aws-mum-cluster.hvt8w.mongodb.net/task-manager-api";

const mongoose = require("mongoose");
try {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  });
} catch (e) {
  console.log("Error connecting to database", e);
}
