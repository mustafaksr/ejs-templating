/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
 const LEARNING_RATE = 0.001;
 const OPTIMIZER = tf.train.sgd(LEARNING_RATE);
 var slider = document.getElementById("epoch");
 var output = document.getElementById("test");
 slider.oninput = function () {
   output.innerHTML = `epoch: ${this.value}`;
 };
 var slider2 = document.getElementById("slider2");
 var output2 = document.getElementById("batch-size");
 slider2.oninput = function () {
   output2.innerHTML = `batch size: ${this.value}`;
 };
 
 var elmOutput = document.getElementById("output");
 var elmInput = document.getElementById("input");
 
 var inputhtml = document.getElementById("intext");
 var outputhtml = document.getElementById("outtext");
 
 elmInput.oninput = function () {
   inputhtml.innerHTML = this.value;
 };
 
 var head = document.getElementById("h12");
 
 elmOutput.oninput = function () {
   outputhtml.innerHTML = this.value;
 };
 
 var predInput = document.getElementById("predict");
 
 var predhtml = document.getElementById("inTest");
 
 predInput.oninput = function () {
   predhtml.innerHTML = this.value;
 };
 
 // Display the default slider value
 function trainall() {
   var INPUTSs2 = [];
   var INPUTSs1 = [];
   for (let tt in inputhtml.innerText.split(",")) {
     INPUTSs2.push(parseFloat(inputhtml.innerText.split(",")[tt]));
   }
 
   var OUTPUTSs2 = [];
   for (let tt in outputhtml.innerText.split(",")) {
     OUTPUTSs2.push(parseFloat(outputhtml.innerText.split(",")[tt]));
   }
 
   var TestINPUTS = [];
   for (let yy in predhtml.innerText.split(",")) {
     TestINPUTS.push(parseFloat(predhtml.innerText.split(",")[yy]));
   }
 
   // Generate input numbers from 1 to 20 inclusive.
   var isCheck = document.getElementById("check");
 
   if (isCheck.checked != true) {
     var INPUTS = [];
     var INPUTS2 = [];
     var OUTPUTS = [];
 
     for (let n = -50; n <= 50; n++) {
       let m = Math.floor(Math.random() * 100) / 100;
       if (n > 0) {
         m = m;
       } else {
         m = m * -1;
       }
       // let n=Math.random();
       INPUTS.push(m);
       // INPUTS2.push(n);
       if (m > 0) {
         var labell = 1;
       } else {
         labell = 0;
       }
       OUTPUTS.push(labell);
     }
 
     // Generate Outputs that are simply each input multiplied by itself,
     // to generate some non linear data.
   } else {
     [INPUTS, INPUTS2, OUTPUTS] = [INPUTSs2, INPUTSs2, OUTPUTSs2];
   }
 
   // Input feature Array is 1 dimensional.
   const INPUTS_TENSOR = tf.tensor1d(INPUTS);
   console.log("A");
   INPUTS_TENSOR.print();
   // Output feature Array is 1 dimensional.
   const OUTPUTS_TENSOR = tf.tensor1d(OUTPUTS);
 
   // Function to take a Tensor and normalize values
   // with respect to each column of values contained in that Tensor.
   //   function normalize(tensor, min, max) {
   //     const result = tf.tidy(function () {
   //       // Find the minimum value contained in the Tensor.
   //       const MIN_VALUES = min || tf.min(tensor, 0);
 
   //       // Find the maximum value contained in the Tensor.
   //       const MAX_VALUES = max || tf.max(tensor, 0);
 
   //       // Now calculate subtract the MIN_VALUE from every value in the Tensor
   //       // And store the results in a new Tensor.
   //       const TENSOR_SUBTRACT_MIN_VALUE = tf.sub(tensor, MIN_VALUES);
 
   //       // Calculate the range size of possible values.
   //       const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);
 
   //       // Calculate the adjusted values divided by the range size as a new Tensor.
   //       const NORMALIZED_VALUES = tf.div(TENSOR_SUBTRACT_MIN_VALUE, RANGE_SIZE);
 
   //       // Return the important tensors.
   //       return { NORMALIZED_VALUES, MIN_VALUES, MAX_VALUES };
   //     });
   //     return result;
   //   }
 
   // Normalize all input feature arrays and then dispose of the original non normalized Tensors.
   //   const FEATURE_RESULTS = normalize(INPUTS);
   //   console.log("Normalized Values:");
   //   FEATURE_RESULTS.NORMALIZED_VALUES.print();
 
   //   console.log("Min Values:");
   //   FEATURE_RESULTS.MIN_VALUES.print();
 
   //   console.log("Max Values:");
   //   FEATURE_RESULTS.MAX_VALUES.print();
 
   //   INPUTS_TENSOR.dispose();
 
   // Now actually create and define model architecture.
   var model = tf.sequential();
   // We will use one dense layer with 20 neuron (units) and an input of
   // 1 input feature values.
   model.add(tf.layers.dense({ inputShape: [1], units: 5 }));
   // Add a new hidden layer with 5 neurons, and ReLU activation.
   // model.add(tf.layers.dense({ units: 10, activation: "relu" }));
   // Add another dense layer with 1 neuron that will be connected to the previous hidden layer.
   model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
 
   model.summary();
 
   // Choose a learning rate that is suitable for the data we are using.
   const LEARNING_RATE = 0.001;
   const OPTIMIZER = tf.train.adam(LEARNING_RATE);
 
   train();
 
   async function train() {
     // Compile the model with the defined learning rate and specify
     // our loss function to use.
     model.compile({
       optimizer: OPTIMIZER,
       loss: "binaryCrossentropy",
       metrics: ["acc"],
     });
     //
     // Finally do the training itself
     let results = await model.fit(INPUTS_TENSOR, OUTPUTS_TENSOR, {
       shuffle: false, // Ensure data is shuffled again before using each epoch.
       batchSize: parseInt(document.getElementById("slider2").value),
       epochs: parseInt(document.getElementById("epoch").value), // Go over the data 80 times!
       callbacks: { onEpochEnd: logProgress },
     });
     // Go over the data 80 times!
 
     // Update the current slider value (each time you drag the slider handle)
 
     OUTPUTS_TENSOR.dispose();
     // FEATURE_RESULTS.NORMALIZED_VALUES.dispose();
 
     console.log(
       "Final Average error loss: " +
         Math.sqrt(results.history.loss[results.history.loss.length - 1])
     );
 
     // Once trained we can evaluate the model.
     evaluate();
 
     var AA = [];
     var BB = [];
     var mae = [];
     for (let i = 0; results.history.loss.length > i; i++) {
       var d = parseFloat(results.history.loss[i].toFixed(2));
       AA[i] = d;
       BB[i] = i;
 
       var eee = parseFloat(results.history.acc[i].toFixed(2));
       mae[i] = eee;
     }
 
     // // var result = {};
     // // BB.forEach((key, i) => result[key] = AA[i]);
     // // console.log(result);
 
     const CC = Array(results.history.loss.length).fill("x");
     const DD = Array(results.history.loss.length).fill("y");
 
     var result = [];
     BB.forEach(
       (key, i) =>
         (result[key] = JSON.parse(`{"${CC[i]}":${BB[i]},"${DD[i]}":${AA[i]}}`))
     );
     console.log(result);
 
     var result2 = [];
     BB.forEach(
       (key, i) =>
         (result2[key] = JSON.parse(
           `{"${CC[i]}":${BB[i]},"${DD[i]}":${mae[i]}}`
         ))
     );
 
     // #visualization
 
     const series1 = result;
     const series2 = result2;
     console.log(result2);
     const series = ["loss", "acc"];
     const data = { values: [series1, series2], series };
     const surface = document.getElementById("myCanvas");
     tfvis.render.linechart(surface, data);
     console.log(INPUTS);
     console.log(OUTPUTS);
     var printIn = document.getElementById("in1");
     var printOut = document.getElementById("out1");
     printIn.innerText = `inputs: ${INPUTS}`;
     printOut.innerText = `inputs: ${OUTPUTS}`;
     predict();
   }
 
   function evaluate() {
     // Predict answer for a single piece of data.
     tf.tidy(function () {
       let newInput =
         // normalize(
         tf.tensor1d([7]);
       // ,
       // FEATURE_RESULTS.MIN_VALUES,
       // FEATURE_RESULTS.MAX_VALUES
       // )
       let output = model.predict(newInput);
       output.print();
     });
 
     // FEATURE_RESULTS.MIN_VALUES.dispose();
     // FEATURE_RESULTS.MAX_VALUES.dispose();
     // model.dispose();
   }
   console.log(TestINPUTS);
   function predict() {
     // Predict answer for a single piece of data.
     tf.tidy(function () {
       // let newInput2 = normalize(
       //   tf.tensor1d(TestINPUTS),
       //   tf.min(TestINPUTS),
       //   tf.max(TestINPUTS)
       // );
 
       let output = model.predict(tf.tensor1d(TestINPUTS));
       output.print();
       var predtext = document.getElementById("predictText");
       predtext.innerText = `predictions: ${output}`;
       let AA = tf.add(
         tf.scalar(0),
         tf.mul(tf.scalar(1), tf.tensor1d(TestINPUTS))
       );
       AA.print();
 
       var exptext = document.getElementById("expectedText");
       // exptext.innerText = `expected results: ${AA}`;
     });
     // FEATURE_RESULTS.MIN_VALUES.dispose();
     // FEATURE_RESULTS.MAX_VALUES.dispose();
     model.dispose();
   }
 }
 
 //trainall end
 
 function logProgress(epoch, logs) {
   console.log("Data for epoch " + epoch, Math.sqrt(logs.loss));
   const element = document.getElementById("text-output");
   element.innerText = `epoch: ${epoch + 1}, loss(mse): ${logs.loss.toFixed(
     2
   )} `;
 
   //   var linemse = JSON.parse(`{"x":${epoch},"y":${logs.loss.toFixed(2)}}`)
 
   //   var linemae = JSON.parse(`{"x":${epoch},"y":${logs.mae.toFixed(2)}}`)
 
   //   var result= {};
   //   result[epoch] = linemse;
 
   //   var result2= {};
   //   result2[epoch] = linemae;
 
   // const series = ['MSE','MAE'];
   // const data = { values: [result,result2], series }
   // const surface = document.getElementById('myCanvas');
   // tfvis.render.linechart(surface, data);
 
   if (epoch == 70) {
     OPTIMIZER.setLearningRate(LEARNING_RATE / 2);
   }
 }
 let runb = document.getElementById("run");
 runb.addEventListener("click", myFun7);
 function myFun7() {
   trainall();
 }
 