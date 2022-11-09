const list = ["Apple", ["Banana", "Cranberry"], "Durian"];

const [one, [two, three], four = "default value"] = list;

console.log({ one, two, three, four });

const obj = {
  fruit: "Banana",
  vegetable: "Bean",
  diary: "Cheese",
};

const { fruit, vegetable, diary = "default value" } = obj;
console.log({ fruit, vegetable, diary });

const info = {
  firstName: "Michal",
  address: {
    city: "Gdansk",
    street: "Olsztyn",
  },
};

const {
  firstName,
  address: { city, street },
} = info;
console.log({ firstName, city, street });

let num = -123;
let { abs: absoluteValue } = Math;
console.log(absoluteValue(num));
