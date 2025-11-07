const { errorResponse } = require('../utils/response');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const details = error.details.map((d) => d.message);
    return errorResponse(res, 'Validation failed', 400, details);
  }
  next();
};

module.exports = validate;
