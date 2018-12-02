const assert = require('assert');
const sinon = require('sinon');
const spreadsheet = require('../src/spreadsheet.js');
const logger = require('../src/log.js');

const req = {
  "parameter": {},
  "contentLength": 410,
  "parameters": {},
};

const postData = {
  "type": "message",
  "channel": "C2147483705",
  "user": "U2147483697",
  "text": "Hello world",
  "ts": "1355517523.000005"
};

const testValues = [
  ['LogTest1', { message: 'message1' }],
  ['LogTest2', {}],
  ['LogTest3', null],
  [null, {}],
  [null, null]
];

describe('SlackBotLogger', () => {

  describe('#setRequest', () => {
    it('should hold request data', () => {
      logger.setRequest(req);
      assert.equal(logger.request[0][1], 'Request');
      assert.equal(logger.request[0][2], req);
    });
  });

  describe('#setPostData', () => {
    it('should hold post data', () => {
      logger.setPostData(postData);
      assert.equal(logger.postData[0][1], 'PostData');
      assert.equal(logger.postData[0][2], postData);
    });
  });

  describe('#log', () => {
    it('should hold data in log stack', () => {
      testValues.forEach((v) => { logger.log(v[0], v[1]); });
      testValues.forEach((v, i) => {
        assert.equal(logger.logStack[i][1], v[0]);
        assert.equal(logger.logStack[i][2], v[1]);
      });
    });
  });

  describe('#writeLog', () => {
    it('should call spreadsheet#writeLog() for request, postData and log',
       () => {
         spreadsheet.writeLog = () => {};
         const spy = sinon.spy(spreadsheet, 'writeLog')

         logger.writeLog();
         assert.equal(spy.callCount, 3);

         spy.resetHistory();
         logger.request = null;
         logger.writeLog();
         assert.equal(spy.callCount, 2);

         spy.resetHistory();
         logger.postData = null;
         logger.writeLog();
         assert.equal(spy.callCount, 1);

         spy.resetHistory();
         logger.logStack = null;
         logger.writeLog();
         assert.equal(spy.callCount, 0);
       });
  });
});
