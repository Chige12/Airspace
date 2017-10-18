  int sw = 11;
  int green = 2;
  int red = 3;
  int blue = 4;
  int nowColor = 6;
  int nextColor = 0;
  
void setup() {
  pinMode(sw,INPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
}

void loop() {
  
  if (digitalRead(sw) == HIGH) {  //スイッチONで
    while(1){                      //違う色がでるまで回す
      nextColor = random(0, 7);
      if(nextColor != nowColor) { //新色に書き換え
        nowColor = nextColor;
        delay(500);
        break;
      }
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
  delay(10);
}


