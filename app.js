const SerialPort = require('serialport');
const socketio = require("socket.io"); // ソケット通信
const http = require('http');
const request = require('request');
const express = require('express');

'use strict'; //?

const port = new SerialPort('COM5', { // ポート解放
  parser: SerialPort.parsers.readline('\n'),
  baudrate: 9600
});

port.on('open', function() { //シリアル通信の準備が整ったとき
  console.log('Serial open.');
  setInterval(write, 1000, 'OK\n');
});

var color = "";
var server = http.Server(express());
var io = socketio(server);

server.listen(3000, function() {});

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