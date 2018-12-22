class PropertiesService {

  static getScriptProperties() {
    return {
      getProperty: function(key) {
        if (this.values[key]) {
          return this.values[key]
        } else {
          return null;
        }
      },
      values: {
        SlackToken: 'SlackToken',
        SlackBotToken: 'SlackBotToken',
        LogSheetId: 'LogSheetId',
        TriggerSheetId: 'TriggerSheetId',
        ProcessedSheetId: 'ProcessedSheetId'
      }
    }
  }
}

module.exports = PropertiesService;
