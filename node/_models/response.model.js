class Response {
    constructor(success, message, payload = null) {
        this.success = success;
        this.message = message;
        this.payload = payload;
    }
    send() {
        return { success: this.success, message: this.message, payload: this.payload }
    }
}

module.exports = { Response }