var Logging = new SlackBotLogger();

function SlackBotLogger() {
  this.logList = [];
}

SlackBotLogger.prototype.setRequest = function(request) {
    this.request = [[Date(), "Request", request]];
}

SlackBotLogger.prototype.setPostData = function(postData) {
    this.postData = [[Date(), "PostData", postData]];
}

SlackBotLogger.prototype.log = function(message, data) {
    this.logList.push([Date(), message, data]);
}

SlackBotLogger.prototype.writeLog = function() {
    if (this.request) {
        writeLog(this.request);
    }
    if (this.postData) {
        writeLog(this.postData);
    }
    writeLog(this.logList);
}
