const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const ErrorNotAuth = require('../errors/ErrorNotAuth');
const { INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT, INVALID_EMAIL_FORMAT_ERROR_TEXT } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: INVALID_EMAIL_FORMAT_ERROR_TEXT,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function credentialsSearch(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorNotAuth(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorNotAuth(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
