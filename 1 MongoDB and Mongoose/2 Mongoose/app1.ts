import mongoose from "mongoose";
// console.log({ mongoose });

// mongoose.set("bufferCommands", false); //* With this app1 doesn't work
// const url = "mongodb://localhost:27017/test";
const url = "mongodb://localhost:27017";

const conn = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // user: "userName", //* User and password
    // pass: "password",
    dbName: "test",
  })
  .then(() => {
    // console.log(mongoose.connection);
  })
  .catch((err) => {
    console.log(err);
  });
// console.log({ conn });

const schema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
  },
  { timestamps: true }
);

// const Car = mongoose.model("Car", schema); //* Name of collection: cars
const Car = mongoose.connection.model("Car", schema); //* Name of collection: cars

// const doc = new Car({ brand: "Toyota", model: "Supra", year: 2010 });

// console.log({ doc });

// doc.save((err: string, resolve: Object) => {
//   if (err) {
//     throw err;
//   }
//   console.log("new doc. inserted!");
//   console.log(resolve);
// });

Car.find({}, (err: string, resolve: Object) => {
  if (err) {
    console.log({ err });
  }
  console.log({ resolve });
});
