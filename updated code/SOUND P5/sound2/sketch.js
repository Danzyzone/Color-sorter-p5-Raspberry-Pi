/* 
August 2019 - Doug Whitton 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is 'multiplesensors' in folder test code
*/

var osc;
var playing = false;
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
var splitter;
var Colourred = 0, Colourgreen = 0, Colourblue = 0;

var osc1, osc2, osc3, fft;

function setup() {
  
  createCanvas(windowWidth, windowHeight);

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1d11111");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

  
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


osc1 = new p5.SinOsc(); // set frequency and type
osc1.amp(.2);
osc2 = new p5.SinOsc(); // set frequency and type
osc2.amp(.2);  
osc3 = new p5.SinOsc(); // set frequency and type
osc3.amp(.4);    

fft = new p5.FFT();
osc1.start();
osc2.start(); 
osc3.start();

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  Colourred = splitter[0];                 //put the first sensor's data into a variable
  Colourgreen = splitter[1];
  Colourblue = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
  
  background(255,255,255); //white
  
  var freq = map(Colourred, 0, width, 30, 120);    
    osc1.freq(freq);
    console.log(freq);
    
  var freq2 = map(Colourgreen, 0, width, 30, 120);    
    osc2.freq(freq2);
    console.log(freq2);
    
 var freq3 = map(Colourblue, 0, width, 30, 120);    
    osc3.freq(freq3);
    console.log(freq3); 
    
    let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(137,1,2); // waveform is blue/grey
  strokeWeight(10);
  for (var i = 0; i< waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
      }
  endShape();
    
     fill(Colourred,0,0); //declareing red value 
  stroke(75);
    strokeWeight(10);
  ellipse(width-width + 250, height/2, 250, 250);
    
fill(255, 0, 0); //displays the colour red RGB Decimal Code
  stroke(75);
    strokeWeight(4);
  ellipse(width-width + 250, height/2, Colourred/8, Colourred/8);
    
    
  fill(0,Colourgreen,0);    //declareing green value
      stroke(75);
    strokeWeight(10);
  ellipse(width - 250, height/2, 250, 250);
    
    fill(0, 128, 0); // display colour green RGB Decimal Code
  stroke(75);
    strokeWeight(4);
  ellipse(width - 250, height/2, Colourgreen/8, Colourgreen/8);
    
    strokeWeight(8);
  fill(0,0,Colourblue);  // declaring blue value
  ellipse(width/2, height/4, 250, 250);
    strokeWeight(4);
      fill(0, 0, 255);  //display colour blue RGB Decimal Code
  ellipse(width/2, height/4, Colourblue/10, Colourblue/10);
    
    /*
    
      let spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
    */
}


  

 