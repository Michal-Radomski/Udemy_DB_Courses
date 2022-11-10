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
  { collection: "cars2", timestamps: true }
);

let Car = mongoose.model("Car", schema);

// Car.findOne({ brand: "Honda" }, (err: string, doc: mongoose.Document) => {
//   if (err) throw err;
//   // @ts-ignore
//   doc.model = "New Pilot";
//   doc.save((err, res) => {
//     if (err) throw err;
//     console.log({ res });
//   });
// });

// Car.updateMany({ brand: "Honda" }, { $set: { location: "Newcastle" } })
//   .then((res: Object) => {
//     console.log({ res });
//   })
//   .catch((err: string) => {
//     console.log(err);
//   });

const result = Car.deleteOne({ brand: "Nissan" }).exec(); //* Callback or exec must be!
console.log({ result }); //* Promise { <pending> } } -> better callback!!
