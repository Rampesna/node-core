var fileSystem = require('fs');

/**
 * Yargs Implementation
 * */
const yargs = require('yargs');

yargs.command({
    command: 'generate:module',
    describe: 'Generate a new module',
    handler: function (arguments) {
        var formattedDate = new Date();
        var dateTimeForMigration = formattedDate.getFullYear() + '' +
            String(formattedDate.getMonth() + 1).padStart(2, '0') + '' +
            String(formattedDate.getDate()).padStart(2, '0') + '' +
            String(formattedDate.getHours()).padStart(2, '0') + '' +
            String(formattedDate.getMinutes()).padStart(2, '0') + '' +
            String(formattedDate.getSeconds()).padStart(2, '0');
        var moduleName = arguments.name;
        var ServiceName = moduleName + 'Service';
        var InterfaceName = 'I' + ServiceName;
        var ModelName = moduleName + 'Model';

        if (fileSystem.existsSync('./app/interfaces/' + InterfaceName + '.js')) {
            console.log('Interface already exists!');
        } else {
            var interfaceFile = fileSystem.createWriteStream('./app/interfaces/' + InterfaceName + '.js');
            interfaceFile.write(`const ISequelizeService = require('./ISequelizeService');

class ${InterfaceName} extends ISequelizeService {
    constructor() {
        super();


    }
}

module.exports = ${InterfaceName};`);
        }

        if (fileSystem.existsSync('./app/services/sequelize/' + ServiceName + '.js')) {
            console.log('Service already exists!');
        } else {
            var serviceFile = fileSystem.createWriteStream('./app/services/sequelize/' + ServiceName + '.js');
            serviceFile.write(`const {serviceResponse} = require('../../core/ServiceResponse');
const ${InterfaceName} = require('../../interfaces/${InterfaceName}');
const ${ModelName} = require('../../models/sequelize/${moduleName.toLowerCase()}')();

class ${ServiceName} extends ${InterfaceName} {
    constructor() {
        super();
    }


}

module.exports = new ${ServiceName}();`);
        }

        if (fileSystem.existsSync('./app/models/sequelize/' + moduleName.toLowerCase() + '.js')) {
            console.log('Model already exists!');
        } else {
            var modelFile = fileSystem.createWriteStream('./app/models/sequelize/' + moduleName.toLowerCase() + '.js');
            modelFile.write(`"use strict";
const {
    sequelizeConnection,
    DataTypes,
    Model,
} = require('../../../config/database');

module.exports = () => {
    class ${moduleName} extends Model {
        static associate(models) {

        }
    }

    ${moduleName}.init(
        {
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize: sequelizeConnection,
            paranoid: true,
            modelName: '${moduleName}',
        });

    return ${moduleName};
};`);
        }


        var migrationFile = fileSystem.createWriteStream('./app/migrations/sequelize/' + dateTimeForMigration + '-' + (moduleName.match(/[A-Z][a-z]+|[0-9]+/g).join('-')).toLowerCase() + '.js');
        migrationFile.write(`'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('${moduleName}s', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT.UNSIGNED
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('${moduleName}s');
    }
};`);

        console.log('Module generated successfully!');
    }
});

yargs.command({
    command: 'generate:controller',
    describe: 'Generate a new module',
    handler: function (arguments) {
        console.log(arguments);
        console.log('Controller creating...');
    }
});

yargs.command({
    command: 'generate:request',
    describe: 'Generate a new module',
    handler: function (arguments) {
        console.log(arguments);
        console.log('Request creating...');
    }
});

yargs.parse();
