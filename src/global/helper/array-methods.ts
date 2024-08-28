const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined && value !== "";
};

const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

const removeDuplicatesObjectArray = <T extends object>(
  array: T[],
  key: keyof T
): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) {
      return false;
    } else {
      seen.add(val);
      return true;
    }
  });
};

export { notEmpty, removeDuplicates, removeDuplicatesObjectArray };
