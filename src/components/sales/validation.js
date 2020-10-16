//Validation
const Joi = require('joi');

module.exports.validateData = data => {
  return Joi.object({
    user: Joi.string(),
    products: Joi.array(),
    paid: Joi.number(),
  }).validate(data);
};

module.exports.validateProduct = data => {
  return Joi.object({
    products: Joi.string(),
  }).validate(data);
};
