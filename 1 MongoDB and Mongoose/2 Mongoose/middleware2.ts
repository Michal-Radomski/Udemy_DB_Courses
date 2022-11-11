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

schema.pre("find", function (next) {
  console.log("pre find");
  this.getQuery().brand = "Toyota";
  next();
});

schema.post("find", function (param, next) {
  console.log("post find");
  console.log(this == param);
  console.log({ next });
});

let Car = mongoose.model("Car", schema);

Car.find({ brand: "Toyota" }, { _id: 0 }).exec((err: string, res: Object) => {
  if (err) {
    console.log("cannot retrieve documents.");
  } else {
    console.log("Documents retrieved: " + res);
  }
});
