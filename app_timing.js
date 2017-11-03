const socketio = require("socket.io"); // ソケット通信
const http = require('http');
const request = require('request');
const express = require('express');
const fs = require("fs");

'use strict';

var server = http.Server(express());
var io = socketio(server);

server.listen(3001, function() {});

io.on('connection', function(socket) {
  console.log("connect!");
  socket.on('saveObj', function(data) {
    console.log(data);
    fs.writeFileSync(data.name + ".txt", JSON.stringify(data.value));
  });
});