// Utils
export function delay(func, ms) {
  if (!ms) ms = 500;
  setTimeout(() => func(), ms);
}
