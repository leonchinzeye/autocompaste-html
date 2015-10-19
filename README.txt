The experiment can be found on 
http://leonchinzeye.com/autocompaste-html/index.html

Index.html
- In this page, the part that was changed was the text

Questionnaire-pre.html
- Old questions were replaced with the existing questions.
- Form does a check to see if the questions have been filled in before moving on to the next.

Instructions.html
- Instructions with images have been added

Experiment.html
- the original script in the html file has been extracted into a new file called 
  experiment.js
  
js/experiment.js
- contains the original script with addition of the logic that is used to carry out the blocks.
- pulls data from the JSON file that contains the stimuli. 
- the same set of stimuli will be used for both ACP and traditional. However, the order of appearance
  will be randomized

data/stimuli.json
- contains the stimuli based on the granularity and the language.

data/combinations.json
- contains the participant combinations corresponding to the fully counter-balanced conditions

data/articles/english_data.json and data/articles/latin_data.json
- contains the path to the new text files

image folder
- contains images used for the instructions page