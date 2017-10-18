#define LED  13
int recieveByte = 0;
String bufferStr = "";
String okStr = "OK";

  int sw = 11;
  int green = 2;
  int red = 3;
  int blue = 4;
  int nowColor = 6;
  int nextColor = 0;
  int colorChange = 0;
  int flashing = 0;
  int flashTimes = 0;
  
void setup() {
  pinMode(sw,INPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  
  bufferStr = "";
  while (Serial.available() > 0) {
    recieveByte = Serial.read();
    if (recieveByte == (int)'\n') break;
    bufferStr.concat((char)recieveByte);
  }
  
  colorChange = 0;
  if (random(0, 2000) <= 0) {
    colorChange = 1;
  }
  if (digitalRead(sw) == HIGH){
    flashing = 1;
    colorChange = 1;
  }
  
  if (colorChange) {  //色が変わる時
    while(1){                      //違う色がでるまで回す
      nextColor = random(0, 7);
      if(nextColor != nowColor) { //新色に書き換え
        nowColor = nextColor;
        Serial.println(nowColor); //色情報を送り返す
        break;
      }
    }
  }
  
  if (flashing) {  //色を点滅させるとき
    if(flashTimes <= 5){
      digitalWrite(red,LOW);
      digitalWrite(green,LOW);
      digitalWrite(blue,LOW);
      delay(60);
    }
  }
 
  switch (nowColor) {
       case 0:
          digitalWrite(red, HIGH);
          digitalWrite(green, LOW);
          digitalWrite(blue, LOW);
          break;
       case 1:
          digitalWrite(red, LOW);
          digitalWrite(green, HIGH);
          digitalWrite(blue, LOW);
          break;
       case 2:
          digitalWrite(red, LOW);
          digitalWrite(green, LOW);
          digitalWrite(blue, HIGH);
          break;
       case 3:
          digitalWrite(red, HIGH);
          digitalWrite(green, HIGH);
          digitalWrite(blue, LOW);
          break;
       case 4:
          digitalWrite(red, LOW);
          digitalWrite(green, HIGH);
          digitalWrite(blue, HIGH);
          break;
       case 5:
          digitalWrite(red, HIGH);
          digitalWrite(green, LOW);
          digitalWrite(blue, HIGH);
          break;
       case 6:
          digitalWrite(red, HIGH);
          digitalWrite(green, HIGH);
          digitalWrite(blue, HIGH);
          break;
       default:
       break;
  }
  
  if (flashing) {  //色を点滅させるとき
    delay(60);
    if(flashTimes >= 5){
      flashing = 0;
      flashTimes = 0;
    }
    flashTimes++;
  }else{
    delay(10);
  }
}


