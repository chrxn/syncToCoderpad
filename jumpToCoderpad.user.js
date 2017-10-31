// ==UserScript==
// @name         JumpToCoderpad
// @namespace    https://karat.io
// @version      0.1
// @description  Jump to Current Keystroke in Coderpad from Video
// @author       Karat
// @include      https://central.karat.io/interviews/*
// @exclude      https://central.karat.io/interviews/*/manage
// @grant        none
// @run-at       document-end
// ==/UserScript==
var jumpToCoderpad = {};

jumpToCoderpad.addCoderpadButton = function () {
  jumptoCoderpad.coderpadId = document.getElementById('codemirror_dynamic').getAttribute('data-id');
  jumptoCoderpad.coderpadLink = "https://coderpad.io/" + jumptoCoderpad.coderpadId + "/playback";
  $("#video_navigation").append (
      '<div id="coderpadLinkContainer"> \
      <a class="button inline" id="coderpadJumpLink" target="_blank" href="' + jumptoCoderpad.coderpadLink + '"><i class="fa fa-code"></i> Jump to Coderpad</a> \
      </div>'
  );
  jumptoCoderpad.keystrokeLink = jumptoCoderpad.coderpadLink;
  var refreshLink = function () {
    jumptoCoderpad.keystrokeLink = jumptoCoderpad.coderpadLink + "#" + curHistoryIndex;
    $('#coderpadJumpLink').prop('href', jumptoCoderpad.keystrokeLink);
    setTimeout(refreshLink, 500);
  };
  refreshLink();
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


jumpToCoderpad.fixCss();
jumpToCoderpad.addCoderpadButton();
