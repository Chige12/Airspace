const s = io.connect('http://localhost:3000'); //ローカル

s.on("colorChange", function(color) {
  console.log('Color: ' + color.value);
  BG_Change(color.value);
});

const overElm = document.getElementById("over");
const underElm = document.getElementById("under")

function BG_Change(color) {
  var i = 0;
  if (overElm.classList.contains('fade') == true) { //over表示の時
    underElm.style.backgroundColor = color; //underの色を切り替え
  } else {
    overElm.style.backgroundColor = color; //overの色を切り替え
  }
  overElm.classList.toggle("fade");
}

window.onkeydown = function(e) { //keyboardのイベント取得
  keyCode = window.event.keyCode;
  if (keyCode == 37) {

  }
}