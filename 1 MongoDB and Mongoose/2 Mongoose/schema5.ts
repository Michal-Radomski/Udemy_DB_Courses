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
    //_id:Number,
    brand: String,
    model: String,
    year: { type: Number, index: true },
  },
  {
    // autoCreate: false, //* Create new collection - default false
    // autoIndex: false,
    // _id: true,
    // id: false,
    collection: "my_car",
  }
);

let Car = mongoose.model("Car", schema);

let doc = new Car({ brand: "Nissan", model: "GT-R", year: 2010 });
console.log(doc.id);

doc.save((err, res) => {
  if (err) throw err;
  console.log(res);
});
