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
        var ControllerName = moduleName + 'Controller';

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

    async getAll() {
        let all${moduleName}s = await ${ModelName}.findAll();
        return serviceResponse(
            true,
            'All ${moduleName}s',
            all${moduleName}s,
            200
        );
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
        }
    );

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

        if (fileSystem.existsSync('./app/http/controllers/' + moduleName + '.js')) {
            console.log('Model already exists!');
        } else {
            var controllerFile = fileSystem.createWriteStream('./app/http/controllers/' + ControllerName + '.js');
            controllerFile.write(`const ${ServiceName} = require('../../services/sequelize/${ServiceName}');
            
exports.getAll = async (request, response) => {
    serviceResponse = await ${ServiceName}.getAll();
    response.send(serviceResponse, serviceResponse.statusCode);
}

`);
        }

        if (fileSystem.existsSync('./routes/' + moduleName.toLowerCase() + '.js')) {
            console.log('Router already exists!');
        } else {
            var routerFile = fileSystem.createWriteStream('./routes/' + moduleName.toLowerCase() + '.js');
            routerFile.write(`const express = require('express');
const router = express.Router();

const AuthenticationMiddleware = require('../app/http/middlewares/AuthenticationMiddleware');

// Controllers
const ${ControllerName} = require('../app/http/controllers/${ControllerName}');

// Requests
const GetAllRequest = require("../app/http/requests/${ControllerName}/GetAllRequest");

router.use(AuthenticationMiddleware);
router.get('/getAll', GetAllRequest, ${ControllerName}.getAll);

module.exports = router;`);
        }

        fileSystem.mkdirSync('./app/http/requests/' + ControllerName);
        var requestFile = fileSystem.createWriteStream('./app/http/requests/' + ControllerName + '/GetAllRequest.js');
        requestFile.write(`const {serviceResponse} = require("../../../core/ServiceResponse");
const Joi = require('joi');
const Schema = Joi.object({

});

const GetAllRequest = async (
    request,
    response,
    next
) => {
    try {
        await Schema.validateAsync(request.props);
        next();
    } catch (error) {
        return response.send(serviceResponse(
            false,
            'Invalid request',
            error.details,
            422
        ), 422);
    }
};

module.exports = GetAllRequest;
`);

        console.log('Module generated successfully!');
    }
});

yargs.command({
    command: 'generate:request',
    describe: 'Generate a new request',
    handler: function (arguments) {
        if (!arguments.path) {
            console.log('Please provide a path to the request.');
            return;
        }

        if (!arguments.name) {
            console.log('Please provide a name to the request.');
            return;
        }

        var additionalBackPathCount = 0;
        var additionalBackPaths = '';
        var requestPath = '';
        var pathList = arguments.path.split('/');
        pathList.forEach(function (path) {
            if (path) {
                requestPath += path + '/';
                if (additionalBackPathCount > 0) {
                    additionalBackPaths += '../';
                }
            }
            if (!fileSystem.existsSync('./app/http/requests/' + requestPath)) {
                fileSystem.mkdirSync('./app/http/requests/' + requestPath);
            }
            additionalBackPathCount++;
        });


        if (fileSystem.existsSync('./app/http/requests/' + requestPath + arguments.name + '.js')) {
            console.log('Request already exists!');
            return;
        }

        var requestFile = fileSystem.createWriteStream('./app/http/requests/' + requestPath + arguments.name + '.js');
        requestFile.write(`const {serviceResponse} = require("../../../${additionalBackPaths}core/ServiceResponse");
const Joi = require('joi');
const Schema = Joi.object({

});

const ${arguments.name} = async (
    request,
    response,
    next
) => {
    try {
        await Schema.validateAsync(request.props);
        next();
    } catch (error) {
        return response.send(serviceResponse(
            false,
            'Invalid request',
            error.details,
            422
        ), 422);
    }
};

module.exports = ${arguments.name};
`);

        console.log('Request generated successfully!');
    }
});

yargs.parse();
