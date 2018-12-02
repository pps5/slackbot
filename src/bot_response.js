class BotResponse {
  constructor(spreadsheetRow) {
    this.triggerWord = spreadsheetRow[0];
    this.text = spreadsheetRow[1];
    this.userName = spreadsheetRow[2];
    this.iconUrl = spreadsheetRow[3];
    this.iconEmoji = spreadsheetRow[4];
  }
}

module.exports = BotResponse;
