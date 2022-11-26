class ISequelizeService {
    constructor() {
        if (!this.getAll) {
            throw new Error('getAll method is not implemented');
        }

        if (!this.getById) {
            throw new Error('getById method is not implemented');
        }

        if (!this.delete) {
            throw new Error('delete method is not implemented');
        }
    }
}

module.exports = ISequelizeService;
