import isEmpty from 'lodash/isEmpty';
import { emptyBlocksForm } from '@plone/volto/helpers/Blocks/Blocks';

export function countCharsWithoutSpaces(paragraph) {
  const regex = /[^\s\\]/g;
  return (paragraph.match(regex) || []).length;
}

export function countCharsWithSpaces(paragraph) {
  return paragraph?.length || 0;
}

// Fill an emptied group right away. Filling it later, after the empty group
// was saved, adds an undo history entry that every undo lands on and
// refills, so undo gets stuck.
export const fillEmptyGroup = (childData) =>
  isEmpty(childData?.blocks)
    ? { ...childData, ...emptyBlocksForm() }
    : childData;
