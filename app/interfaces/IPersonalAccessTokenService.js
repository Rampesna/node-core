class IPersonalAccessTokenService {
    constructor() {
        if (!this.generateToken) {
            throw new Error('generateToken is not implemented');
        }

        if (!this.validateToken) {
            throw new Error('validateToken is not implemented');
        }
    }
}

module.exports = IPersonalAccessTokenService;
