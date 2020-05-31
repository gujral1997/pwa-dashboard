import { TUser } from "./types";

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

const processUserData = (data: TUser[]): TUser[] => {
  const topUsers = getLocalData("topUsers");
  const blockedUsers = getLocalData("blockedUsers");
  return data.map((user) => {
    const defaultBody = { value: false, updatedAt: new Date() }
    const userId = user.id.toString()
    const { value: isBlocked } = blockedUsers[userId] || defaultBody;
    const { value: isTopUser } = topUsers[userId] || defaultBody
    return { ...user, isBlocked, isTopUser };
  });
};


export {
  capitalizeFirstLetter,
  getCurrentPath,
  getLocalData,
  processUserData,
};
