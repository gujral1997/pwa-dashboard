const drawerRoutes = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Sports",
    path: "/sports",
  },
  {
    name: "Log Out",
    path: "/log-out",
  },
];

const headerRoutes = [
  {
    name: "Users",
    path: "/users",
  },
  {
    name: "Top Users",
    path: "/top-users",
  },
];

const emptyRoutes = [
  "/",
  "/home",
  "/sports",
  "/news",
  "/log-out",
  "/top-users",
];

const normalUserHeadings = ["Name", "Email", "Top User", "Block/Unblock"];

export {
  headerRoutes,
  drawerRoutes,
  emptyRoutes,
  normalUserHeadings,
};
