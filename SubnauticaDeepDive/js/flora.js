//function to generate the scroll menu
function generateScroll(array){
  for(var i=0; i<array.length; i++){
    var element;
    var image;
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);
    if(params == "element="+array[i].value){
      element = "<a class='list-element active'>" + array[i].name;
    }else{
      element = "<a class='list-element'>" + array[i].name;
    }
    image = "<img class=' icon img-fluid' src=" +array[i].imagepath + array[i].value + "_icon.png alt="+ array[i].name +" Icon></a>";
    $(".vertical-menu").append(element + image);
  }
}

//function to get the url parameter
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

//function to see if url parameter is valid
function isValidParam(array, param){
  for(var i=0; i<array.length; i++){
    if(array[i].value == param){
      return i;
    }
  }
  return -1;
}

//function to set parmeter to first element in array if parameter was not valid
function setToFirst(array){
  var url = new URL(window.location.href);
  var params = new URLSearchParams(url.search);
  params.set("element", array[0].value);
  var newUrl = window.location.href.split('?')[0];
  window.location.replace(newUrl + "?" + params);
}

//function to generate the description and image of the parameter item
function generateDescImg(array){
  var element = getUrlParameter("element");
  var pos = isValidParam(array, element);
  $("#title").html(array[pos].name);
  $("#description").html(array[pos].desc);
  $("#item-image").attr("src",array[pos].imagepath + array[pos].value + "_world.png")

}

//function to generate everything on information page
function generateInfoPage(array){
  //populate scroll menu
  generateScroll(array);

  //handles if there is a parmeter in the URL
  if(getUrlParameter("element")){
    var param = getUrlParameter("element");
    if(isValidParam(array, param) != -1){
      generateDescImg(array);
    }else{
      alert('"' + param + '" is not a valid item for this page. Please try something else.');
      //set to first element in array
      setToFirst(array);
    }
    //check to make sure parameter exists in
  }else{
    //If no parameter, set to 1st element in array
    setToFirst(array);
  }

}

//function to change parameter on menu item click
function changeParam(array, text){

  var param;
  for(var i=0; i<array.length; i++){
    if(array[i].name == text){
      param=array[i].value;
      break;
    }
  }

  var url = new URL(window.location.href);
  var params = new URLSearchParams(url.search);
  params.set("element", param);
  var newUrl = window.location.href.split('?')[0];
  window.location.replace(newUrl + "?" + params);
}

//function to update list based on filter
function filter(text){
  $(".list-element").each(function(index, value) {
    var menuText;
    menuText = $(this).text().toLowerCase();
      if(menuText.includes(text,0)){
        $(this).show();
      }else{ 
        $(this).hide();
      }
  });
}



// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(document).ready(function() {

  generateInfoPage(floraElements);

  //handles changing the parameter on click of a menu item
  $(document).on('click','.list-element',function() {
    changeParam(floraElements, $(this).text());
  });

  $(document).on('keyup','#filter',function() {
    filter($("#filter").val().toLowerCase());
  });

});
