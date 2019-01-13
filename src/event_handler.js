const spreadsheet = require('./spreadsheet.js');
const PropertyManager = require('./property_manager.js');
const MESSAGE_POST_ENDPOINT = "https://slack.com/api/chat.postMessage";
const REACTION_POST_ENDPOINT = "https://slack.com/api/reactions.add";

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
      console.log("Found trigger word: " + botResponse.triggerWord);
      const options = this.createOptions(PropertyManager.getBotToken(), botResponse);
      const response = UrlFetchApp.fetch(MESSAGE_POST_ENDPOINT, options);
      console.log("Request to slack: " + this.event);
      console.log("Response from slack: " + response.getContentText());
    }
  }

  handleReaction() {
    const reactionResponse = spreadsheet.findTriggerWords(this.event.text, true);
    if (reactionResponse) {
      console.log("Found trigger word: " + reactionResponse.triggerWord);
      const options = {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + PropertyManager.getBotToken()
        },
        "payload": JSON.stringify({
          "channel": this.event.channel,
          "name": reactionResponse.reaction,
          "timestamp": this.event.event_ts
        })
      };
      const response = UrlFetchApp.fetch(REACTION_POST_ENDPOINT, options);
      console.log("Request to slack: " + JSON.stringify(options));
      console.log("Response from slack: " + response.getContentText());
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
      console.log('Event from bot', this.event);
      return false;
    }
    if (spreadsheet.isAlreadyProcessedEvent(this.event.ts)) {
      console.log('Already processed', null);
      return false;
    }
    return true;
  }
}

module.exports = EventHandler;
