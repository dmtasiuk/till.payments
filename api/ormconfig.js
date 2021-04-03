const databaseConfig = require('./src/config/database');
const path = require('path');

module.exports = [
  Object.assign(databaseConfig.default, {
    name: 'default',
    driver: databaseConfig.default.type,
    entities: ['src/**/**/*.entity.ts'],
    migrations: ['database/migrations/**/*.ts'],
    seeds: ['database/seeds/**/*.ts'],
    factories: ['database/factories/**/*.ts'],
    synchronize: false,
  }),
];
