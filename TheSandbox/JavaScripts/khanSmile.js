var programCode = function(processingInstance) {
    with (processingInstance) {
      size(400, 400); 
      frameRate(30);
        
      // Paste code from Khan Academy here:
      fill(255, 255, 0);
      ellipse(200, 200, 200, 200);
      noFill();
      stroke(0, 0, 0);
      strokeWeight(2);
      arc(200, 200, 150, 100, 0, PI);
      fill(0, 0, 0);
      ellipse(250, 200, 10, 10);
      ellipse(153, 200, 10, 10);
    }};

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("mycanvas"); 
  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode); 