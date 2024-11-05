"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileResponse = void 0;
class ProfileResponse {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.createdAt = user.createdAt;
    }
}
exports.ProfileResponse = ProfileResponse;
//# sourceMappingURL=ProfileResponse.dto.js.map