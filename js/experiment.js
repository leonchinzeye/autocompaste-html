// path variables
var latArticlePath = "./data/articles/latin_data.json"
var engArticlePath = "./data/articles/english_data.json"

// trial variables
var trialsData;
var currentTrial;
var totalNumberOfTrials;
var trialHeaders = ['Participant id', 'Technique', 'Granularity', 'Language',
  'Trial no', 'Stimuli', 'User Response', 'Trial Start Time',
  'Trial End Time', 'Trial Time', 'Accuracy'];
var trialResults = [];
var pid;

// block variables
var overallResults = [];
var currentCondition;
var totalNumberOfBlocks = 3;
var totalNumberOfConditions = 108;
var conditionsPerBlock = 36;
var blockNum;
var participantArrangement = {
  "technique": [],
  "granularity": [],
  "language": []
}
var overallHeaders = ['Participant id', 'Technique', 'Granularity', 'Language',
  'Block no', 'Condition no', 'Stimuli', 'User Response', 'Trial Start Time',
  'Trial End Time', 'Trial Time', 'Accuracy'];

// stimuli storage
var engParaStimA; var engParaStimT; var engParaCountA = 0; var engParaCountT = 0;
var engSentStimA; var engSentStimT; var engSentCountA = 0; var engSentCountT = 0;
var engPhraStimA; var engPhraStimT; var engPhraCountA = 0; var engPhraCountT = 0;
var latParaStimA; var latParaStimT; var latParaCountA = 0; var latParaCountT = 0;
var latSentStimA; var latSentStimT; var latSentCountA = 0; var latSentCountT = 0;
var latPhraStimA; var latPhraStimT; var latPhraCountA = 0; var latPhraCountT = 0;

// flags
var isTransition;
var isTrial;
var isBlocks;
var isBreak;
var isEnd;

function next() {
  checkIfBlocksAreDone();

  if (isTrial) {
    showTrials();
  }

  if (isTransition) {
    showTransition();
  }

  if (isBreak) {
    showBreak();
  }

  if (isBlocks) {
    showBlocks();
  }

  if (isEnd) {
    showEnd();
  }
}

function checkIfBlocksAreDone() {
  if (blockNum >= totalNumberOfBlocks) {
    isBlocks = false;
    isBreak = false;
    isEnd = true;
  }
}

function showBlocks() {
  if (currentCondition !== 0) {
    var result = ACPToolKit.getCurrentTrialState();

    var technique = result.technique;
    var granularity = result.granularity;
    var language = result.language;
    var conditionNum = currentCondition;
    var stimuli = result.stimuli;
    var userResponse = result.user_response;
    var trialStartTime = result.start_time;
    var trialEndTime = result.end_time;
    var trialDuration = result.duration;
    var accuracy = stimuli === userResponse ? 1 : 0;

    var row = [pid, technique, granularity, language, blockNum,
      conditionNum, stimuli, userResponse, trialStartTime,
      trialEndTime, trialDuration, accuracy];
    overallResults.push(row);
  }

  if (currentCondition < conditionsPerBlock) {
    ACPToolKit.presentTrial(createOptions());
    currentCondition += 1;
    $('.js-expt-current-trial').text(currentCondition);
  } else {
    blockNum += 1;
    isBlocks = false;
    isBreak = true;
    next();
  }
}

function createOptions() {
  console.log("I got here");
  var options = [];
  var reference = currentCondition % 36;
  var tech = participantArrangement.technique[reference];
  var gran = participantArrangement.granularity[reference];
  var lang = participantArrangement.language[reference];
  var stimuli;
  var path;

  if (lang === "English") {
    path = engArticlePath;
  } else {
    path = latArticlePath;
  }

  if (tech === "AUTOCOMPASTE") {
    if (gran === "phrase") {
      if (lang === "English") {
        stimuli = engPhraStimA[engPhraCountA];
        engPhraCountA += 1;
      } else {
        stimuli = latPhraStimA[latPhraCountA];
        latPhraCountA += 1;
      }
    } else if (gran === "sentence") {
      if (lang === "English") {
        stimuli = engSentStimA[engSentCountA];
        engSentCountA += 1;
      } else {
        stimuli = latSentStimA[latSentCountA];
        latSentCountA += 1;
      }
    } else {
      if (lang === "English") {
        stimuli = engParaStimA[engParaCountA];
        engParaCountA += 1;
      } else {
        stimuli = latParaStimA[latParaCountA];
        latParaCountA += 1;
      }
    }
  } else {
    if (gran === "phrase") {
      if (lang === "English") {
        stimuli = engPhraStimT[engPhraCountT];
        engPhraCountT += 1;
      } else {
        stimuli = latPhraStimT[latPhraCountT];
        latPhraCountT += 1;
      }
    } else if (gran === "sentence") {
      if (lang === "English") {
        stimuli = engSentStimT[engSentCountT];
        engSentCountT += 1;
      } else {
        stimuli = latSentStimT[latSentCountT];
        latSentCountT += 1;
      }
    } else {
      if (lang === "English") {
        stimuli = engParaStimT[engParaCountT];
        engParaCountT += 1;
      } else {
        stimuli = latParaStimT[latParaCountT];
        latParaCountT += 1;
      }
    }
  }

  options.technique = tech;
  options.granularity = gran;
  options.language = lang;
  options.stimuli = stimuli;
  options.data_file = path;

  return options;
}

