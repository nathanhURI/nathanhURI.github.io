function linkToPage(text){
  for(var i = 0; i<allElements.length; i++){
    if(text.toLowerCase() == allElements[i].name.toLowerCase()){
      window.location.href = allElements[i].path+allElements[i].value;
      return;
    }
  }
  alert('No results found for "' + text + '".');
  $("#home-search").focus();
};

$(document).ready(function() {

  //handles linking to subpage on enter
  $(document).on('keypress','#home-search',function(e) {
    if(e.which == 13){
      linkToPage($('#home-search').val());
    }
  });

  //handles linking to subpage on click of go button
  $(document).on('click','#go-button',function() {

    linkToPage($('#home-search').val());
  });

  //handles linking to subpage on click of dropdown
  $(document).on('click','.ui-menu-item',function() {

    linkToPage($('#home-search').val());
  });

  //I also made some changes in jquery-ui.js, commenting Nathan changed where I made changes

});