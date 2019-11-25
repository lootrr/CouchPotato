
// These are the specific functions used to generate the experiments

// declartion function used to find a randon index from [min,max).
function randomInd(min, max){
  return Math.floor((Math.random() * (max - min) ) + min);
}
// used to check and prevent bad matchings of the two adjectives that correspond to the noun
function sameType(adj1, adj2){

  // checks to see if the adjs are the same
  if(adj1 === adj2){
    return true;
  }
  
  // used to check intersective adjectives against each other
  if ((adj1 === "dơ" && adj2 === "sạch") || (adj1 === "sạch" && adj2 == "dơ")){
    return true;

  }else if ((adj1 === "hình tròn" && adj2 === "hình vuông") || (adj1 === "hình vuông" && adj2 === "hình tròn") ){
    return true;

  }else if ((adj1 === "nhựa" && adj2 === "gỗ") || (adj1 === "gỗ" && adj2 === "nhựa") ){
    return true;

  }else if((adj1 === "màu đỏ" && adj2 === "màu vàng") || (adj1 === "màu vàng" && adj2 === "màu đỏ")){
    return true;

  }
  
  // used to check subsective adjectives against each other
  if ((adj1 === "ngọt" && adj2 === "đắng") || (adj1 === "đắng" && adj2 == "ngọt")){
    return true;

  }else if ((adj1 === "xấu" && adj2 === "đẹp") || (adj1 === "đẹp" && adj2 === "xấu") ){
    return true;

  }else if ((adj1 === "lớn" && adj2 === "nhỏ") || (adj1 === "nhỏ" && adj2 === "lớn") ){
    return true;

  }else if((adj1 === "cao" && adj2 === "thấp") || (adj1 === "thấp" && adj2 === "cao")){
    return true;

  }

  return false;
}

// checks to see if there is a less than 
function mapCheck(noun_ind){
  let check = false;
  if(map[viet_stims[noun_ind].noun] >= 3){
    check = true;
  }
  return check;
}

function printMap(noun_ind){
  console.log(viet_stims[noun_ind].noun);
  console.log(map[viet_stims[noun_ind].noun]);
}

// creating and pushing the (int_adj -> int_adj -> noun) trial blocks into a return array
function vietDoubleIntNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    let noun_ind = randomInd(0, viet_stims.length);
    while(mapCheck(noun_ind)){
      noun_ind = randomInd(0, viet_stims.length);
    }
    map[viet_stims[noun_ind].noun] += 1;
    printMap(noun_ind);
    let int_adj_ind1 = randomInd(0, viet_stims[noun_ind].int_adj.length);
    let int_adj_ind2 = randomInd(0, viet_stims[noun_ind].int_adj.length);

    // used remove the same type of words from the list such as "ugly beautiful chair or round square table. In addition remove duplicate words "
    while( sameType(viet_stims[noun_ind].int_adj[int_adj_ind1], viet_stims[noun_ind].int_adj[int_adj_ind2]) ){
      int_adj_ind2 = randomInd(0, viet_stims[noun_ind].int_adj.length);
    }

    // where the trials are created
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Cách mô tả nào về  \"' + viet_stims[noun_ind].noun + '\" nghe tự nhiên hơn?</strong>',
        labels: [viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].int_adj[int_adj_ind1] + " " + viet_stims[noun_ind].int_adj[int_adj_ind2], 
                 viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].int_adj[int_adj_ind2] + " " + viet_stims[noun_ind].int_adj[int_adj_ind1]],
        prompt: "<p>Điều chỉnh thanh trượt để xác định sở thích của quý vị. Sau đó, nhấn vào nút \"continue\" để tiếp tục.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3,
        data: {data_type: "int_int_noun",
               noun_type: stims[noun_ind].noun,
               viet_noun_type: viet_stims[noun_ind].noun,
               int_type_1: stims[noun_ind].int_adj[int_adj_ind1],
               viet_int_type_1: viet_stims[noun_ind].int_adj[int_adj_ind1],
               int_type_2: stims[noun_ind].int_adj[int_adj_ind2],
               viet_int_type_2: viet_stims[noun_ind].int_adj[int_adj_ind2]
        }
    }
    all_trials.push(trial);
  }
  return all_trials;
}

