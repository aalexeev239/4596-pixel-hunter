export default function isInteger(value) {
  return typeof value === 'number'
    && isFinite(value)
    && !(value % 1);
}
