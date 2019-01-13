const BotResponse = require('./bot_response.js');
const ReactionResponse = require('./reaction_response.js');
const PropertyManager = require('./property_manager.js');

function contains(text, searchWord) {
  return text.indexOf(searchWord) > -1;
}

function findTriggerWords(text, isReaction) {
  const values = getValues(isReaction);
  for (var i = 0; i < values.length; i++) {
    if (contains(text, values[i][0])) {
      if (isReaction) {
        return new ReactionResponse(values[i]);
      } else {
        return new BotResponse(values[i]);
      }
    }
  }
  return null;
}

function getValues(isReaction) {
  var spreadsheetId;
  if (isReaction) {
    spreadsheetId = PropertyManager.getReactionTriggerSheetId();
  } else {
    spreadsheetId = PropertyManager.getTriggerSheetId();
  }
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