// creating and pushing the (sub_adj -> sub_adj -> noun) trial blocks into a return array
function vietDoubleSubNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    let noun_ind = randomInd(0, viet_stims.length);
    while(mapCheck(noun_ind)){
      noun_ind = randomInd(0, viet_stims.length);
    }
    map[viet_stims[noun_ind].noun] += 1;
    printMap(noun_ind);
    let sub_adj_ind1 = randomInd(0, viet_stims[noun_ind].sub_adj.length);
    let sub_adj_ind2 = randomInd(0, viet_stims[noun_ind].sub_adj.length);
    while( sameType(viet_stims[noun_ind].sub_adj[sub_adj_ind1], viet_stims[noun_ind].sub_adj[sub_adj_ind2]) ){
      sub_adj_ind2 = randomInd(0, viet_stims[noun_ind].sub_adj.length);
    }

    // where the trials are created
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Cách mô tả nào về \"' + viet_stims[noun_ind].noun + '\" nghe tự nhiên hơn?</strong>',
        labels: [viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind1] + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind2], 
                 viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind2] + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind1] + " "],
        prompt: "<p>Điều chỉnh thanh trượt để xác định sở thích của quý vị. Sau đó, nhấn vào nút \"continue\" để tiếp tục.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3,
        data: {data_type: "sub_sub_noun",
               noun_type: stims[noun_ind].noun,
               viet_noun_type: viet_stims[noun_ind].noun,
               sub_type_1: stims[noun_ind].sub_adj[sub_adj_ind1],
               viet_sub_type_1: viet_stims[noun_ind].sub_adj[sub_adj_ind1],
               sub_type_2: stims[noun_ind].sub_adj[sub_adj_ind2],
               viet_sub_type_2: viet_stims[noun_ind].sub_adj[sub_adj_ind2]
        }
    }
    all_trials.push(trial);
  }

  return all_trials;
}

// creating and pushing the (sub_adj -> sub_adj -> noun) trial blocks into a return array
function vietSubIntNoun(amount){
  let all_trials = [];
  for (let size = 0; size < amount; size++){

    let noun_ind = randomInd(0, viet_stims.length);
    while(mapCheck(noun_ind)){
      noun_ind = randomInd(0, viet_stims.length);
    }
    map[viet_stims[noun_ind].noun] += 1;
    printMap(noun_ind);
    let int_adj_ind = randomInd(0, viet_stims[noun_ind].int_adj.length);
    let sub_adj_ind = randomInd(0, viet_stims[noun_ind].sub_adj.length);
    
    // used to truly randomize the placement of sub and int adjectives
    let label_1;
    let label_2;

    // used to change the position of sub-int-noun and int-sub-noun to prevent bias from occuring
    if(randomInd(0,2) == 1){
      label_1 = viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind] + " " + viet_stims[noun_ind].int_adj[int_adj_ind];
      label_2 = viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].int_adj[int_adj_ind] + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind];
    }else{
      label_1 = viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].int_adj[int_adj_ind] + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind];
      label_2 = viet_stims[noun_ind].noun + " " + viet_stims[noun_ind].sub_adj[sub_adj_ind] + " " + viet_stims[noun_ind].int_adj[int_adj_ind];
    }

    // where the trials are created and pushed to the return array
    let trial = {
        type: 'html-slider-response',
        stimulus: '<strong>Cách mô tả nào về \"' + viet_stims[noun_ind].noun + '\" nghe tự nhiên hơn?</strong>',
        labels: [label_1, label_2],
        prompt: "<p>Điều chỉnh thanh trượt để xác định sở thích của quý vị. Sau đó, nhấn vào nút \"continue\" để tiếp tục.</p>",
        require_movement: true,
        min: 0,
        max: 6,
        start: 3,
        data: {data_type: "sub_int_noun",
               noun_type: stims[noun_ind].noun,
               viet_noun_type: viet_stims[noun_ind].noun,
               sub_type: stims[noun_ind].sub_adj[sub_adj_ind],
               viet_sub_type: viet_stims[noun_ind].sub_adj[sub_adj_ind],
               int_type: stims[noun_ind].int_adj[int_adj_ind],
               viet_int_type: viet_stims[noun_ind].int_adj[int_adj_ind],
        }
    }
    all_trials.push(trial);
  }

  return all_trials;
}