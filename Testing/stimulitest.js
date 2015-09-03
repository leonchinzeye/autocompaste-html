var _ = require('lodash');
var stimuli = require("../data/stimuli.json")

var english = stimuli.english;

var val = _.shuffle(english.paragraph);
// console.log(val);
console.log(english);