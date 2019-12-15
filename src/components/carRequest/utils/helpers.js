export function insertItem(array, item, index) {
  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index),
  ];
}

export function removeById(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function replaceItem(array, newItem, index) {
  return [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index + 1),
  ];
}

export const replaceElement = (array, oldElement, newElement) => {
  const index = array.indexOf(oldElement);
  return replaceItem(array, newElement, index);
}

export const removeItem = (arr, elem) => {
  if (!arr.includes(elem)) return;
  const index = arr.indexOf(elem);
  return removeById(arr, index);
};

export const removeObjWithProp = (arr, prop, value) => {
  // if (!arr.includes(elem)) return;
  const index = arr.findIndex(item => item[prop] === value);
  return removeById(arr, index);
};

export // console.log(arr, prop, value);
const includeObjWithProp = (arr, prop, value) => arr.some(item => item[prop] === value);
