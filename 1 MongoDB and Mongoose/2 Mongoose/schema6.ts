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
    brand: { type: String, required: true, default: "Default Brand" },
    model: { type: String },
    year: { type: Number },
  },
  {}
);

interface CustomDocument extends mongoose.Document {
  year: number;
}

schema.methods.instanceMtd = function () {
  console.log(this);
  if ((this as CustomDocument).year === new Date().getFullYear()) {
    console.log("New Car!");
  } else {
    console.log("NOT New Car!");
  }
};
// let Car = mongoose.model("Car", schema) as any;

// let doc = new Car({ brand: "Honda", model: "Civic", year: 2019 });
// doc.instanceMtd();

schema.statics.staticMtd = function () {
  this.find({}, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};
let Car = mongoose.model("Car", schema) as any;

// //schema.query

Car.staticMtd();
