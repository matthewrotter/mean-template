var mongoose = require('mongoose'),
  _ = require('underscore'),
  config = require('../config'),
  conn;

var asc = 1,
  desc = -1;

/*
 * BEER: for disabled, only update the disabled flag....
 */


/*
 * Program stuff
 */
var ProgramSchema = new mongoose.Schema({
  name: String,
  type: String,
  content: String,
  created: Date,
  modified: Date,
  disabled: {
    type: Boolean,
    default: false
  }
});

// indexes for listing jobs
ProgramSchema.index({
  type: desc
});

var Program = mongoose.model('Program', ProgramSchema);

/*-------- implement CRUD -------*/

// read; filter is a mongoose/mongo query pattern
Program.read = function(filter, callback) {
  Program.find(filter, function(err, result) {
    callback(err, result);
  });
};

// create
Program.create = function(program, callback) {
  var newProgram = new Program({
    name: program.name,
    type: program.type,
    content: program.content,
    created: Date.now(),
    modified: Date.now(),
    disabled: program.disabled
  });
  newProgram.save(function(err) {
    callback(err, newProgram);
  });
};

// update
Program.update = function(program, callback) {
  console.log('B', program);
  // find existing by uuid
  Program.findById(program._id, function(err, existing) {
    var updated = _.extend(existing, {
      name: program.name,
      type: program.type,
      content: program.content,
      locations: program.locations,
      modified: Date.now(),
      disabled: program.disabled
    });

    updated.save(function(err) {
      callback(err, updated);
    });
  });
};

Program.delete = function(_id, callback) {
  Program.findByIdAndRemove(_id, function(err) {
    callback(err, _id);
  });
};

exports.Program = Program;

var uri = config.mongo;
if (!conn) {
  conn = mongoose.connect(uri);
}
console.log('connected to mongo');
