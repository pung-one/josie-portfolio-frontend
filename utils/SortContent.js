export default function SortContent(a, b) {
  if (a.reihenfolge > b.reihenfolge) {
    return -1;
  }
  if (a.reihenfolge < b.reihenfolge) {
    return 1;
  }
  return 0;
}
