'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("student", {
    studentId: { type: "int", primaryKey: true, autoIncrement: true },
    name: "string",
    class: "int",
    section: "string",
    email: "string",
    password: "string",
    attendanceCount: {type: "int", defaultValue: 0},
  });
};

exports.down = function (db) {
  return db.dropTable("student");
};;

exports._meta = {
  "version": 1
};
