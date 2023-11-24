export function countCharsWithoutSpaces(paragraph) {
  const regex = /[^\s\\]/g;
  return (paragraph.match(regex) || []).length;
}

export function countCharsWithSpaces(paragraph) {
  return paragraph?.length || 0;
}
