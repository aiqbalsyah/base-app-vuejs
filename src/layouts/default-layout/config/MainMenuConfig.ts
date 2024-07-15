import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Master Data",
    route: "/master-data",
    pages: [
      {
        heading: "HS Code",
        route: "/hscodes",
        keenthemesIcon: "notepad-bookmark",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Item",
        route: "/items",
        keenthemesIcon: "rocket",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Supplier",
        route: "/suppliers",
        keenthemesIcon: "courier",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Customer",
        route: "/customers",
        keenthemesIcon: "user-tick",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Country",
        route: "/countries",
        keenthemesIcon: "airplane",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Origin Area",
        route: "/origin-areas",
        keenthemesIcon: "geolocation",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Currency",
        route: "/currencies",
        keenthemesIcon: "dollar",
        bootstrapIcon: "bi-app-indicator",
      },
      // {
      //   heading: "Pooling Requests",
      //   route: "/pooling-requests",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
      // {
      //   heading: "Clubs",
      //   route: "/clubs",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
      // {
      //   heading: "Events",
      //   route: "/events",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
      // {
      //   heading: "Sports Groups",
      //   route: "/sports-groups",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
      // {
      //   heading: "Sports",
      //   route: "/sports",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      // },
    ],
  },
  {
    heading: "ACCESIBILITY",
    route: "/accessibility",
    pages: [
      {
        heading: "Users",
        route: "/users",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-user",
      },
    ],
  },
];

export default MainMenuConfig;
