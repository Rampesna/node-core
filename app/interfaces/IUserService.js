const ISequelizeService = require('./ISequelizeService');

class IUserService extends ISequelizeService {
    constructor() {
        super();

        if (!this.login) {
            throw new Error('login method is not implemented');
        }

        if (!this.comparePassword) {
            throw new Error('comparePassword method is not implemented');
        }
    }
}

module.exports = IUserService;
