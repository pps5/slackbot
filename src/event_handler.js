const spreadsheet = require('./spreadsheet.js');
const PropertyManager = require('./property_manager.js');
const Logging = require('./log.js');
const POST_ENDPOINT = "https://slack.com/api/chat.postMessage";

class EventHandler {

  constructor(event) {
    this.event = event;
  }

  handleEvent() {
    if (!this.shouldProcessEvent()) {
      return;
    }
    spreadsheet.addAlreadyProcessedEvent(this.event.ts);
    const botResponse = spreadsheet.findTriggerWords(this.event.text);
    if (botResponse) {
      Logging.log("Found trigger word", botResponse.triggerWord);
      const options = this.createOptions(PropertyManager.getBotToken(), botResponse);
      const response = UrlFetchApp.fetch(POST_ENDPOINT, options);
      Logging.log("Request to slack", this.event);
      Logging.log("Response from slack", response.getContentText());
    }
  }

  createOptions(token, botResponse) {
    var options = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      "payload": {
        "channel": this.event.channel,
        "text": botResponse.text
      }
    };
    if (botResponse.userName) {
      options.payload.username = botResponse.userName;
    }
    if (botResponse.iconUrl) {
      options.payload.icon_url = botResponse.iconUrl;
    } else if (botResponse.iconEmoji) {
      options.payload.icon_emoji = botResponse.iconEmoji;
    }
    options.payload = JSON.stringify(options.payload);
    return options;
  }

  shouldProcessEvent() {
    if (this.event.subtype === 'bot_message' || !this.event.user) {
      Logging.log('Event from bot', this.event);
      return false;
    }
    if (spreadsheet.isAlreadyProcessedEvent(this.event.ts)) {
      Logging.log('Already processed', null);
      return false;
    }
    return true;
  }
}

module.exports = EventHandler;
