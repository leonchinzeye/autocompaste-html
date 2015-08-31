// trial variables
var trialsData;
var currentTrial;
var totalNumberOfTrials;
var trialHeaders = ['Participant id', 'Technique', 'Granularity',
                'Trial no', 'Stimuli', 'User Response', 'Trial Start Time',
                'Trial End Time', 'Trial Time', 'Accuracy'];
var trialData = [];
var pid;

// block variables

// flags
var isTransition;
var isTrial;
var isBlocks;

function next() {
    if(isTrial) {
        showTrials();
    } 
    
    if(isTransition) {
        showTransition();
    }
    
    if(isBlocks) {
        showBlocks();
    }
}

function showTrials () {
    if (currentTrial !== 0) {
        var trialResult = ACPToolKit.getCurrentTrialState();

        var technique = trialResult.technique;
        var granularity = trialResult.granularity;
        var trialNum = currentTrial;
        var stimuli = trialResult.stimuli;
        var userResponse = trialResult.user_response;
        var trialStartTime = trialResult.start_time;
        var trialEndTime = trialResult.end_time;
        var trialDuration = trialResult.duration;
        var accuracy = stimuli === userResponse ? 1 : 0;

        var row = [pid, technique, granularity, trialNum,
                    stimuli, userResponse, trialStartTime,
                    trialEndTime, trialDuration, accuracy];
        trialData.push(row);
    }

    if (currentTrial < totalNumberOfTrials) {
        ACPToolKit.presentTrial(trialsData[currentTrial]);
        currentTrial += 1;
        $('.js-expt-current-trial').text(currentTrial);
    } else {
        // Last trial completed
        ACPToolKit.downloadTrialResults(trialData);
        isTrial = false;
        isTransition = true;
        next();
        // window.location = 'questionnaire-post.html';
    }
}

function showTransition() {
    $('#transitionModal').modal({
        backdrop : 'static',
        keyboard : false
    });
    isTransition = false;
    isBlocks = true;
}

function showBlocks() {
    
}

function initFlags() {
    isTransition = false;
    isBlocks = false;
    isTrial = true;
}

$(document).ready(function () {
    $.get('data/experiments.json', function (data) {
        // Hosting server doesn't parse the json objects properly
        // this if is for checking the data type
        if(typeof data === 'string') {
            data = JSON.parse(data);
        }
        
        initFlags();
        
        trialsData = data.experiments;
        currentTrial = 0;
        totalNumberOfTrials = trialsData.length;
        $('.js-expt-num-trials').text(totalNumberOfTrials);
        trialData.push(trialHeaders);
        showTrials();
        pid = ACPToolKit.getCurrentParticipantId();
    })
});