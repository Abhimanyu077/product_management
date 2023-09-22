const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => {
    console.log("error in connection  with database", err);
  });
