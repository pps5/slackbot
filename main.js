function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);
        Logging.setPostData(data);
        Logging.setRequest("Original request", e);

        if (!isValidToken(data.token)) {
            Logging.log("Invalid Token", data);
            return createErrorResponse();
        }

        if (data.type === "url_verification") {
            Logging.log("Challenge", data);
            return createChallengeResponse();
        }

        handleEvent(data);
        Logging.writeLog();
    } catch(err) {
        Logging.log("Error", err);
    } finally {
        Logging.writeLog();
    }
    return createSuccessResponse();
}

function isValidToken(reqToken) { return Token.getToken() === reqToken; }

function createSuccessResponse() {
    var response = ContentService.createTextOutput(
        JSON.stringify({"ok": true})
    );
    response.setMimeType(ContentService.MimeType.JSON);
    return response;
}

function createErrorResponse() {
    const response = ContentService.createTextOutput("400 BadRequest")
    output.setMimeType(ContentService.MimeType.TEXT);
    return response;
}

function createChallengeResponse() {
    var response = ContentService.createTextOutput(
        JSON.stringify({"challenge": data.challenge})
    );
    response.setMimeType(ContentService.MimeType.JSON);
    return response;
}

function handleEvent(data) {
    const event = data.event;
    Logging.log("Start handling message", event);

    if (shouldProcessEvent(event)) {
        addAlreadyProcessedEvent(event.ts);
    } else {
        return;
    }

    const botResponse = findTriggerWords(event.text);
    if (botResponse == null) {
        Logging.log("Cannot find trigger word", event.text);
        return;
    }

    Logging.log("find trigger word", botResponse);
    const options = buildOptions(Token.getBotToken(), event, botResponse);
    const response = UrlFetchApp.fetch(getPostEndpoint(), options);
    Logging.log("Request to slack", event);
    Logging.log("Response from slack", response.getContentText());
}
