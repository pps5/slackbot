global.tryRequire = require('./try_require.js');

const Logging = require('./log.js');
const Response = require('./common_response.js');
const EventHandler = require('./event_handler.js');
const PropertyManager = require('./property_manager.js');

global.doPost = function(e) {
  var data = JSON.parse(e.postData.contents);
  Logging.setPostData(data);
  Logging.setRequest(e);

  if (!isValidToken(data.token)) {
    Logging.log("Invalid Token", data);
    return Response.createErrorResponse();
  }

  if (data.type === "url_verification") {
    Logging.log("Challenge", data);
    return Response.createChallengeResponse();
  }

  new EventHandler(data.event).handleEvent();
  return Response.createSuccessResponse();
}

function isValidToken(reqToken) {
  return PropertyManager.getToken() === reqToken;
}
