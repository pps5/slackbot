class ReactionResponse {
  constructor(spreadsheetRow) {
    this.triggerWord = spreadsheetRow[0];
    this.reaction = spreadsheetRow[1];
  }
}

module.exports = ReactionResponse;
