import mongoose, { Document } from "mongoose";

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

const schema = new mongoose.Schema(
  {
    reg_date: Date,
  },
  { timestamps: true }
);

console.log(schema.path("reg_date"));

const Reg_date = mongoose.model("Reg_date", schema);

const doc = new Reg_date({
  reg_date: new Date(),
});
console.log(doc);
doc.save((err, res) => {
  if (err) throw err;
  console.log(res);
});

interface CustomDocument extends Document {
  reg_date: { setDate: (arg0: any) => void; getDate: () => number };
}

Reg_date.findOne((err: string, doc: CustomDocument) => {
  if (err) {
    throw err;
  }
  console.log({ doc });
  doc.reg_date.setDate(doc.reg_date.getDate() + 1);
  console.log(doc);
  doc.markModified("reg_date");
  doc.save((err, res) => {
    if (err) {
      throw err;
    }
    console.log({ res });
  });
});
