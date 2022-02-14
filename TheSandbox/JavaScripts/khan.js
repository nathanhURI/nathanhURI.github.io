$(document).ready(function(){

  $("#resizeCanvas").click(function(){
    resizeCanvas();
  });

  $("#toImage").click(function(){
    toImage();
  });
//shape type settings
      $("#lines").click(function(){
        shapeType="lines";
      });
      $("#curves").click(function(){
        shapeType="curves";
      });
      $("#dcurves").click(function(){
        shapeType="doubleCurves";
      });
      $("#tris").click(function(){
        shapeType="triangles";
      });
      $("#quads").click(function(){
        shapeType="quads";
      });
      $("#circles").click(function(){
        shapeType="circles";
      });
      $("#squares").click(function(){
        shapeType="squares";
      });
      $("#pencil").click(function(){
        shapeType="drawLineTool";
      });
      $("#marker").click(function(){
        shapeType="drawEllipseTool";
      });
      $("#undo").click(function(){
        shapes.pop();
      });

});

var hex=function(h1){
    if(h1==0){
        return 0;
    }else if(h1=='1'){
        return 1;
    }else if(h1=='2'){
        return 2;
    }else if(h1=='3'){
        return 3;
    }else if(h1=='4'){
        return 4;
    }else if(h1=='5'){
        return 5;
    }else if(h1=='6'){
        return 6;
    }else if(h1=='7'){
        return 7;
    }else if(h1=='8'){
        return 8;
    }else if(h1=='9'){
        return 9;
    }else if(h1=='A' || h1=='a'){
        return 10;
    }else if(h1=='B' || h1=='b'){
        return 11;
    }else if(h1=='C' || h1=='c'){
        return 12;
    }else if(h1=='D' || h1=='d'){
        return 13;
    }else if(h1=='E' || h1=='e'){
        return 14;
    }else if(h1=='F' || h1=='f'){
        return 15;
    }
}

var getStrokeColor = function(){
    var color=$("#strokeColor").val();
    strokeR = hex(color[1])*16+hex(color[2]);
    strokeG = hex(color[3])*16+hex(color[4]);
    strokeB = hex(color[5])*16+hex(color[6]);
    return;
}

var getStrokeColorT = function(){
    var t=$("#strokeT").val();
    return t;
}

var getStrokeWeight = function(){
    var w=$("#strokeWeight").val();
    return w;
}

var getFillColor = function(){
    var color=$("#fillColor").val();
    fillR = hex(color[1])*16+hex(color[2]);
    fillG = hex(color[3])*16+hex(color[4]);
    fillB = hex(color[5])*16+hex(color[6]);
    return;
}

var getFillColorT = function(){
    var t=$("#fillT").val();
    return t;
}

var getBackColor = function(){
    var color=$("#backColor").val();
    backR = hex(color[1])*16+hex(color[2]);
    backG = hex(color[3])*16+hex(color[4]);
    backB = hex(color[5])*16+hex(color[6]);
    return;
}

var getHeight = function(){
    var h = $("#canvasHeight").val();
    return h;
}

var getWidth = function(){
    var w = $("#canvasWidth").val();
    return w;    
}

function resizeCanvas() {
  var myCanvas = document.getElementById("mycanvas");
  if(getWidth()<=1200&&getHeight()<=1200){
      myCanvas.width = getWidth();
      centerX= getWidth()/2;
      myCanvas.height = getHeight();
      centerY=getHeight()/2;
  }else{
    alert("Cannot exceed 1200");
  }
  return;
}

function toImage(){
    var canvas = document.getElementById('mycanvas');
    var dataURL;
    dataURL = canvas.toDataURL();
    //console.log(dataURL);
    $("#downloaded").html('<img style="float:none" src="'+dataURL+'">');
    if (window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(canvas.msToBlob(), "mandala.png");
    }else{
        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg",1.0);
        a.download = "mandala.jpg";
        a.click();
        document.body.removeChild(a);
    }

}


