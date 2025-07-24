const sliceCharacters = (title : string) => {
  if (!title) {
    return '-';
  }

  if (title.length > 35) {
    return title.slice(0,23) + '...';
  }

  return title;
};
 const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


export {sliceCharacters,debounce}