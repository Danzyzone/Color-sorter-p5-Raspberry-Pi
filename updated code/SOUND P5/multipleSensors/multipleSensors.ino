

int sensorValue1 = 0; 
int sensorValue2 = 0;
// variable to store the value coming from the sensor
//int sensorPin = A0;    // select the input pin for the sensor

const int analogInPin1 = A0;  // Analog input pin that the potentiometer is attached to
//const int analogOutPin = 9; // Analog output pin that the LED is attached to
const int analogInPin2 = A1;
const int ldrPin = A2;

void setup() {
  // put your setup code here, to run once:

Serial.begin(9600);

 //pinMode(ledPin, OUTPUT);
pinMode(ldrPin, INPUT);
 

}

void loop() {

  //Serial.println(analogInPin1);

  // read the value from the sensor:
  //sensorValue = analogRead(sensorPin);
  
  sensorValue1 = analogRead(analogInPin1);
  sensorValue2 = analogRead(analogInPin2);
  int ldrStatus = analogRead(ldrPin);

  //Serial.println(sensorValue1);
  //Serial.print("s1  ");
  Serial.print(sensorValue1);
  Serial.print(",");
  //Serial.print("s2  ");
  Serial.print(sensorValue2);
   Serial.print(",");
   Serial.println(ldrStatus);
  //Serial.println(sensorValue);

delay(500);
  
}
