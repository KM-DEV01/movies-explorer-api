const mongoose = require('mongoose');
const {
  castErrorMsg, validationErrorMsg, notFoundMsg, internalErrorMsg,
} = require('../consts/status-messages');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR } = require('../consts/status-codes');

// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(NOT_FOUND).send({ message: notFoundMsg });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(BAD_REQUEST).send({ message: castErrorMsg });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: validationErrorMsg });
    return;
  }
  if (!err.statusCode) {
    res.status(INTERNAL_ERROR).send({ message: internalErrorMsg });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
};
