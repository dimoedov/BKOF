let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FixSchema = new Schema({
  number: {
    type: String,
    default: '000',
    increment: 1,
    required: false,
  },
  master: {
    type: String,
    required: false
  },
  object: {
    type: String,
    required: false
  },
  port_obs: {
    type: String,
    required: false
  },
  client: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  equiment: {
    type: String,
    required: false
  },
  serial_nomber: {
    type: String,
    required: false
  },
  materials_name: {
    type: String,
    required: false
  },
  materials_units: {
    type: String,
    required: false
  },
  materials_qty: {
    type: String,
    required: false
  },
  etc: {
    type: String,
    required: false
  },

});

module.exports = mongoose.model('Fix', FixSchema);
