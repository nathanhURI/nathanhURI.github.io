const country_capital_pairs = pairs;

//changes table view for the All radio button
function toAll(){
  if($("#All").prop("checked")){
    // if right or wrong class exists
    if ($(".right")[0] || $(".wrong")[0]){
      $(".right").show();
      $(".wrong").show();
      $("#noEntry").hide();
    }else{
      $(".right").hide();
      $(".wrong").hide();
      $("#noEntry").show();
    }
  }
}

//changes table view for the Correct radio button
function toCorrect(){
  if($("#Correct").prop("checked")){
    // if right class exists
    if ($(".right")[0]){
      $(".right").show();
      $(".wrong").hide();
      $("#noEntry").hide();
    }else{
      $(".wrong").hide();
      $("#noEntry").show();
    }
  }
}

//changes table view for the Wrong radio button
function toWrong(){
  if($("#Wrong").prop("checked")){
    // if wrong class exists
    if ($(".wrong")[0]){
      $(".right").hide();
      $(".wrong").show();
      $("#noEntry").hide();
    }else{
      $(".right").hide();
      $("#noEntry").show();
    }
  }
}

//get country given capital
function getCountry(capital){
  for(var i=0; i<country_capital_pairs.length; i++){
    if(country_capital_pairs[i].capital==capital){
      return country_capital_pairs[i].country;
    }
  }
  return '';
}

//function for adding question
function newRow(rand){
  
  //handles changing question and input field
  question = country_capital_pairs[rand].country;
  $("#pr2__question").text(question);
  $("#pr2__answer").val('');
  $("#pr2__answer").focus();

  //handles updating the map API
  var newSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAygP7hTR-0195QlA98pU0-J9bky8Fms8U&q="+question;
  $("#map").attr("src",newSrc);
};

//function for handling guess submission
function submitRow(rand){
  

  if($("#pr2__answer").val().toLowerCase() == pairs[rand].capital.toLowerCase()){
    //if answer is correct, change html accordingly
    question = "<tr class='right'><td class='right_question'>"+country_capital_pairs[rand].country+"</td>";
    answer = "<td class='right_cap'>" + country_capital_pairs[rand].capital + "</td>";
    submit = "<td class='right_sub'><div class='fas fa-check'></div>  <button class='delete' type='button'>Delete</button></td></tr>";
    $("#mainTable").append(question + answer + submit);

    //handles changing radio state
    if($("#All").prop("checked")){
      toAll();
    }else if($("#Wrong").prop("checked")){
      $("#All").prop("checked", true);
      toAll();
    }else{
      toCorrect();
    }
  }else{
    //if answer is incorrect, change html accordingly
    question = "<tr class='wrong'><td class='wrong_question'>"+country_capital_pairs[rand].country+"</td>";
    answer = "<td class='wrong_cap'>"+ $("#pr2__answer").val() +"</td>";
    submit = "<td><span class='wrong_sub'>"+country_capital_pairs[rand].capital+"</span> <button class='delete' type='button'>Delete</button></td></tr>";
    $("#mainTable").append(question + answer + submit);

    //handles changing radio state
    if($("#All").prop("checked")){
      toAll();
    }else if($("#Correct").prop("checked")){
      $("#All").prop("checked", true);
      toAll();
    }else{
      toWrong();
    }
  };
};

// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(document).ready(function() {

  //generate random number for country
  var rand = Math.floor(Math.random() * country_capital_pairs.length);
  newRow(rand);

  //handles creating new row and bumping old row down on click of submit
  $(document).on('click','#pr2__submit',function() {

    submitRow(rand);

    //get new random country
    rand = Math.floor(Math.random() * country_capital_pairs.length);
    newRow(rand);
  });

  //handles creating new row and bumping old row down on enter
  $(document).on('keypress','#pr2__answer',function(e) {
    if(e.which == 13){

      submitRow(rand);

      //get new random country
      rand = Math.floor(Math.random() * country_capital_pairs.length);
      newRow(rand);
    }
  });

  //handles creating new row and bumping old row down on click of dropdown
  $(document).on('click','.ui-menu-item',function() {

    submitRow(rand);

    //get new random country
    rand = Math.floor(Math.random() * country_capital_pairs.length);
    newRow(rand);
  });

  //handles changing display on the All radio button
  $(document).on('click','#All',function(){
    toAll();
  });

  //handles changing display on the Correct radio button
  $(document).on('click','#Correct',function(){
    toCorrect();
  });

  //handles changing display on the Wrong radio button
  $(document).on('click','#Wrong',function(){
    toWrong();
  });

  //handles deleting a row when a delete button is pressed
  $(document).on('click','.delete',function(){
    //deletes the tr parent on click of delete
    $(this).parents("tr").remove();

    //also rechecks the radio buttons to see if the no entries row should be shown
    if($("#All").prop("checked")){
      toAll();
    }else if($("#Correct").prop("checked")){
      toCorrect();
    }else if($("#Wrong").prop("checked")){
      toWrong();
    }
  });

  //handles the changes to the map on mousing over countries
  $(document).on('mouseover','.wrong_question, .right_question',function(){
    var newSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAygP7hTR-0195QlA98pU0-J9bky8Fms8U&q="+$(this).html();
    $("#map").attr("src",newSrc);
  });

  //handles the changes to the map on mousing over capital
  $(document).on('mouseover','.right_cap, .wrong_sub',function(){
    var newSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAygP7hTR-0195QlA98pU0-J9bky8Fms8U&q="+$(this).html() + "," + getCountry($(this).html());
    $("#map").attr("src",newSrc);
  });

  //changes back to main location when hovering away
  $(document).on('mouseleave','.wrong_question, .right_question, .right_cap, .wrong_sub',function(){
    var newSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAygP7hTR-0195QlA98pU0-J9bky8Fms8U&q="+country_capital_pairs[rand].country;
    $("#map").attr("src",newSrc);
  });

  //handles clear button action
  $(document).on('click','#pr3_clear',function(){
    $("#pr2__answer").val('');
    $("#pr2__answer").focus();
  });

  //handles restart button action
  $(document).on('click','#pr3_restart',function(){
    //removes all the answer rows
    $(".right").remove();
    $(".wrong").remove();
    $("#noEntry").show();
    $("#pr2__answer").focus();
  });

  //I also made some changes in jquery-ui.js, commenting Nathan changed where I made changes

});
