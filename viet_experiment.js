// TODO: convert this project into viet language

// timeline that sets the experiment
var timeline = [];

// introduction where the experimenter learns what he or she can and cannot do
var intro = {
  type: 'instructions',
  // configure if you want to change how the instructions are presented
  pages: [
    'Chào mừng quý vị đến với thí nghiệm. Vui lòng nhấn “next” để bắt đầu.',
    '<strong>Quý vị hãy đọc các câu hướng dẫn cho thật kỹ trước khi trả lời.</strong><p> Quý vị sẽ được cung cấp hai cụm từ tương tự, nhưng khác biệt.</p> <p> Sau đó, quý vị sẽ được yêu cầu xác định cụm từ nào nghe tự nhiên hơn.</p> <p>Quý vị nên quyết định dựa trên cách quý vị sẽ nói một cách tự nhiên.</p> ',
    'Đây là trang hướng dẫn cuối cùng. Nhấn vào nút “next” để bắt đầu thử nghiệm.'
  ],
  show_clickable_nav: true
}

// creating and pushing the (adj -> adj -> noun) trial blocks into the timeline
var all_trials = [];

// adding int-int-noun
all_trials = all_trials.concat(vietDoubleIntNoun(3));
// adding sub-sub-noun
all_trials = all_trials.concat(vietDoubleSubNoun(3));
// adding sub-int-noun
all_trials = all_trials.concat(vietSubIntNoun(3));

//randomization of the 3 types of blocks
all_trials = jsPsych.randomization.repeat(all_trials,1);

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
id = jsPsych.randomization.randomID();

jsPsych.init({
timeline: timeline,
show_progress_bar: true,
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
