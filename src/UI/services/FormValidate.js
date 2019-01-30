import Validator from 'validator';

export const signInValidate = values => {
  const errors = {};

  validateEmail(values, errors);
  validatePassword(values, errors);

  return errors;
};

function validatePassword(values, errors) {
  if(!values.password)
    errors.password = 'Please enter your Password';
  if(values.password && (values.password.length < 6 || values.password.length > 128))
    errors.password = 'Password length should be between 6 and 128 symbols';
  if(values.password && values.password.match(/\s+/))
    errors.password = 'Password must not contains spaces';
}

function validateEmail(values, errors) {
  if(!values.email)
    errors.email = 'Please enter email';
  else if(!Validator.isEmail(values.email.trim()))
    errors.email = 'Invalid email address';

  return errors;
}