const s = io.connect('http://localhost:3001');
var v = document.getElementById("video");
var startBtn = document.getElementById("start_btn");
var checkBtn = document.getElementById("check_btn");
var LEDBtn = document.getElementById("LED_btn");
var videoName = "E-VIDEO";

var LEDs = [
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3"),
  document.getElementById("4"),
  document.getElementById("5"),
  document.getElementById("6"),
];
var LEDon = false;

var saveObj = [
  { time: 0, LED: 'on', color: 'white' },
];

var vTime = false;

//keyboardのイベント取得
window.onkeydown = function(e) {
  keyCode = window.event.keyCode;
  console.log(keyCode);
  if (keyCode == 32) { //LED_ON（space）
    if (LEDon == false) {
      onTimeSet();
      LEDon = true;
    }
  }
  if (keyCode == 13) { //enter 
    vTime = true;
    videoStart();
  }
  if (keyCode == 8) { //ビデオ停止（BackSpaceキー）
    v.pause();
  }
  //colorChange
  if (keyCode == 49) { //red 1
    LED_Change('red');
  }
  if (keyCode == 50) { //limegreen 2
    LED_Change('limegreen');
  }
  if (keyCode == 51) { //blue 3
    LED_Change('blue');
  }
  if (keyCode == 52) { //yellow 4
    LED_Change('yellow');
  }
  if (keyCode == 56) { //skyblue 8
    LED_Change('skyblue');
  }
  if (keyCode == 57) { //fuchsia 9
    LED_Change('fuchsia');
  }
  if (keyCode == 48) { //white 0
    LED_Change('white');
  }
  if (keyCode == 70) {
    s.emit("saveObj", { value: saveObj, name: videoName });
    alert("送信しました！");
  }
}

window.onkeyup = function(e) {
  keyCode = window.event.keyCode;
  if (keyCode == 32) { //LED_OFF（space_up）
    if (LEDon == true) {
      offTimeSet();
      LEDon = false;
    }
  }
}

var nowColor = 'white';
var LEDTimingObj = {};

function LED_Change(color) {
  nowColor = color;
  LEDBtn.style.backgroundColor = color;
  if (LEDon == true) {
    changeColor(LEDs, color);
  }
}

function onTimeSet() {
  if (vTime == true) {
    LEDTimingObj = {};
    LEDTimingObj.time = v.currentTime;
    LEDTimingObj.LED = 'on';
    LEDTimingObj.color = nowColor;
    saveObj.push(LEDTimingObj);
  }
  changeColor(LEDs, nowColor);
}

function offTimeSet() {
  if (vTime == true) {
    LEDTimingObj = {};
    LEDTimingObj.time = v.currentTime;
    LEDTimingObj.LED = 'off';
    LEDTimingObj.color = nowColor;
    saveObj.push(LEDTimingObj);
  }
  changeColor(LEDs, 'black');
}

function changeColor(coll, color) {
  for (var i = 0, len = coll.length; i < len; i++) {
    coll[i].style["background-color"] = color;
  }
}

checkBtn.style.opacity = 0.3;

var objSave = false; //まだセーブされてない

function videoStart() { //保存開始
  if (objSave == true) {
    alert("保存されているデータがあります");
  } else {
    v.play();
    startBtn.style.opacity = 0.3;
  }
}

v.addEventListener("ended", function() { //動画終了時
  console.log(saveObj);
  myStorage = localStorage;
  localStorage.setItem("saveObj", saveObj);
  s.emit("saveObj", { value: saveObj, name: videoName });
  alert("送信しました！");
  objSave = true;
  checkBtn.style.opacity = 1;
}, false);

function videoCheck() { //動画確認時
  if (objSave == true) {
    startBtn.style.opacity = 0.3;
    checkBtn.style.opacity = 0.3;
    v.play();
    for (var i = 0, len = saveObj.length; i < len; i++) {
      setTimeout(checkLEDlighting, saveObj[i].time * 1000, saveObj[i].LED, saveObj[i].color);
    }
  }
}

function checkLEDlighting(LED, color) {
  if (LED == 'on') {
    changeColor(LEDs, color);
  }
  if (LED == 'off') {
    changeColor(LEDs, 'black');
  }
}