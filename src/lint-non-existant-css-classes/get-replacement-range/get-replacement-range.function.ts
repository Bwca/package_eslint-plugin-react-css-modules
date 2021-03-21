export function getReplacementRange(propertyName: string, range: [number, number]): [number, number] {
  let [start, end] = range;

  const ispropertyNameInHyphens = propertyName.length < end - start;
  if (ispropertyNameInHyphens) {
    return [++start, --end];
  }
  return range;
}
