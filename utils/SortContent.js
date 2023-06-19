export default function SortContent(a, b) {
  if (a.attributes.reihenfolge < b.attributes.reihenfolge) {
    return -1;
  }
  if (a.attributes.reihenfolge > b.attributes.reihenfolge) {
    return 1;
  }
  return 0;
}
