// /path/to/your/popup.js
document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('trigger-button');
  checkButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "buttonClicked"}, function(response) {
      console.log("Message sent to background.js");
      // You can handle any response from background.js here
    });
  }, false);
}, false);
