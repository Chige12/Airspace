  int sw = 11;
  int greenPin = 2;
  int redPin = 3;
  int bluePin = 4;
  int nowColor = 6;
  int nextColor = 0;
  int gradGreen = 0;
  int gradRed = 0;
  int gradBlue =0;
  int gradTime = 1000;
  int loopDelay = 10;
  
  int gradVal = (loopDelay / gradTime) * 255;
  
void setup() {
  pinMode(sw,INPUT);
}

void loop() {
  
  if (digitalRead(sw) == HIGH) {  //スイッチONで
    while(1){                      //違う色がでるまで回す
      nextColor = random(0, 7);
      if(nextColor != nowColor) { //新色に書き換え
        nowColor = nextColor;
        break;
      }
    }
  }
  
  switch (nowColor) {
    case 0:
      //Red
      if(gradRed <= 255){gradRed = gradRed + gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen - gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue - gradVal;}
      break;
    case 1:
      //Green
      if(gradRed <= 255){gradRed = gradRed - gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen + gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue - gradVal;}
      break;
    case 2:
      //Blue
      if(gradRed <= 255){gradRed = gradRed - gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen - gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue + gradVal;}
      break;
    case 3:
      //Red&Green>>Yellow
      if(gradRed <= 255){gradRed = gradRed + gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen + gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue - gradVal;}
      break;
    case 4:
      //Green&Blue>>SkyBlue
      if(gradRed <= 255){gradRed = gradRed - gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen + gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue + gradVal;}
      break;
    case 5:
      //Blue&Red>>Pink
      if(gradRed <= 255){gradRed = gradRed + gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen - gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue + gradVal;}
      break;
    case 6:
      //White
      if(gradRed <= 255){gradRed = gradRed + gradVal;}
      if(gradGreen <= 255){gradGreen = gradGreen + gradVal;}
      if(gradBlue <= 255){gradBlue = gradBlue + gradVal;}
      break;
    default:
      break;
  }

  digitalWrite(redPin, gradRed);
  digitalWrite(greenPin, gradGreen);
  digitalWrite(bluePin, gradBlue);

  delay(loopDelay);
}


