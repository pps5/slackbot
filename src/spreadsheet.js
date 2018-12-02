const BotResponse = require('./bot_response.js');

function contains(text, searchWord) {
  return text.indexOf(searchWord) > -1;
}

function findTriggerWords(text) {
  const values = getValues();
  for (var i = 0; i < values.length; i++) {
    if (contains(text, values[i][0])) {
      return new BotResponse(values[i]);
    }
  }
  return null;
}

function getValues() {
  const spreadsheetId = IdManager.getTriggerSheetId();
  const values = SpreadsheetApp.openById(spreadsheetId)
        .getDataRange()
        .getValues();
  values.splice(0, 1);
  return values;
}

function writeLog(data) {
  const ss = SpreadsheetApp.openById(IdManager.getLogSheetId());
  data.forEach(function(v) { ss.appendRow(v); });
}

function isAlreadyProcessedEvent(ts) {
  const values = SpreadsheetApp
        .openById(IdManager.getProcessedSheetId())
        .getDataRange()
        .getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == ts) {
      return true;
    }
  }
  return false;
}

function addAlreadyProcessedEvent(ts) {
  SpreadsheetApp
    .openById(IdManager.getProcessedSheetId())
    .appendRow([ts]);
}

module.exports = {
  findTriggerWords,
  writeLog,
  isAlreadyProcessedEvent,
  addAlreadyProcessedEvent
}
