const s = io.connect('http://localhost:3000'); //ローカルアクセス

s.on("colorChange", function(color) { //色変更時
  console.log('Color: ' + color.value);
  BG_Change(color.value);
  AudioOn();
});

var editMode = false; //デフォルトは再生モード

if (editMode == false) {
  // -- 再生モード時の実行内容 --

} else {
  // -- エディットモード時の実行内容 --

}

//keyboardのイベント取得
window.onkeydown = function(e) {
  keyCode = window.event.keyCode;
  console.log(keyCode);

  if (keyCode == 32) { //ランダム音声再生（space）
    AudioOn();
  }
  if (keyCode == 69) { //モードの切り替え（eキー）
    if (editMode == false) {
      editMode = true;
      console.log(editMode);
      document.getElementById("editMode").classList.add('fade_edit');
      document.getElementById("body").classList.add('display-cursor');
    } else {
      editMode = false;
      console.log(editMode);
      document.getElementById("editMode").classList.remove('fade_edit');
      document.getElementById("body").classList.remove('display-cursor');
    }
  }

}


// -- 関数置き場 --

// アニメーション変更
const overElm = document.getElementById("over");
const underElm = document.getElementById("under")
var animationStyle = 'fade';

function BG_Change(color) {
  if (overElm.classList.contains(animationStyle) == false) { //over表示の時
    underElm.style.backgroundColor = color; //underの色を切り替え
    var anmStyleNum = getRandomInt(0, 7);
    switch (anmStyleNum) {
      case 0:
        animationStyle = 'fade';
        break;
      case 1:
        animationStyle = 'slide_right';
        break;
      case 2:
        animationStyle = 'slide_left';
        break;
      case 3:
        animationStyle = 'slide_top';
        break;
      case 4:
        animationStyle = 'slide_bottom';
        break;
      case 5:
        animationStyle = 'spiral';
        break;
      case 6:
        animationStyle = 'spiral2';
        break;
    }
  } else {
    overElm.style.backgroundColor = color; //overの色を切り替え
  }
  overElm.classList.toggle(animationStyle);
}

//ランダム音声再生
function AudioOn() {
  var audio = new Audio();
  var soundNum = getRandomInt(1, 69);
  audio.preload = "auto";
  audio.src = "./sound/sound" + soundNum + ".wav";
  audio.play();
}

//ランダム整数生成
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

//エディットモードサウンド再生
function soundTest(sound) {
  if (editMode == true) {
    var audio = new Audio();
    audio.preload = "auto";
    audio.src = "./sound/sound" + sound + ".wav";
    audio.play();
  }
}

// -- データベース --