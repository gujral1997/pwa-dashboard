const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getCurrentPath = (): string =>
  window.location.pathname
    .slice(1)
    .split("-")
    .map((string) => capitalizeFirstLetter(string))
    .join(" ") || "Dashboard";

export {
  capitalizeFirstLetter,
  getCurrentPath
};
