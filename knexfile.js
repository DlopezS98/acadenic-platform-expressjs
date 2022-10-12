require('ts-node').register();
const KnexEnvConfig = require('./src/infrastructure/database/knex.config').default;
const Environment = require('./src/config/environment').default;
const config = new KnexEnvConfig(new Environment()).getCurrentConfig();
module.exports = config;