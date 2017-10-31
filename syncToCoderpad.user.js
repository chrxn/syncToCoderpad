// ==UserScript==
// @name         SyncToCoderpad
// @namespace    https://karat.io
// @version      0.1
// @description  Jump to Current Keystroke in Coderpad from Video
// @author       Karat
// @include      https://central.karat.io/interviews/*
// @exclude      https://central.karat.io/interviews/*/manage
// @grant        GM_util
// @require      https://www.gstatic.com/firebasejs/4.6.0/firebase.js
// @run-at       document-end
// ==/UserScript==
var jumpToCoderpad = {};

jumpToCoderpad.addCoderpadButton = function () {
  jumpToCoderpad.coderpadId = document.getElementById('codemirror_dynamic').getAttribute('data-id');
  jumpToCoderpad.coderpadLink = "https://coderpad.io/" + jumpToCoderpad.coderpadId + "/playback";
  $("#video_navigation").append (
      '<div id="coderpadLinkContainer"> \
      <a class="button inline" id="coderpadJumpLink" target="_blank" href="' + jumpToCoderpad.coderpadLink + '"><i class="fa fa-code"></i> Jump to Coderpad</a> \
      </div>'
  );
  jumpToCoderpad.keystrokeLink = jumpToCoderpad.coderpadLink;
  var refreshLink = function () {
    jumpToCoderpad.keystrokeLink = jumpToCoderpad.coderpadLink + "#" + curHistoryIndex;
    $('#coderpadJumpLink').prop('href', jumpToCoderpad.keystrokeLink);
    var position = {};
    position.keystroke = curHistoryIndex;
    if (curHistoryIndex >= 0) {
      jumpToCoderpad.firebase.database().ref(jumpToCoderpad.thisUser.id + '/' + jumpToCoderpad.coderpadId).set(position);
    }
    setTimeout(refreshLink, 500);
  };
  refreshLink();
};

jumpToCoderpad.setupStream = function () {
  jumpToCoderpad.thisUser = Raven.j.user;
  var config = {
    apiKey: "AIzaSyAgUq69xgqgnuIWSaLPtLiRGAF35_fVL4s",
    authDomain: "iv-sync.firebaseapp.com",
    databaseURL: "https://iv-sync.firebaseio.com",
    projectId: "iv-sync",
    storageBucket: "",
    messagingSenderId: "719502770317"
  };
  jumpToCoderpad.firebase = firebase.initializeApp(config, "jumpToCoderpad");
};



jumpToCoderpad.fixCss = function () {
  var css = '#coderpadLinkContainer a,#coderpadLinkContainer button { \
                  font-size: 10px; \
                  letter-spacing: 1px; \
                  line-height: 20px; \
                  padding: 5px 10px \
              } \
              a.button.inline, button.inline, input[type="button"].inline, input[type="submit"].inline { \
                  display: inline-block; \
                  width: auto; \
              } \
              a.button { \
                background-color: #00bcc2; \
                border: 0; \
                border-radius: 4px; \
                color: #ffffff; \
                display: block; \
                font-family: "Open Sans", sans-serif; \
                font-weight: bold; \
                letter-spacing: 1px; \
                outline: none; \
                padding: 16px 32px; \
                text-align: center; \
                text-transform: uppercase; \
                transition: all 0.2s; \
              } \
              #coderpadLinkContainer a,#coderpadLinkContainer form { \
                  margin-left: 5px \
              } \
              #coderpadLinkContainer a { \
                  height: 20px \
              } \
              #coderpadLinkContainer a:first-child { \
                  margin-left: 10px \
              } \
              #coderpadLinkContainer button { \
                  height: 30px\
              }';

  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
};


jumpToCoderpad.setupStream();
jumpToCoderpad.fixCss();
jumpToCoderpad.addCoderpadButton();
