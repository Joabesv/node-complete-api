export function extractQueryParams(query) {
  // lord help me on this one, is going to be ugly
  return query
    .substr(1)
    .split('&')
    .reduce((qParams, param) => {
      const [key, value] = param.split('=');

      qParams[key] = value;

      return qParams;
    }, {});
}
