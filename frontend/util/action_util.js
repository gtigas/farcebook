export const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return srcValue;
  } else if (_.isBoolean(objValue))
    return srcValue;
}
