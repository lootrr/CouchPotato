
// These are the specific functions used to generate the experiments

// declartion function used to find a randon index 
function randomInd(min, max){
  return Math.floor((Math.random() * (max - min) ) + min);
}

// creating and pushing the (int_adj -> int_adj -> noun) trial blocks into a return array
function doubleIntNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    // calcuating the random indexes
    let noun_ind = randomInd(0, stims.length);
    let int_adj_ind1 = randomInd(0, stims[noun_ind].int_adj.length);
    let int_adj_ind2 = randomInd(0, stims[noun_ind].int_adj.length);
    while(int_adj_ind1 == int_adj_ind2){
      int_adj_ind2 = randomInd(0, stims[noun_ind].int_adj.length);
    }

    // where the trials are created
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Which description of \"' + stims[noun_ind].noun + '\" sounds more natural?</strong>',
        labels: ["the " + stims[noun_ind].int_adj[int_adj_ind1] + " " + stims[noun_ind].int_adj[int_adj_ind2] + " "  + stims[noun_ind].noun, 
                "the " + stims[noun_ind].int_adj[int_adj_ind2] + " " + stims[noun_ind].int_adj[int_adj_ind1] + " "  + stims[noun_ind].noun],
        prompt: "<p>Adjust the slider to indicate your preference. Then, click “continue” to proceed.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3
    }
    all_trials.push(trial);
  }
  return all_trials;
}

// creating and pushing the (sub_adj -> sub_adj -> noun) trial blocks into a return array
function doubleSubNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    // calcuating the random indexes
    let noun_ind = randomInd(0, stims.length);
    let sub_adj_ind1 = randomInd(0, stims[noun_ind].sub_adj.length);
    let sub_adj_ind2 = randomInd(0, stims[noun_ind].sub_adj.length);
    while(sub_adj_ind1 == sub_adj_ind2){
      sub_adj_ind2 = randomInd(0, stims[noun_ind].sub_adj.length);
    }

    // where the trials are created
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Which description of \"' + stims[noun_ind].noun + '\" sounds more natural?</strong>',
        labels: ["the " + stims[noun_ind].sub_adj[sub_adj_ind1] + " " + stims[noun_ind].sub_adj[sub_adj_ind2] + " "  + stims[noun_ind].noun, 
                "the " + stims[noun_ind].sub_adj[sub_adj_ind2] + " " + stims[noun_ind].sub_adj[sub_adj_ind1] + " "  + stims[noun_ind].noun],
        prompt: "<p>Adjust the slider to indicate your preference. Then, click “continue” to proceed.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3
    }
    all_trials.push(trial);
  }

  return all_trials;
}

// creating and pushing the (sub_adj -> sub_adj -> noun) trial blocks into a return array
function subIntNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    // calcuating the random indexes
    let noun_ind = randomInd(0, stims.length);
    let int_adj_ind = randomInd(0, stims[noun_ind].int_adj.length);
    let sub_adj_ind = randomInd(0, stims[noun_ind].sub_adj.length);

    // where the trials are created
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Which description of \"' + stims[noun_ind].noun + '\" sounds more natural?</strong>',
        labels: ["the " + stims[noun_ind].sub_adj[sub_adj_ind] + " " + stims[noun_ind].int_adj[int_adj_ind] + " "  + stims[noun_ind].noun, 
                "the " + stims[noun_ind].int_adj[int_adj_ind] + " " + stims[noun_ind].sub_adj[sub_adj_ind] + " "  + stims[noun_ind].noun],
        prompt: "<p>Adjust the slider to indicate your preference. Then, click “continue” to proceed.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3
    }
    all_trials.push(trial);
  }

  return all_trials;
}