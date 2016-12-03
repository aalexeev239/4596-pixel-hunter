const getClosestNode = (node, className) => {
  while (node !== document.documentElement) {
    if (node.classList.contains(className)) {
      return node;
    }
    node = node.parentNode;
  }

  return null;
};

export default getClosestNode;
