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
    name: String,
    sales: Number,
    month: Number,
  },
  {}
);

let Sales = mongoose.model("Sales", schema);

// Sales.find({}).exec((err: string, resAll: Object) => {
//   if (err) throw err;
//   console.log({ resAll });
// });

Sales.aggregate([
  //{$match:{name:'Tom'}},
  { $project: { _id: 0, name: 1, sales: 1 } },
  { $group: { _id: "$name", avg_sales: { $avg: "$sales" }, total_sales: { $sum: "$sales" } } },
]).exec((err, resAgg) => {
  if (err) throw err;
  console.log({ resAgg });
});

Sales.aggregate()
  // .match({name:'Jerry'})
  .project({ _id: 0, name: 1, sales: 1 })
  .group({ _id: "$name", total_sales: { $sum: "$sales" }, avg_sales: { $avg: "$sales" } })
  // .exec((err,res)=>{
  //     if(err) throw err
  //     console.log(res)
  // })
  .then((success: Object) => {
    console.log(success);
  })
  .catch((err) => {
    console.log("Err:" + err);
  });
