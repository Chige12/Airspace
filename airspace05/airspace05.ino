#define LED  13
int recieveByte = 0;
String bufferStr = "";

String redStr = "0";
String greenStr = "1";
String blueStr = "2";
String yellowStr = "3";
String skyblueStr = "4";
String pinkStr = "5";
String whiteStr = "6";
String offStr = "7";
String endStr = "8";

  int sw = 11;
  int green = 2;
  int red = 3;
  int blue = 4;
  int nowColor = 6;
  int nextColor = 0;
  int colorChange = 0;
  int changeEvent = 0;
  int changeEventTime = 0;
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

 if (bufferStr.length() > 0) {
    //受け取った文字データがある場合、
    //"off"だった場合、消灯
    //それ以外を受け取ったらそれぞれの色
    //"ended"なら終わり
    if (offStr.compareTo(bufferStr) == 0) {
      nowColor = 10;
      digitalWrite(red, LOW);
      digitalWrite(green, LOW);
      digitalWrite(blue, LOW);
    } else if (redStr.compareTo(bufferStr) == 0) {
      nowColor = 0;
    } else if (greenStr.compareTo(bufferStr) == 0) {
      nowColor = 1;
    } else if (blueStr.compareTo(bufferStr) == 0) {
      nowColor = 2;
    } else if (yellowStr.compareTo(bufferStr) == 0) {
      nowColor = 3;
    } else if (skyblueStr.compareTo(bufferStr) == 0) {
      nowColor = 4;
    } else if (pinkStr.compareTo(bufferStr) == 0) {
      nowColor = 5;
    } else if (whiteStr.compareTo(bufferStr) == 0) {
      nowColor = 6;
    } else if (endStr.compareTo(bufferStr) == 0){
      delay(500);
    }
 }else if (digitalRead(sw) == HIGH){
    flashing = 1;
    if(changeEvent == 0){
      colorChange = 1;
      changeEvent = 1;
    }
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

    
//色を変えたら3秒間は色を変えない
  if (changeEvent == 1){
    changeEventTime = changeEventTime + 1;
    if(changeEventTime >= 300){
      changeEvent = 0;
      changeEventTime = 0;
    }
  }
  
  if (flashing) {  //色を点滅させるとき
    delay(60);
    if(flashTimes >= 5){
      flashing = 0;
      flashTimes = 0;
    }
    flashTimes++;
  }else{
    delay(1);
  }
}


