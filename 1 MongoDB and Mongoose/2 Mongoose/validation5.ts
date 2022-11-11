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
  year: { type: Number },
});

schema.path("year").validate(
  function (this: Object, v: number) {
    console.log(this);
    let maxYear = new Date().getFullYear();
    let minYear = maxYear - 100;
    if (v > maxYear || v < minYear) return false;
  },
  // @ts-ignore
  function (prop: { path: string; value: string }) {
    return prop.path + " value (" + prop.value + ") is illegal.";
  }
); //"{PATH} value ({VALUE}) is illegal."

let Car = mongoose.model("Car", schema);

let doc = new Car({
  brand: "Lexus",
  model: "ES200",
  year: 2030,
});

let result = doc.validateSync();
if (result) {
  console.log(result.message);
} else {
  console.log("validation passed");
}

// doc.save({ validateBeforeSave: true }, (err, res) => {
//   //* Default is true
//   if (err) console.log("CANNOT save doc: " + err.message);
//   console.log(res);
// });

Car.updateOne(
  {},
  { $set: { year: 2020 } },
  {
    runValidators: true,
    context: "query",
  },
  (err, res) => {
    if (err) console.log(err.message);
    console.log(res);
  }
);
