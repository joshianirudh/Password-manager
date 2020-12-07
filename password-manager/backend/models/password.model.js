const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Password = mongoose.model('Password', exerciseSchema);

module.exports = Password;