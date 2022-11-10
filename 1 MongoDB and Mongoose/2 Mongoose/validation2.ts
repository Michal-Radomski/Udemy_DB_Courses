import mongoose from "mongoose";

const url = "mongodb://localhost:27017";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => {
    console.log("connected to " + mongoose.connection.name);
  })
  .catch((err) => {
    console.log("cannot connect to " + mongoose.connection.name, { err });
  });

let schema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String },
  year: { type: Number, max: [2020, "illegal year value"], min: 1920 },
});

let Car = mongoose.model("Car", schema);

let doc = new Car({
  brand: "Lexus",
  model: "ES200",
  year: 2050,
});

doc.validate((err) => {
  console.log(err);
});

let result = doc.validateSync();
console.log(result!.errors.year.message);
