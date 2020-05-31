import { TUser } from "./types";
import { EXPIRY_TIME } from "./constants";

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getCurrentPath = (): string =>
  window.location.pathname
    .slice(1)
    .split("-")
    .map((string) => capitalizeFirstLetter(string))
    .join(" ") || "Dashboard";

const getLocalData = (key: string) => {
  const localData = localStorage.getItem(key);
  if (localData) return JSON.parse(localData);
  return {};
};

const setLocalData = (key: string, id: string, value: boolean) => {
  const localData = localStorage.getItem(key);
  const parsedLocalData = localData ? JSON.parse(localData) : {};
  parsedLocalData[id] = { value: value, updatedAt: new Date() };
  return localStorage.setItem(key, JSON.stringify(parsedLocalData));
};

const processUserData = (data: TUser[]): TUser[] => {
  const topUsers = getLocalData("topUsers");
  const blockedUsers = getLocalData("blockedUsers");
  return data.map((user) => {
    const defaultBody = { value: false, updatedAt: new Date() };
    const userId = user.id.toString();
    const { updatedAt, value: isBlocked } = blockedUsers[userId] || defaultBody;
    const { value: isTopUser } = topUsers[userId] || defaultBody;
    const timeDifference =
      Math.abs(new Date().valueOf() - new Date(updatedAt).valueOf()) /
      EXPIRY_TIME;
    return {
      ...user,
      isBlocked: timeDifference <= 1 && timeDifference > 0 && isBlocked,
      isTopUser,
    };
  });
};

const isSubString = (value: string, query: string) =>
  value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1;

export {
  capitalizeFirstLetter,
  getCurrentPath,
  getLocalData,
  setLocalData,
  processUserData,
  isSubString,
};
