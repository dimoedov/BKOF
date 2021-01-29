let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let fix_number = 0;
let FixSchema = new Schema({
  number: { //
    type: String,
    required: false,
  },
  master: { //
    type: String,
    required: false
  },
  object: { //
    type: String,
    required: false
  },
  port_obs: { //
    type: String,
    required: false
  },
  text_body: { //
    type: String,
    required: false
  },
  dateS: { //
    type: String,
    required: false
  },
  time: { //
    type: String,
    required: false
  },
  equiment: {
    type: String,
    required: false
  },
  materials: {
    type: String,
    required: false
  },
  print: {
    type: Number,
    required: false
  },

});
module.exports = mongoose.model('Fix', FixSchema);
