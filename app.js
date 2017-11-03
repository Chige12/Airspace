const SerialPort = require('serialport');
const socketio = require("socket.io"); // ソケット通信
const http = require('http');
const request = require('request');
const express = require('express');
const fs = require("fs");

'use strict';

const port = new SerialPort('COM5', { // ポート解放
  parser: SerialPort.parsers.readline('\n'),
  baudrate: 9600
});

port.on('open', function() { //シリアル通信の準備が整ったとき
  console.log('Serial open.');
});

var server = http.Server(express());
var io = socketio(server);

server.listen(3000, function() {});


var color = "";

port.on('data', function(data) { //データを受信したとき
  console.log('Data: ' + data);
  data = parseInt(data) //dataを数列に変換

  switch (data) {
    case 0:
      color = 'red';
      break;
    case 1:
      color = 'limegreen';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'yellow';
      break;
    case 4:
      color = 'skyblue';
      break;
    case 5:
      color = 'fuchsia'; //pink
      break;
    case 6:
      color = 'black';
      break;
    default:
      color = 'none';
      break;
  }
  console.log('Color: ' + color);

  //フロントへ送る
  io.emit("colorChange", { value: color });
});

var f = fs.readFileSync(data.name + '.txt');
var o = JSON.parse(f);

io.on('connection', function(socket) {
  console.log("connect!");
  socket.on('video', function(data) { //ビデオ再生時
    TimingGenerator(o, data.time);
  });
  socket.on("videoEnd", function(data) { //ビデオ停止時
    clearTimeout(setLED);
    write(data.color);
  })
});

function TimingGenerator(obj, nowtime) {
  for (var i = 0, len = obj.length; i < len; i++) {
    var setLED = setTimeout(LEDlighting, obj[i].time * 1000 - nowtime, obj[i].LED, obj[i].color);
  }
}

function LEDlighting(LED, color) {
  if (LED == 'on') {
    switch (color) {
      case "red":
        write("0");
        break;
      case "limegreen":
        write("1");
        break;
      case "blue":
        write("2");
        break;
      case "yellow":
        write("3");
        break;
      case "skyblue":
        write("4");
        break;
      case "fuchsia":
        write("5");
        break;
      case "white":
        write("6");
        break;
    }

  }
  if (LED == 'off') {
    write("7");
  }
}

//-- Arduinoへ送信 --
function write(data) {
  console.log('Write: ' + data);
  port.write(new Buffer(data), function(err, results) {
    if (err) {
      console.log('Err: ' + err);
      console.log('Results: ' + results);
    }
  });
}