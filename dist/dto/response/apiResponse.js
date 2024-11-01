"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    static builder() {
        return new ApiResponseBuilder();
    }
}
exports.ApiResponse = ApiResponse;
class ApiResponseBuilder {
    constructor() {
        this.statusCode = 200;
        this.message = '';
        this.data = null;
    }
    withStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    withMessage(message) {
        this.message = message;
        return this;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    build() {
        return new ApiResponse(this.statusCode, this.message, this.data);
    }
}
//# sourceMappingURL=apiResponse.js.map