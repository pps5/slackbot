function contains(text, searchWord) {
    return text.indexOf(searchWord) > -1;
}

function getPostEndpoint() {
    return "https://slack.com/api/chat.postMessage";
}

function shouldProcessEvent(event) {
    if (event.subtype === "bot_message" || !event.user) {
        Logging.log("Event from bot", event);
        return false;
    }
    if (isAlreadyProcessedEvent(event.ts)) {
        Logging.log("Already proccessed", null);
        return false;
    }
    return true;
}

function buildOptions(token, event, botResponse) {
    var options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        "payload": {
            "channel": event.channel,
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
