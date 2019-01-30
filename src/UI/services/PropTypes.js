export const numberMinMax = (min, max) => (props, propName, componentName) => {
  if(typeof props[propName] !== 'number')
    return new Error(`Invalid type of '${propName}' supplied to'${componentName}'. Validation failed.`);
  else if(props[propName] < min || props[propName] > max) {
    const message = `Invalid type of '${propName}' supplied to'${componentName}'. Validation failed.Please make sure that you pass <number> between ${min} and ${max}`;

    return new Error(message);
  }
};