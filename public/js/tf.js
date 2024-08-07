const MODEL_JSON_URL =
  "model/model.json";
var education_json = {
  "hs-grad": 0,
  "assoc-voc": 1,
  bachelors: 2,
  "assoc-acdm": 3,
  "some-college": 4,
  "9th": 5,
  "10th": 6,
  "11th": 7,
  "12th": 8,
  "1st-4th": 9,
  "5th-6th": 10,
  "7th-8th": 11,
  masters: 12,
  doctorate: 13,
  preschool: 14,
  "prof-school": 15,
};

var relation_json = {
  husband: 0,
  wife: 1,
  "other-relative": 2,
  "own-child": 3,
  unmarried: 4,
  "not-in-family": 5,
};

var mean = tf.tensor1d([
  1.8993159e5, 1.06606177e3, 8.70119779e1, 4.04799985e1, 4.03485872e-1,
  2.56257678e-1, 2.98679361e-2, 1.56595516e-1, 1.06342138e-1, 4.745086e-2,
  2.83707002e-2, 3.58952703e-2, 1.32831695e-2, 5.0291769e-3, 1.03654791e-2,
  2.00399263e-2, 1.6085688e-2, 3.24785012e-2, 4.24984644e-2, 1.62929975e-1,
  1.31296069e-2, 3.2290387e-1, 5.39772727e-2, 1.49723587e-3, 1.78900491e-2,
  2.23625614e-1,
]);
var std = tf.tensor1d([
  1.05075286e5, 7.31982522e3, 4.02748176e2, 1.22979955e1, 4.90596599e-1,
  4.3656578e-1, 1.7022292e-1, 3.63418987e-1, 3.08275019e-1, 2.12601213e-1,
  1.66029526e-1, 1.8602903e-1, 1.14484614e-1, 7.07381388e-2, 1.01281963e-1,
  1.40136818e-1, 1.25805161e-1, 1.77267166e-1, 2.01723437e-1, 3.69301772e-1,
  1.13829787e-1, 4.67586314e-1, 2.25972845e-1, 3.86651543e-2, 1.32551859e-1,
  4.16673972e-1,
]);
var slider = document.getElementById("fws");
var output = document.getElementById("fw");
slider.oninput = function () {
  output.innerHTML = `functional_weight: ${this.value}`;
};

var slider2 = document.getElementById("cgs");
var output2 = document.getElementById("cg");
slider2.oninput = function () {
  output2.innerHTML = `capital_gain: ${this.value}`;
};

var slider3 = document.getElementById("cls");
var output3 = document.getElementById("cl");
slider3.oninput = function () {
  output3.innerHTML = `capital_loss: ${this.value}`;
};

var slider4 = document.getElementById("hpws");
var output4 = document.getElementById("hpw");
slider4.oninput = function () {
  output4.innerHTML = `hours_per_week: ${this.value}`;
};

var model = undefined;

async function loadAndPredict() {
  var relation_array = [0, 0, 0, 0, 0, 0];
  var education_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var relation_opt = document.getElementById("relationship").value;
  relation_array[relation_json[relation_opt]] = 1;

  var education_opt = document.getElementById("education").value;
  education_array[education_json[education_opt]] = 1;

  var INPUTSs1 = [];

  var sldinput = `${document.getElementById("fws").value},${
    document.getElementById("cgs").value
  },${document.getElementById("cls").value},${
    document.getElementById("hpws").value
  }`;
  console.log(sldinput);
  console.log(sldinput.split(","));
  console.log(INPUTSs1.length);
  if (INPUTSs1.length == 0) {
    console.log("yes");
    INPUTSs1 = [];
    for (let tt2 in sldinput.split(",")) {
      INPUTSs1.push(parseFloat(sldinput.split(",")[tt2]));
    }
  }

  console.log(INPUTSs1, "2");
  if (model === undefined) {
    model = await tf.loadLayersModel(MODEL_JSON_URL);
  }
  INPUTSs1 = INPUTSs1.concat(relation_array, education_array);
  console.log(INPUTSs1, "3");

  console.log(model.summary());
  let results = model.predict(tf.tensor2d([INPUTSs1]).sub(mean).div(std));

  let results2 = results.dataSync()[0];
  console.log(results2);
  let bool = results2 >= 0.5;

  if (bool == true) {
    document.getElementById("result_text").style.color = "green";
    document.getElementById("result_text2").style.color = "green";
    document.getElementById(
      "result_text2"
    ).innerText = `greater than\nprob. : ${
      Math.floor(results2 * 1000) / 1000
    }`;
    document.getElementById("result_text").innerText = "income >= 50k";
  } else {
    document.getElementById("result_text").style.color = "red";
    document.getElementById("result_text2").style.color = "red";
    document.getElementById("result_text2").innerText = `less than\nprob. : ${
      Math.floor(results2 * 1000) / 1000
    }`;
    document.getElementById("result_text").innerText = "income < 50k";
  }

  console.log(bool);
}
let runb = document.getElementById("run");
runb.addEventListener("click", myFun7);
function myFun7() {
  loadAndPredict();
}

