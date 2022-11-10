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

let schema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
    location: String,
  },
  { collection: "cars2" }
);

let Car = mongoose.model("Car", schema);

Car
  //.find()
  .where()
  .where("brand")
  .in(["Toyota", "Lexus"])
  .select("-_id -__v")
  .sort({ year: 1 })
  .count()
  .find()
  .exec((err: any, res: any) => {
    if (err) {
      console.log({ err });
    }
    console.log({ res });
  });
