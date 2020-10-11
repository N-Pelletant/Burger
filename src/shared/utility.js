export const updateObject = (oldObject, newProps) => {
  return {
    ...oldObject,
    ...newProps,
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = isValid && value.trim() !== '';
  }

  if (rules.isEmail) {
    isValid = isValid && value.match(/\S+@\S+\.\S+/)
  }

  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }

  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }

  return isValid;
}