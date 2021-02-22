module.exports.urlValidator = (value, helpers) => {
// Throw an error (will be replaced with 'any.custom' error)
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9._]+\.[a-zA-Z]+[a-zA-z\d-._~:/?#[\]@!$&'()*+,;=]*/i;

  if (!regex.test(value)) {
    return helpers.message('Неверный URL');
  }

  // Return the value unchanged
  return value;
};
