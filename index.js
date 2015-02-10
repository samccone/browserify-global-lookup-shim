#!/usr/bin/env node

var through = require('through2');
var argv = require('minimist')(process.argv.slice(2));

function getShims() {
  return argv['global-shim'].reduce(function(prev, curr) {
    var names = curr.split(":");
    var name = names[0];
    var alias = names[1] ? names[1] : names[0];

    return prev + 'if (o == "'+name+'") return window["'+alias+'"];'
  }, "");
}

function replaceMagic(src) {
  var matcher = "var f = new Error";
  return src.replace("var f=new Error", function(match) {
    return '' +
    getShims() +
    match
  });
}

process.stdin
.pipe((function() {
  var src = '';

  function ondata(d, _, cb) {
    src += d.toString();
    cb();
  }

  function onend(cb) {
    this.push(replaceMagic(src));

    cb();
  }

  return through(ondata, onend);
}()))
.on('error', console.error.bind(console))
.pipe(process.stdout);
