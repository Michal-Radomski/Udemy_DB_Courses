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
    brand: { type: String, required: true },
    model: { type: String },
    year: {
      type: Number,
      validate: {
        validator: function (v: number) {
          let maxYear = new Date().getFullYear();
          let minYear = maxYear - 100;
          if (v > maxYear || v < minYear) return false;
        },
        message: function (prop) {
          return prop.path + " value (" + prop.value + ") is illegal.";
        },
      },
    },
  },
  { discriminatorKey: "expanded_constructor" }
);

let expanded_schema = new mongoose.Schema({
  owner: String,
});

schema.pre("save", function (next) {
  console.log("schema pre save");
  next();
});

expanded_schema.pre("save", function (next) {
  console.log("expanded schema pre save");
  next();
});

const Car = mongoose.model("Car", schema);

const Car_Owner = Car.discriminator("Car_Owner", expanded_schema);

new Car_Owner({ brand: "Toyota", model: "Supra", year: 2021, owner: "me" }).save(function (err, res) {
  if (err) throw err;
  console.log(res);
});
