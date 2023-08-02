export const resizeToMobile = () => {
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 500,
  });

  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 300,
  });

  window.dispatchEvent(new Event("resize"));
};
