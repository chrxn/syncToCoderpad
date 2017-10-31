// ==UserScript==
// @name         SyncFromVideo
// @namespace    https://karat.io
// @version      0.1
// @description  Jump to Current Keystroke in Coderpad from Video
// @author       Karat
// @include      https://coderpad.io/*/playback
// @grant        GM_util
// @require      https://www.gstatic.com/firebasejs/4.6.0/firebase.js
// @run-at       document-end
// ==/UserScript==
syncFromVideo = {};
CoderPad.position = {};
// define your userid here
syncFromVideo.userid = '888';
syncFromVideo.coderpadId = location.href.split('/')[3];

syncFromVideo.setupStream = function () {
  var config = {
    apiKey: "AIzaSyAgUq69xgqgnuIWSaLPtLiRGAF35_fVL4s",
    authDomain: "iv-sync.firebaseapp.com",
    databaseURL: "https://iv-sync.firebaseio.com",
    projectId: "iv-sync",
    storageBucket: "",
    messagingSenderId: "719502770317"
  };
  syncFromVideo.firebase = firebase.initializeApp(config, "jumpToCoderpad");
  var keyStrokeRef = syncFromVideo.firebase.database().ref(syncFromVideo.userid + '/' + syncFromVideo.coderpadId);
  keyStrokeRef.on('value', function(snapshot) {
    CoderPad.position = snapshot.val();
    location.hash = "#" + CoderPad.position.keystroke;
  });
};

syncFromVideo.setupStream();
