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
  year: {
    type: Number,
  },
});

schema.path("year").validate(
  function (v: number) {
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
  year: 2020,
});

let result = doc.validateSync() as any;
if (result) {
  console.log(result.message);
  console.log(result.errors.year.properties);
} else {
  console.log("validation passed");
}
