The data of the site mostly resides in js/site-layout, which has all the
links and descriptions included in the dynamically generated drop down menus. 
widget.js, jquery-ui.js, and search are for the search filter on the homepage, which was 
also used in the programming assignment. Each of the other js files contain
the code for the page with the same name. This includes error checking,
generating the page based on the parameter, filtering the dropdown items,
and pulling information from site-layout. Most of the functions within
these files is the same, however, there are slight variations based on
the types of images of that particular category (ie if there are different images for
the icon and large image, if they are png or jpg, or if there are several or one images)
In future iteratations, these could certainly be condensed, especially if more sections
are added.