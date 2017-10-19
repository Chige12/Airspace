const s = io.connect('http://localhost:3000'); //ローカル

s.on("colorChange", function(color) { //色変更時
  console.log('Color: ' + color.value);
  BG_Change(color.value);
  AudioOn();
});

window.onkeydown = function(e) { //keyboardのイベント取得
  keyCode = window.event.keyCode;
  console.log(keyCode);
  if (keyCode == 32) {
    AudioOn();
  }
}

const overElm = document.getElementById("over");
const underElm = document.getElementById("under")
var animationStyle = 'fade';

function BG_Change(color) {
  if (overElm.classList.contains(animationStyle) == false) { //over表示の時
    underElm.style.backgroundColor = color; //underの色を切り替え
    var anmStyleNum = getRandomInt(1, 3);
    switch (anmStyleNum) { //アニメーション変更
      case 1:
        animationStyle = 'fade';
        break;
      case 2:
        animationStyle = 'slide_right';
        break;
      case 3:
        animationStyle = 'slide_left';
        break;
    }
  } else {
    overElm.style.backgroundColor = color; //overの色を切り替え
  }
  overElm.classList.toggle(animationStyle);
}

function AudioOn() {
  var audio = new Audio();
  var soundNum = getRandomInt(1, 14);
  audio.preload = "auto";
  audio.src = "./sound/sound" + soundNum + ".wav";
  audio.play();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}