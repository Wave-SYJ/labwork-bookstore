type ParamObj = { [key: string]: string | number | undefined | null };

export function makeUrl(baseUrl: string, paramObj?: ParamObj) {
  if (paramObj === undefined) return baseUrl;
  return (
    baseUrl +
    '?' +
    Object.keys(paramObj)
      .filter((key) => paramObj[key] !== null && paramObj[key] !== undefined)
      .map((key) => key + '=' + paramObj[key])
      .join('&')
  );
}
