// TODO: import data to the server and make sure LCL works

// timeline that sets the experiment
var timeline = [];

// introduction where the experimenter learns what he or she can and cannot do
var intro = {
  type: 'instructions',
  // configure if you want to change how the instructions are presented
  pages: [
    'Welcome to the experiment. Click next to begin.',
    '<strong>Read the following instructions carefully.</strong><p>You will be given two similar, but distinct, phrases.</p> <p>You will then be asked to determine which phrase sounds more natural.</p> <p>You should decide based on how you would naturally speak.</p> ',
    'This is the final instructions page. Click next to begin the experiment.'
  ],
  show_clickable_nav: true
}

// creating and pushing the (adj -> adj -> noun) trial blocks into the timeline
var all_trials = [];

// adding int-int-noun
all_trials = all_trials.concat(doubleIntNoun(1));
// adding sub-sub-noun
all_trials = all_trials.concat(doubleSubNoun(1));
// adding sub-int-noun
all_trials = all_trials.concat(subIntNoun(1));

//randomization of the 3 types of blocks
all_trials = jsPsych.randomization.repeat(all_trials,1);

// combine all the trials in order for experiment to function
timeline.push(intro);
timeline = timeline.concat(all_trials);

// start the experiment and then when finished updates data
id = jsPsych.randomization.randomID(4);
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    $.ajax({
      type:'post',
      cache: false,
      url: "save_data.php",
      data: {filename: id + ".csv", filedata: jsPsych.data.get().csv()}
    });
    $.ajax({
      type:'post',
      cache: false,
      url: "save_data.php",
      data: {filename: id + ".json", filedata: jsPsych.data.get().json()}
    });
    $(".jspsych-display-element").html("The results have been recorded! Data was recorded under the subject ID: <b>" + id + "</b>");
  }
});