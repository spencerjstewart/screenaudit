const rescuetimeAPIKey = process.env.RESCUETIME_API_KEY;
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const format = "json";
const dailySummaryApiUrl = `https://corsproxy.io/?https://www.rescuetime.com/anapi/data?key=${rescuetimeAPIKey}&format=${format}`;
import twilio from "twilio";

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "buttonClicked") {
    handleButtonClick();
  }
  // Optionally, you can send a response back to the popup
  // sendResponse({status: "received"});
});

// Handle the button click event
function handleButtonClick() {
  console.log("Button clicked in popup, handling in background...");

  fetch(dailySummaryApiUrl, {})
    .then(function (response) {
      console.log(response.json());
    })
    .catch(function (error) {
      console.log(error);
    });
}

function interactWithRescueTime() {}

function interactWithTwilio(data) {
  const client = require("twilio")(twilioAccountSID, twilioAuthToken);
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: twilioNumber,
      to: "+17372994886",
    })
    .then((message) => console.log(message.sid));
}
