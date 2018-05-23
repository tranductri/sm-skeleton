/**
 * All functions and setup regarding authentification and authorization.
 * @module db-helpers/index
 */
import sequelizeFixtures from 'sequelize-fixtures';
import path from 'path';
import migrate from './migrate';
import db from '../models';


/**
 * syncDB - Simple and dirty DB migration to be used in test/dev
 *
 * @function syncDB
 * @memberof  module:db-helpers/index
 * @param  {Object} options - force=boolean, if true, drops all the tables in sync operation
 * @return {Promise} - When the database is done syncing and ready to be used
 */
export function syncDB({ force } = {}) {
    const f = [
        'examples'
    ];
    const fixturePaths = f.map(file => `${path.resolve(__dirname)}/fixtures/${file}.json`);
    return db
        .sequelize
        .sync({ force })
        .then(() => sequelizeFixtures.loadFiles(fixturePaths, db));
}


/**
 * migrateDB - Migrates the database with the migration data in /migrations
 *
 * @function migrateDB
 * @memberof  module:db-helpers/index
 * @return {Promise} - When the database is done migrating and ready to be used
 */
export function migrateDB() {
    return migrate(db.sequelize)
        .up();
}
