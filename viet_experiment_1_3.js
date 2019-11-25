// TODO: convert this project into viet language

// timeline that sets the experiment
var timeline = [];

// consent form
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("Nếu quý vị đồng ý tham gia, xin vui lòng nhấn vào o bên cạnh: 'Tôi đồng ý tham gia vào nghiên cứu này.'");
    return false;
  }
  return false;
};

var consent = {
  type:'external-html',
  url: "viet_consent_1.html",
  cont_btn: "start",
  check_fn: check_consent
};

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
var map = {};

// adding int-int-noun
all_trials = all_trials.concat(vietDoubleIntNoun(10));
// adding sub-sub-noun
all_trials = all_trials.concat(vietDoubleSubNoun(10));
// adding sub-int-noun
all_trials = all_trials.concat(vietSubIntNoun(10));

//randomization of the 3 types of blocks
all_trials = jsPsych.randomization.repeat(all_trials,1);

// combine all the trials in order for experiment to function
timeline.push(consent);
timeline.push(intro);
timeline = timeline.concat(all_trials);

// start the experiment and then when finished updates data
id = jsPsych.randomization.randomID(4);
jsPsych.init({
  timeline: timeline,
  show_progress_bar: true,
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
    // end blurb
    $(".jspsych-display-element").html("<p style='text-align:center;'>" + "Cuộc nghiên cứu đă kết thúc. " + "</p>" +
                                       "<p style='text-align:center;font-size:30px;'>" + "Xin vui lòng ghi lại và nhớ mã số của quý vị cho phần tiếp theo:" + "</p>" + 
                                       "<p style=color:red;text-align:center;font-size:50px;>" + id + "</p>" + 
                                       "<p style=text-align:center;>" + "Bây giờ quý vị sẽ thực hiện phần khảo sát ngắn về khả năng ngôn ngữ của quý vị. Phan khảo sát nầy sẽ mất không quá 15 phút." + "</p>" +
                                       "<a href='https://forms.gle/9s7dCEKgVKNR9F5X7' style='text-align:center;' target='_blank'>" + "Xin vui lòng nhấn đây" + "</a>");
  }
});

