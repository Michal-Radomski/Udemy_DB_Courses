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
  brand: String,
  model: String,
  year: Number,
});

schema.pre("insertMany", function (next) {
  console.log("pre insertMany");
  console.log(this);
  next();
});

schema.post("insertMany", async function (param, next) {
  console.log("post insertMany");
  let results = await this.find();
  console.log({ results });
  console.log({ param });
  next();
});

let Car = mongoose.model("Car", schema);

Car.insertMany([
  { brand: "Toyota", model: "Camry", year: 2019 },
  { brand: "Nissan", model: "GT-R", year: 2018 },
  { brand: "Honda", model: "Civic", year: 2017 },
])
  .then((res) => console.log({ res }))
  .catch((err) => console.log({ err }));
