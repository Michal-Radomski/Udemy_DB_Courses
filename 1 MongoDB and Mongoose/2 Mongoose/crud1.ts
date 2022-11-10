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

const schema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
  },
  { collection: "cars2" }
);

const Car = mongoose.model("Car", schema);

Car.create(
  [
    { brand: "Toyota", model: "Supra", year: 2019 },
    { brand: "Honda", model: "Civic", year: 2010 },
    { brand: "Nissan", model: "GT-R", year: 2019 },
  ],
  {}
)
  .then((res) => {
    console.log({ res });
  })
  .catch((err) => {
    console.log({ err });
  });