function showTrials() {
  if (currentTrial !== 0) {
    var trialResult = ACPToolKit.getCurrentTrialState();

    var technique = trialResult.technique;
    var granularity = trialResult.granularity;
    var language = trialResult.language;
    var trialNum = currentTrial;
    var stimuli = trialResult.stimuli;
    var userResponse = trialResult.user_response;
    var trialStartTime = trialResult.start_time;
    var trialEndTime = trialResult.end_time;
    var trialDuration = trialResult.duration;
    var accuracy = stimuli === userResponse ? 1 : 0;

    var row = [pid, technique, granularity, language, trialNum,
      stimuli, userResponse, trialStartTime,
      trialEndTime, trialDuration, accuracy];
    trialResults.push(row);
  }

  if (currentTrial < totalNumberOfTrials) {
    ACPToolKit.presentTrial(trialsData[currentTrial]);
    currentTrial += 1;
    $('.js-expt-current-trial').text(currentTrial);
  } else {
    // Last trial completed
    ACPToolKit.downloadTrialResults(trialResults);
    isTrial = false;
    isTransition = true;
    next();
    // window.location = 'questionnaire-post.html';
  }
}

function showEnd() {
  $('#endModal').modal({
    backdrop: 'static',
    keyboard: false
  })
}

function showTransition() {
  $('#transitionModal').modal({
    backdrop: 'static',
    keyboard: false
  });
}

function showBreak() {
  $('#breakModal').modal({
    backdrop: 'static',
    keyboard: false
  });
}

function breakContinue() {
  isBreak = false;
  isBlocks = true;
  currentCondition = 0;
  next();
}

function continueToBlocks() {
  isTransition = false;
  isBlocks = true;
  $('.js-expt-num-trials').text("36");
  next();
}

function end() {
  ACPToolKit.downloadOverallResults(overallResults);
  window.location = 'questionnaire-post.html';
}

function initFlags() {
  isTransition = false;
  isBlocks = false;
  isTrial = true;
  isBreak = false;
  isEnd = false;
}

function initBlocks() {
  initParticipantArrangement();
  blockNum = 0;
  currentCondition = 0;

  $.get('data/stimuli.json', function (stimuliFile) {
    stimuliFile = getJson(stimuliFile);

    engParaStimA = _.shuffle(stimuliFile.english.paragraph);
    engSentStimA = _.shuffle(stimuliFile.english.sentence);
    engPhraStimA = _.shuffle(stimuliFile.english.phrase);

    latParaStimA = _.shuffle(stimuliFile.latin.paragraph);
    latSentStimA = _.shuffle(stimuliFile.latin.sentence);
    latPhraStimA = _.shuffle(stimuliFile.latin.phrase);

    engParaStimT = _.shuffle(engParaStimA);
    engSentStimT = _.shuffle(engSentStimA);
    engPhraStimT = _.shuffle(engPhraStimA);

    latParaStimT = _.shuffle(latParaStimA);
    latSentStimT = _.shuffle(latSentStimA);
    latPhraStimT = _.shuffle(latPhraStimA);
  })
}

function getJson(data) {
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  return data;
}

function initParticipantArrangement() {
  $.get('data/combinations.json', function (arrFile) {
    arrFile = getJson(arrFile);

    var tech = arrFile.techniques;
    var gran = arrFile.granularities;
    var lang = arrFile.language;
    var arrange = arrFile.combinations[pid];
    var arrangeT = arrange.techniques;
    var arrangeG = arrange.granularities;
    var arrangeL = arrange.language;

    for (var x = 0; x < 3; x++) {
      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 2; k++) {
            participantArrangement.technique.push(tech[arrangeT[i]]);
            participantArrangement.granularity.push(gran[arrangeG[j]]);
            participantArrangement.language.push(lang[arrangeL[k]]);
          }
        }
      }
    }
  });
}

$(document).ready(function () {
  $.get('data/experiments.json', function (data) {
    // Hosting server doesn't parse the json objects properly
    // this if is for checking the data type
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    trialsData = data.experiments;
    currentTrial = 0;
    totalNumberOfTrials = trialsData.length;
    $('.js-expt-num-trials').text(totalNumberOfTrials);
    trialResults.push(trialHeaders);
    overallResults.push(overallHeaders);
    showTrials();
    pid = ACPToolKit.getCurrentParticipantId();

    initFlags();
    initBlocks();
  })
});