const apiKey = process.env.RESCUETIME_API_KEY
const format = 'json';
const dailySummaryApiUrl = `https://corsproxy.io/?https://www.rescuetime.com/anapi/data?key=${apiKey}&format=${format}`;

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "buttonClicked") {
      handleButtonClick();
    }
    // Optionally, you can send a response back to the popup
    // sendResponse({status: "received"});
  }
);

// Handle the button click event
function handleButtonClick() {
  console.log("Button clicked in popup, handling in background...");

  fetch(dailySummaryApiUrl, {
  }).then(function(response) {
    console.log(response.json());
  }).catch(function(error) {
    console.log(error);
  })
}

function interactWithRescueTime() {
}

function interactWithTwilio(data) {
  // TODO: Implement Twilio API interaction
}
