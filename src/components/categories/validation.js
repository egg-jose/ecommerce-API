//Validation
const Joi = require('joi');

module.exports.validateData = (data, update = false) => {
  if (!update) {
    return Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    }).validate(data);
  } else {
    return Joi.object({
      name: Joi.string(),
      description: Joi.string(),
    }).validate(data);
  }
};
