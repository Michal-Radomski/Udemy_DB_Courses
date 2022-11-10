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

let schema_product = new mongoose.Schema(
  {
    _id: Number,
    price: Number,
    rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rating2" },
  },
  {}
);

let schema_rating = new mongoose.Schema(
  {
    rating: [Number],
  },
  {}
);

let Product2 = mongoose.model("Product2", schema_product);
let Rating2 = mongoose.model("Rating2", schema_rating);

let r_doc = new Rating2({});
let p_doc = new Product2({
  _id: 100,
  price: 25000,
  rating: r_doc._id,
});

// r_doc.save();
// p_doc.save();

Product2.findOne({ _id: 100 })
  .populate({ path: "rating", select: "-_id rating" })
  .exec((err: string, doc: { rating: { rating: number } }) => {
    if (err) throw err;
    console.log(doc);
    console.log(doc.rating.rating);
  });

Product2.findOne({ _id: 100 }, (err: string, doc: { rating: number }) => {
  Rating2.updateOne({ _id: doc.rating }, { $push: { rating: { $each: [4.5, 4.6, 4.9] } } }).exec(
    (err: string, res: Object) => {
      if (err) throw err;
      console.log(res);
    }
  );
});
