const spreadsheet = require('./spreadsheet.js');

class SlackBotLogger {
  constructor() {
    this.logStack = [];
  }

  setRequest(request) {
    this.request = [[Date(), "Request", request]];
  }

  setPostData(postData) {
    this.postData = [[Date(), "PostData", postData]];
  }

  log(message, data) {
    this.logStack.push([Date(), message, data]);
  }

  writeLog() {
    if (this.request) {
      spreadsheet.writeLog(this.request);
    }
    if (this.postData) {
      spreadsheet.writeLog(this.postData);
    }
    if (this.logStack) {
      spreadsheet.writeLog(this.logStack);
    }
  }
}

module.exports = new SlackBotLogger();
