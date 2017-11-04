// ==UserScript==
// @name         SyncToCoderpad
// @namespace    https://karat.io
// @version      0.1
// @description  Jump to Current Keystroke in Coderpad from Video
// @author       Karat
// @include      https://central.karat.io/interviews/*
// @exclude      https://central.karat.io/interviews/*/manage
// @grant        GM_util
// @run-at       document-end
// ==/UserScript==
var jumpToCoderpad = {};

jumpToCoderpad.reqFirebase = function () {
    var script = document.createElement("script");
    script.src = "https://www.gstatic.com/firebasejs/4.6.0/firebase.js";
    document.getElementsByTagName("head")[0].appendChild(script);
};

jumpToCoderpad.addCoderpadButton = function () {
  jumpToCoderpad.coderpadId = document.getElementById('codemirror_dynamic').getAttribute('data-id');
  jumpToCoderpad.coderpadLink = "https://coderpad.io/" + jumpToCoderpad.coderpadId + "/playback";
  $("#video_navigation").append (
      '<div class="syncContainer">\
        <div class="syncButtons" id="coderpadLinkContainer"> \
          <a class="button inline" id="coderpadJumpLink" target="_blank" href="' + jumpToCoderpad.coderpadLink + '"><i class="fa fa-code"></i> Jump to Coderpad</a> \
        </div> \
        <div class="syncButtons" id="syncToggleContainer"> \
         <a class="button inline" id="syncToggleButton" ><i class="fa fa-refresh"></i> Sync On</a> \
        </div>\
      </div>'
  );
  jumpToCoderpad.sync = true;
  var handleToggle = function() {
      var syncButton = $("#syncToggleButton");
      if (jumpToCoderpad.sync) {
          syncButton.replaceWith("<a class=\"button inline secondary\" id=\"syncToggleButton\" ><i class=\"fa fa-refresh\"></i> Sync Off</a>");
          jumpToCoderpad.sync = false;
      } else {
          syncButton.replaceWith("<a class=\"button inline\" id=\"syncToggleButton\" ><i class=\"fa fa-refresh\"></i> Sync On</a>");
          jumpToCoderpad.sync = true;
      }
      $("#syncToggleButton").click(handleToggle);
  };
  $("#syncToggleButton").click(handleToggle);
};

jumpToCoderpad.setupRefresh = function () {
  var refreshLink = function () {
    jumpToCoderpad.keystrokeLink = jumpToCoderpad.coderpadLink + "#" + curHistoryIndex;
    $('#coderpadJumpLink').prop('href', jumpToCoderpad.keystrokeLink);
    var position = {};
    position.keystroke = curHistoryIndex;
    if (curHistoryIndex >= 0 && jumpToCoderpad.sync) {
      firebase.database().ref(jumpToCoderpad.thisUser.id + '/' + jumpToCoderpad.coderpadId).update(position);
    }
    setTimeout(refreshLink, 500);
  };
  refreshLink();
}

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
  firebase.initializeApp(config);
};

jumpToCoderpad.fixCss = function () {
  var css = '.syncContainer a,.syncContainer button { \
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
              .syncButtons a {\
                height: 20px; \
                font-size: 10px; \
                letter-spacing: 1px;\
                line-height: 20px; \
                padding: 5px 10px;\
              }\
              a.button.secondary { background-color: #000 } \
              ';

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

jumpToCoderpad.userIdMsg = function () {
  console.warn("Your Karat userid is " + Raven.j.user.id);
};

jumpToCoderpad.userIdMsg();
jumpToCoderpad.reqFirebase();
jumpToCoderpad.fixCss();
jumpToCoderpad.addCoderpadButton();
setTimeout(jumpToCoderpad.setupStream, 500);
setTimeout(jumpToCoderpad.setupRefresh, 500);
