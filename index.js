const s = io.connect('http://localhost:3000'); //ローカルアクセス
var nowColorId;
var playVideoNow = false;

s.on("colorChange", function(color) { //色変更時
  if (playVideoNow == false) {
    nowColorId = color.value;
    console.log('Color: ' + color.value);
    BG_Change(color.value);
    AudioOn();
  }
});

var v = document.getElementById("video");
var videoName = "E-VIDEO";
var videoNowTime;

v.style.display = "none";
v.addEventListener("ended", function() { //動画終了時
  setTimeout(v.style.display = "none", 1000);
  setTimeout(s.emit("videoEnd", { color: nowColorId, time: 0 }), 1000);
  playVideoNow = false;
}, false);

var editMode = false; //デフォルトは再生モード

if (editMode == false) {
  // -- 再生モード時の実行内容 --
} else {
  // -- エディットモード時の実行内容 --
}

window.onkeydown = function(e) { //keyboardのイベント取得
  keyCode = window.event.keyCode;
  console.log(keyCode);

  if (keyCode == 32) { //ランダム音声再生（space）
    if (playVideoNow == false) {
      AudioOn();
    }
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
  if (keyCode == 13) { //Enter(動画再生)
    v.style.display = "block";
    s.emit("video", { time: 0, name: videoName });
    v.currentTime = 0;
    v.play();
    console.log(videoName + "を再生");
    playVideoNow = true;
  }
  if (keyCode == 8) { //ビデオ停止(BackSpace)
    if (playVideoNow == true) {
      v.style.display = "none";
      v.pause();
      videoNowTime = v.duration;
      s.emit("videoEnd", { time: videoNowTime, color: nowColorId });
      playVideoNow = false;
    } else {
      s.emit("video", { time: videoNowTime, name: videoName });
      v.play();
      playVideoNow = true;
    }
  }
}


// -- 関数置き場 --

// アニメーション変更
const overElm = document.getElementById("over");
const underElm = document.getElementById("under")
var animationStyle = 'fade';
var viewColor;

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

  switch (color) {
    case 'red':
      viewColor = 'RED';
      break;
    case 'limegreen':
      viewColor = 'GREEN';
      break;
    case 'blue':
      viewColor = 'BLUE';
      break;
    case 'yellow':
      viewColor = 'YELLOW';
      break;
    case 'skyblue':
      viewColor = 'SKYBLUE';
      break;
    case 'fuchsia':
      viewColor = 'PINK'; //pink
      break;
    case 'black':
      viewColor = 'WHITE';
      break;
    default:
      viewColor = color;
      break;
  }
  document.getElementById("str").textContent = viewColor;
}

//ランダム音声再生
function AudioOn() {
  var audio = new Audio();
  var soundNum = getRandomInt(1, 72);
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