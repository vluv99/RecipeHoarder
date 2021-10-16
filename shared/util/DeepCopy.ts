

export function deepCopy<T>(src:T) : {} | [] {
  let target = Array.isArray(src) ? [] : {};

  for (let prop in src) {
    //@ts-ignore
    let value = src[prop];

    if(value && typeof value === 'object') {
      //@ts-ignore
      target[prop] = deepCopy(value);
    } else {
      //@ts-ignore
      target[prop] = value;
    }

  }
  return target;
}
