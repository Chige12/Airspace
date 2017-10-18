const SerialPort = require('serialport');
const socketio = require("socket.io"); // ソケット通信
const http = require('http');
const url = require('url');
const request = require('request');
const express = require('express');

'use strict';

// シリアルポートに定期的に書き込んではデータを受け取る
// パーストークンは \n
// 1秒おき送信


const port = new SerialPort('COM5', { // Windows
  parser: SerialPort.parsers.readline('\n'),
  baudrate: 9600
});

port.on('open', function() {
  console.log('Serial open.');
  setInterval(write, 1000, 'OK\n');
});

var color = "";
var server = http.Server(express());
var io = socketio(server);

server.listen(3000, function() {});

port.on('data', function(data) {
  console.log('Data: ' + data);
  data = parseInt(data)
  switch (data) {
    case 0:
      color = 'red';
      break;
    case 1:
      color = 'green';
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
      color = 'pink';
      break;
    case 6:
      color = 'white';
      break;
    default:
      color = 'none';
      break;
  }
  console.log('Color: ' + color);
  io.emit("colorChange", { value: color });
});

function write(data) {
  console.log('Write: ' + data);
  port.write(new Buffer(data), function(err, results) {
    if (err) {
      console.log('Err: ' + err);
      console.log('Results: ' + results);
    }
  });
}