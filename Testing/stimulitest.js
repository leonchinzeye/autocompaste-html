var _ = require('lodash');
var stimuli = require("../data/stimuli.json")

var english = stimuli.english;
var latin = stimuli.latin;

// console.log(val);
// console.log(latin);
// console.log("\n\n\n\n");

// var latParaData = latin.paragraph;
// var latSentData = latin.sentence;
// var latPhraData = latin.phrase;

// latParaData = _.shuffle(latParaData);
// latSentData = _.shuffle(latSentData);
// latPhraData = _.shuffle(latPhraData);

// console.log(latParaData.length);
// console.log(latSentData.length);
// console.log(latPhraData.length);

var engParaData = english.paragraph;
var engSentData = english.sentence;
var engPhraData = english.phrase;

console.log(engParaData.length);
console.log(engSentData.length);
console.log(engPhraData.length);