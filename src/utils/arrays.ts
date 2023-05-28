export function calculateTotalNestedArrayLength(arr: Array<Array<unknown>>): number {
  return arr.reduce((acc, val) => acc + val.length, 0);
}