var centerX=getWidth()/2;
var centerY=getHeight()/2;
var shapeType;
var strokeR;
var strokeG;
var strokeB;
var strokeColorT;
var globalStrokeWeight;
var fillR;
var fillG;
var fillB;
var fillColorT;
var backR;
var backG;
var backB;

//array to store objects
    var shapes=[];

var programCode = function(processingInstance) {
    with (processingInstance) {
      size(getWidth(), getHeight()); 
      frameRate(30);
        
      // Paste code from Khan Academy here:
      /*
        l makes lines
        c makes curves
        d makes double curve
        t makes triangles
        q makes quads
        p makes draw pencil tool
        m makes draw marker tool
        e makes circles
        s makes squares
        u is undo
    */
    /**global variables**/
    //draw start screen
    var title=true;
    shapeType="null";
    var clicked=false;

    //have program hold off on doing stuff
    var wait=0;

    //stroke variable
    var strokeColor=color(strokeR, strokeG, strokeB);
    strokeColorT=255;
    stroke(strokeColor,strokeColorT);

    globalStrokeWeight=1;
    strokeWeight(globalStrokeWeight);

    var drawEllipseToolWidth=5;

    //fill variables

    var fillColor=color(fillR, fillG, fillB);
    fillColorT=1;
    fill(fillColor,fillColorT);

    //shape drawing variables
    var curveStage=1;
    var doubleCurveStage=1;
    var triStage=1;
    var quadStage=1;

    var tempX1=1000;
    var tempY1=1000;
    var tempX2=1000;
    var tempY2=1000;
    var tempX3=1000;
    var tempY3=1000;
    var tempX4=1000;
    var tempY4=1000;
    /**Button Ojects and Methods**/
    var Button = function(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.fill = config.fill || color(255, 255, 255);
        this.width = config.width || 150;
        this.height = config.height || 50;
        this.label = config.label || "";
        this.onClick = config.onClick || function(){};
    };

    Button.prototype.draw = function() {
        fill(this.fill);
        strokeWeight(1);
        stroke(150, 150, 150);
        rect(this.x, this.y, this.width, this.height);
        fill(0, 0, 0);
        textSize(15);
        textAlign(CENTER,CENTER);
        text(this.label, this.x+this.width/2, this.y+this.height/2);
    };

    Button.prototype.isMouseInside = function() {
        return mouseX > this.x &&
               mouseX < (this.x + this.width) &&
               mouseY > this.y &&
               mouseY < (this.y + this.height);
    };

    Button.prototype.handleMouseClick = function() {
        if (this.isMouseInside()) {
            this.onClick();
        }
    };

    Button.prototype.mouseMovedOver = function(){
        if (mouseX > this.x && mouseX < (this.x + this.width) &&
            mouseY > this.y && mouseY < (this.y + this.height))
            {
                this.fill=color(102, 103, 107);
            }else{
                this.fill=color(188, 190, 196);
            }
    };
    /**TitleScreen**/
    var startButton=new Button({
        x: 175,
        y: 193,
        width:50,
        height:30,
        fill:color(188, 190, 196),
        label: "Start!",
        onClick: function() {
            title=false;
            wait=10;
            menuOpen=false;
            //change here
            menuShowing=false;
            shapeType="lines";
        }
    });
    var drawTitle=function(){
        textSize(37);
        text("Mandala Maker",200,149);
        startButton.draw();
    };
    /****/
    /**Line object and draw method**/

    var Line=function(x1,y1,x2,y2){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
    };

    Line.prototype.draw = function() {
        //without rotation line(this.x1,this.y1,this.x2,this.y2);
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                line(this.x1-centerX,this.y1-centerY,this.x2-centerX,this.y2-centerY);
                popMatrix();
            }
    };
    /**Curve object and draw method**/

    var Curve=function(x1,y1,x2,y2,x3,y3){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        this.x3=x3;
        this.y3=y3;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    Curve.prototype.draw = function() {
        /* without rotation
        ();
        beginShape();
        curveVertex(this.x1,this.y1);
        curveVertex(this.x1,this.y1);
        curveVertex(this.x3,this.y3);
        curveVertex(this.x2,this.y2);
        curveVertex(this.x2,this.y2);
        endShape();
        */
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                beginShape();
                curveVertex(this.x1-centerX,this.y1-centerY);
                curveVertex(this.x1-centerX,this.y1-centerY);
                curveVertex(this.x3-centerX,this.y3-centerY);
                curveVertex(this.x2-centerX,this.y2-centerY);
                curveVertex(this.x2-centerX,this.y2-centerY);
                endShape();
                popMatrix();
            }
    };
    /**DoubleCurve object and draw method**/

    var DoubleCurve=function(x1,y1,x2,y2,x3,y3,x4,y4){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        this.x3=x3;
        this.y3=y3;
        this.x4=x4;
        this.y4=y4;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    DoubleCurve.prototype.draw = function() {
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                beginShape();
                curveVertex(this.x1-centerX,this.y1-centerY);
                curveVertex(this.x1-centerX,this.y1-centerY);
                curveVertex(this.x4-centerX,this.y4-centerY);
                curveVertex(this.x3-centerX,this.y3-centerY);
                curveVertex(this.x2-centerX,this.y2-centerY);
                curveVertex(this.x2-centerX,this.y2-centerY);
                endShape();
                popMatrix();
            }
    };
    /**Triangle object and draw method**/

    var Triangle=function(x1,y1,x2,y2,x3,y3){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        this.x3=x3;
        this.y3=y3;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    Triangle.prototype.draw = function() {
        
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                triangle(this.x1-centerX,this.y1-centerY,this.x2-centerX,this.y2-centerY,
                        this.x3-centerX,this.y3-centerY);
                popMatrix();
        }
    };
    /**Quad object and draw method**/
    var Quad=function(x1,y1,x2,y2,x3,y3,x4,y4){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        this.x3=x3;
        this.y3=y3;
        this.x4=x4;
        this.y4=y4;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    Quad.prototype.draw = function() {
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                quad(this.x1-centerX,this.y1-centerY,this.x2-centerX,this.y2-centerY,
                    this.x3-centerX,this.y3-centerY,this.x4-centerX,this.y4-centerY);
                popMatrix();
            }
    };
    /**drawEllipseTool object and draw method**/

    var drawEllipseTool=function(x1,y1){
        this.x1=x1;
        this.y1=y1;
        //sets it to the current global values when it is created
        this.drawEllipseToolwidth=drawEllipseToolWidth;
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
        
    };

    drawEllipseTool.prototype.draw = function(){
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                ellipse(this.x1-centerX,this.y1-centerY,
                this.drawEllipseToolwidth,this.drawEllipseToolwidth);
                popMatrix();
            }
    };
    /**Circle object and draw method**/
    var Circle=function(x1,y1,x2,y2){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    Circle.prototype.draw = function(){
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                //use distance formula to find radius
                //times two at front since width and height actually take diameter
                ellipse(this.x1-centerX,this.y1-centerY,
                        2*sqrt(pow((this.x1-this.x2),2)+pow((this.y1-this.y2),2)),
                        2*sqrt(pow((this.x1-this.x2),2)+pow((this.y1-this.y2),2)));
                popMatrix();
            }
    };
    /**Square object and draw method**/
    var Square=function(x1,y1,x2,y2){
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        //sets it to the current global values when it is created
        this.localStrokeColor=strokeColor;
        this.localStrokeColorT=strokeColorT;
        this.localStrokeWeight=globalStrokeWeight;
        this.localFillColor=fillColor;
        this.localFillColorT=fillColorT;
    };

    Square.prototype.draw = function(){
        rectMode(CENTER);
        for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                stroke(this.localStrokeColor,this.localStrokeColorT);
                strokeWeight(this.localStrokeWeight);
                fill(this.localFillColor,this.localFillColorT);
                //use distance formula to find width/height
                //times two at front since width and height actually take diameter
                
                //removes the translate to the center,setting it back to normal
                    translate(-centerX,-centerY);
                    //sets center to tempX1,tempY1
                    translate(this.x1,this.y1);
                    //atan2 function fits well here
                    rotate(atan2(this.y2-this.y1, this.x2-this.x1));
                    //draw sqaure at new center with rotation
                    rect(0,0,
                        2*sqrt(pow((this.x1-this.x2),2)+pow((this.y1-this.y2),2)),
                        2*sqrt(pow((this.x1-this.x2),2)+pow((this.y1-this.y2),2)));
                popMatrix();
            }
    };
    /****/

    var mousePressed=function(){
        
        //handles title
        if(title===true){
            startButton.handleMouseClick();
        }
        
        //handles shapes
        if (menuOpen===false&&wait===0){
            if(shapeType==="lines"){
            if (clicked===false){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)){
                clicked=false;
                tempX2=mouseX;
                tempY2=mouseY;
                shapes.push(new Line(tempX1,tempY1,tempX2,tempY2));
            }
            }
            if(shapeType==="curves"){
            if (clicked===false&&curveStage===1){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
                curveStage=2;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)&&curveStage===2){
                clicked=true;
                tempX2=mouseX;
                tempY2=mouseY;
                curveStage=3;
            }
            if (clicked===true&&(tempX2!==mouseX||tempY2!==mouseY)&&curveStage===3){
                clicked=false;
                tempX3=mouseX;
                tempY3=mouseY;
                curveStage=1;
            
                shapes.push(new Curve(tempX1,tempY1,tempX2,tempY2,tempX3,tempY3));
            }
            }  
            if(shapeType==="doubleCurves"){
            if (clicked===false&&doubleCurveStage===1){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
                doubleCurveStage=2;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)&&doubleCurveStage===2){
                clicked=true;
                tempX2=mouseX;
                tempY2=mouseY;
                doubleCurveStage=3;
            }
            if (clicked===true&&(tempX2!==mouseX||tempY2!==mouseY)&&doubleCurveStage===3){
                clicked=true;
                tempX3=mouseX;
                tempY3=mouseY;
                doubleCurveStage=4;
            }
            if (clicked===true&&(tempX3!==mouseX||tempY3!==mouseY)&&doubleCurveStage===4){
                clicked=false;
                tempX4=mouseX;
                tempY4=mouseY;
                doubleCurveStage=1;
            
                shapes.push(new DoubleCurve(tempX1,tempY1,tempX2,tempY2,
                                            tempX3,tempY3,tempX4,tempY4));
            }
        }
            if(shapeType==="triangles"){
            if (clicked===false&&triStage===1){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
                triStage=2;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)&&triStage===2){
                clicked=true;
                tempX2=mouseX;
                tempY2=mouseY;
                triStage=3;
            }
            if (clicked===true&&(tempX2!==mouseX||tempY2!==mouseY)&&triStage===3){
                clicked=false;
                tempX3=mouseX;
                tempY3=mouseY;
                triStage=1;
            
                shapes.push(new Triangle(tempX1,tempY1,tempX2,tempY2,tempX3,tempY3));
            }
        }
            if(shapeType==="quads"){
            if (clicked===false&&quadStage===1){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
                quadStage=2;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)&&quadStage===2){
                clicked=true;
                tempX2=mouseX;
                tempY2=mouseY;
                quadStage=3;
            }
            if (clicked===true&&(tempX2!==mouseX||tempY2!==mouseY)&&quadStage===3){
                clicked=true;
                tempX3=mouseX;
                tempY3=mouseY;
                quadStage=4;
            }
            if (clicked===true&&(tempX3!==mouseX||tempY3!==mouseY)&&quadStage===4){
                clicked=false;
                tempX4=mouseX;
                tempY4=mouseY;
                quadStage=1;
            
                shapes.push(new Quad(tempX1,tempY1,tempX2,tempY2,
                                    tempX3,tempY3,tempX4,tempY4));
            }
        }
            if(shapeType==="circles"){
            if (clicked===false){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)){
                clicked=false;
                tempX2=mouseX;
                tempY2=mouseY;
                shapes.push(new Circle(tempX1,tempY1,tempX2,tempY2));
            }
        }
            if(shapeType==="squares"){
            if (clicked===false){
                clicked=true;
                tempX1=mouseX;
                tempY1=mouseY;
            }
            if (clicked===true&&(tempX1!==mouseX||tempY1!==mouseY)){
                clicked=false;
                tempX2=mouseX;
                tempY2=mouseY;
                shapes.push(new Square(tempX1,tempY1,tempX2,tempY2));
            }
        }
        }
    };

    var mouseDragged=function(){
        if(shapeType==="drawEllipseTool"&&menuOpen===false&&wait===0){
            shapes.push(new drawEllipseTool(mouseX,mouseY));
        }
        else if(shapeType==="drawLineTool"&&menuOpen===false&&wait===0){
            shapes.push(new Line(mouseX, mouseY, pmouseX, pmouseY));
        }
    };

    var keyPressed=function(){
        if (title===false){
            //u for undo most recent shape
            if (keyCode===85&&clicked===false){
                //undoes most recent shape
                shapes.pop();
            }
            //u for undo current shape
            else if (keyCode===85&&clicked===true){
                //cancels current shape
                tempX1=1000;
                tempY1=1000;
                tempX2=1000;
                tempY2=1000;
                tempX3=1000;
                tempY3=1000;
                tempX4=1000;
                tempY4=1000;
                curveStage=1;
                doubleCurveStage=1;
                triStage=1;
                quadStage=1;
                clicked=false;
            }
            //l for lines
            else if (keyCode===76&&clicked===false){
                shapeType="lines";
            }
            //c for curves
            else if (keyCode===67&&clicked===false){
                shapeType="curves";
            }
            //d for double curves
            else if (keyCode===68&&clicked===false){
                shapeType="doubleCurves";
            }
            //t for triangles
            else if (keyCode===84&&clicked===false){
                shapeType="triangles";
            }
            //q for quads
            else if (keyCode===81&&clicked===false){
                shapeType="quads";
            }
            //m for drawEllipseTool (marker)
            else if (keyCode===77&&clicked===false){
                shapeType="drawEllipseTool";
            }
            //p for drawLineTool (pencil)
            else if (keyCode===80&&clicked===false){
                shapeType="drawLineTool";
            }
            //e for circles
            else if (keyCode===69&&clicked===false){
                shapeType="circles";
            }
            //s for squares
            else if (keyCode===83&&clicked===false){
                shapeType="squares";
            }
        }
    };
       
    var draw= function() {

    getStrokeColor();
    strokeColor=color(strokeR, strokeG, strokeB);
    strokeColorT=getStrokeColorT();
    globalStrokeWeight=getStrokeWeight();
    getFillColor();
    fillColor=color(fillR, fillG, fillB);
    fillColorT=getFillColorT();
    //background
    noStroke();
    getBackColor();
    fill(backR, backG, backB);
    rect(0,0,2000,2000);

    $("#shapeCount").html(shapes.length);
    //drawing title

    fill(0, 0, 0);
    if (title===true){
        drawTitle();
        startButton.mouseMovedOver();
    }

    while (wait>0){
        wait--;
    }

    //drawing shapes array  
        for (var i=0;i<shapes.length;i++){
            shapes[i].draw();
        }
        
    /**Line drawing**/
        if (clicked===true&&shapeType==="lines"){
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus 200 since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                line(tempX1-centerX,tempY1-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
    /**Curve drawing**/
        if (clicked===true&&shapeType==="curves"&&curveStage===2){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus 200 since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                line(tempX1-centerX,tempY1-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
      
        if (clicked===true&&shapeType==="curves"&&curveStage===3){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus 200 since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                beginShape();
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(mouseX-centerX,mouseY-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                endShape();
                popMatrix();
            }
        }
    /**Double Curve drawing**/
        if (clicked===true&&shapeType==="doubleCurves"&&doubleCurveStage===2){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus 200 since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                line(tempX1-centerX,tempY1-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
        
        if (clicked===true&&shapeType==="doubleCurves"&&doubleCurveStage===3){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus 200 since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                beginShape();
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(mouseX-centerX,mouseY-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                endShape();
                popMatrix();
            }
        }
        
        if (clicked===true&&shapeType==="doubleCurves"&&doubleCurveStage===4){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                beginShape();
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(tempX1-centerX,tempY1-centerY);
                curveVertex(mouseX-centerX,mouseY-centerY);
                curveVertex(tempX3-centerX,tempY3-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                curveVertex(tempX2-centerX,tempY2-centerY);
                endShape();
                popMatrix();
            }
        }
    /**Triangle drawing**/

        if (clicked===true&&shapeType==="triangles"&&triStage===2){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                line(tempX1-centerX,tempY1-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
        
        if (clicked===true&&shapeType==="triangles"&&triStage===3){
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                triangle(tempX1-centerX,tempY1-centerY,tempX2-centerX,tempY2-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
    /**Quad drawing**/

        if (clicked===true&&shapeType==="quads"&&quadStage===2){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                line(tempX1-centerX,tempY1-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
        
        if (clicked===true&&shapeType==="quads"&&quadStage===3){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                triangle(tempX1-centerX,tempY1-centerY,tempX2-centerX,tempY2-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
        
        if (clicked===true&&shapeType==="quads"&&quadStage===4){
            
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                quad(tempX1-centerX,tempY1-centerY,tempX2-centerX,tempY2-centerY,
                    tempX3-centerX,tempY3-centerY,mouseX-centerX,mouseY-centerY);
                popMatrix();
            }
        }
    /**Circle drawing**/
        if (clicked===true&&shapeType==="circles"){
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                //guide line line(tempX1-centerY,tempY1-centerY,mouseX-centerY,mouseY-centerY);
                ellipse(tempX1-centerX,tempY1-centerY,
                        2*sqrt(pow((tempX1-mouseX),2)+pow((tempY1-mouseY),2)),
                        2*sqrt(pow((tempX1-mouseX),2)+pow((tempY1-mouseY),2)));
                popMatrix();
            }
        }
    /**Square drawing**/
        if (clicked===true&&shapeType==="squares"){
            rectMode(CENTER);
            for (var i=0;i<12;i++){
                pushMatrix();
                translate(centerX,centerY);
                rotate(radians(30*i));
                //minus centerY since center of rotation is changed
                strokeWeight(globalStrokeWeight);
                stroke(strokeColor,strokeColorT);
                fill(fillColor,fillColorT);
                //guilde line line(tempX1-centerY,tempY1-centerY,mouseX-centerY,mouseY-centerY);
                    //removes the translate to the center,setting it back to normal
                    translate(-centerX,-centerY);
                    //sets center to tempX1,tempY1
                    translate(tempX1,tempY1);
                    //atan2 function fits well here
                    rotate(atan2(mouseY-tempY1, mouseX-tempX1));
                    //draw sqaure at new center with rotation
                            rect(0,0,
                                    2*sqrt(pow((tempX1-mouseX),2)+pow((tempY1-mouseY),2)),
                                    2*sqrt(pow((tempX1-mouseX),2)+pow((tempY1-mouseY),2)));
                    
                popMatrix();
            }
        }
    /****/
    };

}};

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("mycanvas"); 
  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode); 