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

const schema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String },
  year: { type: Number, max: [2020, "illegal year value"], min: 1920 },
});

schema.pre("save", function (next) {
  console.log(this); //* This = this.document
  console.log("pre save");
  next(); //* No parameters here
});

schema.post("save", function (param, next) {
  console.log("post save");
  console.log(param === this);
  console.log({ param });
  next();
});

let Car = mongoose.model("Car", schema);

let doc = new Car({
  brand: "mazda",
  model: "MX5",
  year: 2015,
});

doc.save((err, res) => {
  if (err) {
    console.log("something is wrong, cannot save doc.");
  } else {
    console.log("new doc. saved!");
    console.log({ res });
  }
});
