// TODO: fixing adj-adj-noun patterns such as tall-small-chair

// timeline that sets the experiment
var timeline = [];

// introduction where the experimenter learns what he or she can and cannot do
var intro = {
  type: 'instructions',
  // configure if you want to change how the instructions are presented
  pages: [
    'Welcome to the experiment. Click next to begin.',
    'This is just placeholder text that will explain the directions later',
    'This is the final instructions page. click next to begin experiment.'
  ],
  show_clickable_nav: true,
  post_trial_gap: 100
}

// creating and pushing the (adj -> adj -> noun) trial blocks into the timeline
var all_trials = [];

// adding int-int-noun
all_trials = all_trials.concat(doubleIntNoun(3));
// adding sub-sub-noun
all_trials = all_trials.concat(doubleSubNoun(3));
// adding sub-int-noun
all_trials = all_trials.concat(subIntNoun(3));

//randomization of the 3 types of blocks
//all_trials = jsPsych.randomization.repeat(all_trials,1);

// combine all the trials in order for experiment to function
timeline.push(intro);
timeline = timeline.concat(all_trials);

/* 
 * testing to see whether or not the timeline is functioning and data
 * is also working. 
 */
jsPsych.init({timeline: timeline, 
  show_progress_bar: true,
  on_finish: function(){
    jsPsych.data.displayData();
  }
});

// start the experiment and then when finished updates data
/*
jsPsych.init({
timeline: timeline,
on_finish: function() {
  jsPsych.data.addProperties({"rand_id": id});
  $.ajax({
    type:'post',
    cache: false,
    url: "save_data.php",
    data: {filename: id + ".csv", filedata: jsPsych.data.dataAsCSV()}
  });
  $.ajax({
    type:'post',
    cache: false,
    url: "save_data.php",
    data: {filename: id + ".json", filedata: jsPsych.data.dataAsJSON()}
  });
  $(".jspsych-display-element").html("The results have been recorded! Data was recorded under the subject ID: <b>" + id + "</b>");
}
});
*/
