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
    max: [new Date().getFullYear(), "Path `{PATH}` value ({VALUE}) cannot be bigger than {MAX}"],
    min: [new Date().getFullYear() - 100, "Path `{PATH}` value ({VALUE}) cannot be smaller than {MIN}"],
  },
});

let Car = mongoose.model("Car", schema);

let doc = new Car({
  brand: "Lexus",
  model: "ES200",
  year: 2025,
});

let result = doc.validateSync() as any;
if (result) {
  console.log(result.errors.year.properties);
} else {
  console.log("validation passed");
}
