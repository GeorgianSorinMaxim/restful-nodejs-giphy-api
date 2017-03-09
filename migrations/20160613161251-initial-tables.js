'use strict'

exports.up = function (db, callback) {
    return db.runSql(`
        CREATE TABLE giphys (
            giphy_id serial PRIMARY KEY,
            query text NOT NULL UNIQUE,
            url text NOT NULL,
            created_at timestamp DEFAULT current_timestamp NOT NULL,
            updated_at timestamp
        );
    `, callback)
}

exports.down = function (db, callback) {
    return db.runSql(`
        DROP TABLE giphys;
    `, callback)
}

exports.insert = function (db, callback) {
    return db.runSql(`
        INSERT INTO giphys;
    `, callback)
}

exports.get = function (db, callback) {
    return db.runSql(`
        GET * FROM giphys;
    `, callback)
}

exports.delete = function (db, callback) {
    return db.runSql(`
        DELETE FROM giphys;
    `, callback)
}