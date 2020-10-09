export default (oldObject, newProps) => {
  return {
    ...oldObject,
    ...newProps,
  }
}

