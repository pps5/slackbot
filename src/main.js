global.tryRequire = require('./try_require.js');

const Logging = require('./log.js');
const Response = require('./common_response.js');
const EventHandler = require('./event_handler.js');
const Token = global.tryRequire('./token.js', 'Token');

global.doPost = function(e) {
  try {
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
  } catch(err) {
    Logging.log("Error", err);
  } finally {
    Logging.writeLog();
  }
  return Response.createSuccessResponse();
}

function isValidToken(reqToken) { return Token.getToken() === reqToken; }
