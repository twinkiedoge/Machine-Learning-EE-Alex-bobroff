var dropzone;
var inputImg;
function setup() {
  var canvas = createCanvas(100, 100);
  background(0,0,0,0);
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  window.confirm("Use Fullscreen for best results");
  //makes dropzone grey or white when file dragged over
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile,unhighlight);
  //gets the graph
  var elt = document.getElementById('calculator');
  var calculator = Desmos.Calculator(elt);
  calculator.setExpression({id:'graph1', latex:'y_1~mx_1+b'});
   calculator.setExpression({id:'graph2', latex:'y=(1)/{(1+e^{-0.042x+8.3})}'});
  //sets the bounds of the graph
  calculator.setMathBounds({
  left: -10,
  right: 350,
  bottom: -1,
  top: 1.5,
});
  //table
  calculator.setExpression({
  type: 'table',
  columns: [
    {
      latex: 'x_1',
      values: ['154', '151', '157', '187', '122', '185', '175','122','252','253','253','249','227','227','227','227'],
      color: Desmos.Colors.BLUE
      
    },
    
    {
      latex: 'y_1',
      values: ['0', '0', '0', '0', '0', '0', '0', '0','1','1','1','1','1','1','1','1'],
      color: Desmos.Colors.RED
    },
  ]
});
}

function gotFile(file){
  dropzone.style('background-color','rgba(0,0,0,0');
  console.log("filename:"+file.name+"    "+"file size:"+file.size+" bytes"+"    "+file.type);
  var inputImg = createImg(file.data,"incompatible file. File must be picture.");
  inputImg.hide();
  image(inputImg,0,0,100,100);
  dropzone.style('background-color','rgba(0,0,0,0)');
  //Div for input image style
  swidth=Math.round(screenWidth/10);
  inputImg.style("width","100px");
  inputImg.style("length","200px");
  inputImg.position(swidth*4, 850);
  incolor = get(50,50);
  inred = red(incolor);
  console.log(inred);
  //using sigmoid function to get output value from input of inred
  powerof = ((-0.042*inred)+8.3);
  yval = 1/(1+Math.pow(2.71828182846,powerof));
  console.log(yval)
  if (yval>0.5){
    final=yval*100
    console.log("There is a "+final+"% chance that your picture is an orange.");
    document.getElementById("result").innerHTML = "There is a "+final+"% chance that your picture is an orange.";
    document.getElementById("result").style.fontSize = "18pt";
  }else{
    final=Math.abs(yval-1)*100;
    console.log("There is a "+final+"% chance that your picture is an apple.");
    document.getElementById("result").innerHTML = "There is a "+final+"% chance that your picture is an apple.";
    document.getElementById("result").style.fontSize = "18pt";
  }
}
//changes dropzone to light grey
function highlight() {
  dropzone.style('background-color','rgba(25,25,25,.55)');
}
//changes dropzone back to clear
function unhighlight() {
  dropzone.style('background-color','rgba(0,0,0,0');
}

function draw(){
  //sets initial padding
  document.getElementById("myDiv").style.paddingLeft = "5%";
  document.getElementById("sketch-holder").style.paddingLeft = "40%";
  document.getElementById("description").style.paddingLeft = "5%";
  document.getElementById("description").style.paddingRight = "5%";
  document.getElementById("notworking").style.paddingLeft = "5%";
  //dropzone spacing resize
  screenWidth = window.innerWidth;
  swidth=Math.round(screenWidth/20);
  dropzone.style("position", swidth, 800);
  //triggers element resize when page is resized
  window.onresize = function(event) {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    swidth=Math.round(screenWidth/20);
    dropzone.style("position", swidth, 800);
  }
}
