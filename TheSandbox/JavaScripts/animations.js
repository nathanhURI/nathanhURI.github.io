function animateAfterDelay(id){
    $(id).css("animation-play-state", "running");
}


$(document).ready(function(){
    setTimeout(function(){animateAfterDelay("#homeBtn")}, 700);
    setTimeout(function(){animateAfterDelay("#gamesBtn")}, 800);
    setTimeout(function(){animateAfterDelay("#projectsBtn")}, 900);
    setTimeout(function(){animateAfterDelay("#infoBtn")}, 1000);
});