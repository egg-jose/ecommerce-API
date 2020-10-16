//Validation
const Joi = require('joi');

module.exports.validateData = (data, update = false) => {
  if (!update) {
    return Joi.object({
      name: Joi.string().required(),
      company: Joi.string().required(),
      price: Joi.number().required(),
      amount: Joi.number().required(),
      features: Joi.array(),
      category: Joi.string(),
    }).validate(data);
  } else {
    return Joi.object({
      name: Joi.string(),
      company: Joi.string(),
      price: Joi.number(),
      amount: Joi.number(),
      features: Joi.array(),
      category: Joi.string(),
    }).validate(data);
  }
};
