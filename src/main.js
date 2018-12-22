global.tryRequire = require('./try_require.js');

const Response = require('./common_response.js');
const EventHandler = require('./event_handler.js');
const PropertyManager = require('./property_manager.js');

global.doPost = function(e) {
  var data = JSON.parse(e.postData.contents);
  console.log('PostData: ' + data);

  if (!isValidToken(data.token)) {
    console.error("Invalid Token: " + data);
    return Response.createErrorResponse();
  }

  if (data.type === "url_verification") {
    console.info("Challenge request");
    return Response.createChallengeResponse();
  }

  new EventHandler(data.event).handleEvent();
  return Response.createSuccessResponse();
}

function isValidToken(reqToken) {
  return PropertyManager.getToken() === reqToken;
}
