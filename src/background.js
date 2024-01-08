const rescuetimeAPIKey = process.env.RESCUETIME_API_KEY;
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;
const twilioToNumber = process.env.TWILIO_TO_NUMBER;
const format = "json";
const dailySummaryApiUrl = `https://corsproxy.io/?https://www.rescuetime.com/anapi/data?key=${rescuetimeAPIKey}&format=${format}`;

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

  interactWithTwilio("test");
}

function interactWithRescueTime() {}

function interactWithTwilio(data) {
  const url =
    "https://api.twilio.com/2010-04-01/Accounts/" +
    twilioAccountSID +
    "/Messages.json";

  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(twilioAccountSID + ":" + twilioAuthToken).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams();
  body.append("To", twilioToNumber);
  body.append("From", twilioFromNumber);
  body.append(
    "Body",
    "This is the ship that made the Kessel Run in fourteen parsecs?",
  );

  fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("SMS sent successfully:", data);
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
    });
}
