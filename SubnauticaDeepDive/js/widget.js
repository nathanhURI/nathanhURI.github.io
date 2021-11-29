$( function() {

  //my conversion to make the names field the names of items
  var names = [];
  for(var i = 0; i<allElements.length; i++){
    names[i] = allElements[i].name;
  }
 
    var accentMap = {
      "á": "a",
      "ö": "o",
      "é": "e"
    };
    var normalize = function( term ) {
      var ret = "";
      for ( var i = 0; i < term.length; i++ ) {
        ret += accentMap[ term.charAt(i) ] || term.charAt(i);
      }
      return ret;
    };
 
    $( "#home-search" ).autocomplete({
      source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( names, function( value ) {
          value = value.label || value.value || value;
          return matcher.test( value ) || matcher.test( normalize( value ) );
        }) );
      }
    });
  } );