// get parents
export const getParents = (node, memo) => {
  memo = memo || [];
  const parentNode = node.parentNode;

  if (!parentNode) {
    return memo;
  } else {
    return getParents(parentNode, memo.concat([parentNode]));
  }
};

// event path, event
export const eventPath = event => {
  let path = (event.composedPath && event.composedPath()) || event.path;
  const target = event.target;

  if (path != null) {
    path = path.indexOf(window) < 0 ? path.concat([window]) : path;
    return path;
  }

  if (target === window) {
    return [window];
  }

  return [target].concat(getParents(target)).concat([window]);
};

export default eventPath;
