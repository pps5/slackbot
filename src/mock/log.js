class TestLogger {
    constructor() {
        this.logStack = [];
    }

    setRequest(request) {
        console.log(Date(), "Request", request);
    }

    setPostData(postData) {
        console.log(Date(), "PostData", postData);
    }

    log(message, data) {
        console.log(Date(), message, data);
    }

    writeLog() { /* no-op */ }
}

module.exports = new TestLogger();
