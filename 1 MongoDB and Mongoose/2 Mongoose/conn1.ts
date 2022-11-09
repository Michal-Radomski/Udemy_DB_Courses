import mongoose from "mongoose";

const url = "mongodb://localhost:27017";

//* Second connection
// const arr_conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "arr" });
// console.log({ arr_conn });

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => {
    // console.log(mongoose.connections);
  })
  .catch((err) => {
    console.log(err);
  });

const schema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
  },
  { timestamps: true }
);

// const Car = mongoose.model("Car", schema); //* Name of collection: cars
const Car = mongoose.connection.useDb("test").model("Car", schema); //* Name of collection: cars
// console.log(mongoose.connection.modelNames());

Car.find({}, (err: string, resolve: Object) => {
  if (err) {
    console.log({ err });
  }
  console.log({ resolve });
});
