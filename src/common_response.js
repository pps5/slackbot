function createSuccessResponse() {
  var response = ContentService.createTextOutput(
    JSON.stringify({"ok": true})
  );
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}

function createErrorResponse() {
  const response = ContentService.createTextOutput("400 BadRequest")
  output.setMimeType(ContentService.MimeType.TEXT);
  return response;
}

function createChallengeResponse() {
  var response = ContentService.createTextOutput(
    JSON.stringify({"challenge": data.challenge})
  );
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createChallengeResponse
}
