var file = require("./main.json");
var combinations = file.combinations;
var tech = file.techniques;
var gran = file.granularities;
var lang = file.language;

var pid = "P01";
var pCombination = combinations[pid];
var pT = pCombination.techniques;
var pG = pCombination.granularities;
var pL = pCombination.language;

for(var x = 0; x < 2; x++) {
	for(var y = 0; y < 3; y++) {
		for(var z = 0; z < 2; z++) {
			var options = [];
			options.technique = tech[pT[x]];
			options.granularity = gran[pG[y]];
			options.language = lang[pL[z]];
			options.data_file = "helloworld";
			options.stimuli = "this is stimuli";
			console.log(options);
		}
	}
}
