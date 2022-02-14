function images(input){
var API_KEY= "15333264-43efb0686b14759f0f8518770";
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(input);
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ 
    	//alert(hit.pageURL);
    	if(i%3===1){
    		$( "#first" ).append( '<img src="'+hit.largeImageURL+'" style="width:100%">' );
    	}
    	else if(i%3===2){
    		$( "#second" ).append( '<img src="'+hit.largeImageURL+'" style="width:100%">' );
    	}
    	else{
    		$( "#third" ).append( '<img src="'+hit.largeImageURL+'" style="width:100%">' );
    	}
    });
else
    alert('No hits');
});
}
images('video game');


$(document).ready(function(){
  $("#submit").click(function(){
  	$( "#first" ).empty();
  	$( "#second" ).empty();
  	$( "#third" ).empty();
  	var im=($("#search").val());
  	    //alert(im);
  		images(im);
	});

  $("#search").keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13){
      $( "#first" ).empty();
      $( "#second" ).empty();
      $( "#third" ).empty();
      var im=($("#search").val());
          //alert(im);
        images(im);
      }
  });
  
});


