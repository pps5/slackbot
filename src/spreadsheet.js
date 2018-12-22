const BotResponse = require('./bot_response.js');
const PropertyManager = require('./property_manager.js');

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
  const spreadsheetId = PropertyManager.getTriggerSheetId();
  const values = SpreadsheetApp.openById(spreadsheetId)
        .getDataRange()
        .getValues();
  values.splice(0, 1);
  return values;
}

function writeLog(data) {
  const ss = SpreadsheetApp.openById(PropertyManager.getLogSheetId());
  data.forEach(function(v) { ss.appendRow(v); });
}

function isAlreadyProcessedEvent(ts) {
  const values = SpreadsheetApp
        .openById(PropertyManager.getProcessedSheetId())
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
    .openById(PropertyManager.getProcessedSheetId())
    .appendRow([ts]);
}

module.exports = {
  findTriggerWords,
  writeLog,
  isAlreadyProcessedEvent,
  addAlreadyProcessedEvent
}
