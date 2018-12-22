const scriptProperties = global
      .tryRequire('./properties_service.js', 'PropertiesService')
      .getScriptProperties();

class PropertyManager {

  static getToken() {
    return scriptProperties.getProperty('SlackToken');
  }

  static getBotToken() {
    return scriptProperties.getProperty('SlackBotToken');
  }

  static getTriggerSheetId() {
    return scriptProperties.getProperty('TriggerSheetId');
  }

  static getLogSheetId() {
    return scriptProperties.getProperty('LogSheetId');
  }

  static getProcessedSheetId() {
    return scriptProperties.getProperty('ProcessedSheetId');
  }
}

module.exports = PropertyManager;
