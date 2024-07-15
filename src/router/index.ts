import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/account-settings",
        name: "profile-edit",
        component: () => import("@/views/crafted/pages/profile/Edit.vue"),
        meta: {
          pageTitle: "Account Settings",
          breadcrumbs: ["Account Settings"],
        },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/hscodes",
        name: "hscodes-list",
        component: () => import("@/views/crafted/pages/hscode/List.vue"),
        meta: {
          pageTitle: "HS CODE List",
          breadcrumbs: ["HS CODE List"],
        },
      },
      {
        path: "/hscodes/:id",
        name: "hscodes-view",
        component: () => import("@/views/crafted/pages/hscode/View.vue"),
        meta: {
          pageTitle: "HS CODE View",
          breadcrumbs: ["HS CODE List", "HS CODE View"],
        },
      },
      {
        path: "/hscodes/edit/:id",
        name: "hscodes-edit",
        component: () => import("@/views/crafted/pages/hscode/Edit.vue"),
        meta: {
          pageTitle: "HS CODE Edit",
          breadcrumbs: ["HS CODE", "HS CODE Edit"],
        },
      },
      {
        path: "/hscodes/create",
        name: "hscodes-create",
        component: () => import("@/views/crafted/pages/hscode/Create.vue"),
        meta: {
          pageTitle: "HS CODE create",
          breadcrumbs: ["HS CODE", "HS CODE create"],
        },
      },

      {
        path: "/countries",
        name: "countries-list",
        component: () => import("@/views/crafted/pages/country/List.vue"),
        meta: {
          pageTitle: "Country List",
          breadcrumbs: ["Country List"],
        },
      },
      {
        path: "/countries/:id",
        name: "countries-view",
        component: () => import("@/views/crafted/pages/country/View.vue"),
        meta: {
          pageTitle: "Country View",
          breadcrumbs: ["Country List", "Country View"],
        },
      },
      {
        path: "/countries/edit/:id",
        name: "countries-edit",
        component: () => import("@/views/crafted/pages/country/Edit.vue"),
        meta: {
          pageTitle: "Country Edit",
          breadcrumbs: ["Country", "Country Edit"],
        },
      },
      {
        path: "/countries/create",
        name: "countries-create",
        component: () => import("@/views/crafted/pages/country/Create.vue"),
        meta: {
          pageTitle: "Country create",
          breadcrumbs: ["Country", "Country create"],
        },
      },

      {
        path: "/currencies",
        name: "currencies-list",
        component: () => import("@/views/crafted/pages/currency/List.vue"),
        meta: {
          pageTitle: "Currency List",
          breadcrumbs: ["Currency List"],
        },
      },
      {
        path: "/currencies/:id",
        name: "currencies-view",
        component: () => import("@/views/crafted/pages/currency/View.vue"),
        meta: {
          pageTitle: "Currency View",
          breadcrumbs: ["Currency List", "Currency View"],
        },
      },
      {
        path: "/currencies/edit/:id",
        name: "currencies-edit",
        component: () => import("@/views/crafted/pages/currency/Edit.vue"),
        meta: {
          pageTitle: "Currency Edit",
          breadcrumbs: ["Currency", "Currency Edit"],
        },
      },
      {
        path: "/currencies/create",
        name: "currencies-create",
        component: () => import("@/views/crafted/pages/currency/Create.vue"),
        meta: {
          pageTitle: "Currency create",
          breadcrumbs: ["Currency", "Currency create"],
        },
      },

      {
        path: "/origin-areas",
        name: "origin-areas-list",
        component: () => import("@/views/crafted/pages/origin-area/List.vue"),
        meta: {
          pageTitle: "Origin Area List",
          breadcrumbs: ["Origin Area List"],
        },
      },
      {
        path: "/origin-areas/:id",
        name: "origin-areas-view",
        component: () => import("@/views/crafted/pages/origin-area/View.vue"),
        meta: {
          pageTitle: "Origin Area View",
          breadcrumbs: ["Origin Area List", "Origin Area View"],
        },
      },
      {
        path: "/origin-areas/edit/:id",
        name: "origin-areas-edit",
        component: () => import("@/views/crafted/pages/origin-area/Edit.vue"),
        meta: {
          pageTitle: "Origin Area Edit",
          breadcrumbs: ["Origin Area", "Origin Area Edit"],
        },
      },
      {
        path: "/origin-areas/create",
        name: "origin-areas-create",
        component: () => import("@/views/crafted/pages/origin-area/Create.vue"),
        meta: {
          pageTitle: "Origin Area create",
          breadcrumbs: ["Origin Area", "Origin Area create"],
        },
      },

      {
        path: "/suppliers",
        name: "suppliers-list",
        component: () => import("@/views/crafted/pages/supplier/List.vue"),
        meta: {
          pageTitle: "Supplier List",
          breadcrumbs: ["Supplier List"],
        },
      },
      {
        path: "/suppliers/:id",
        name: "suppliers-view",
        component: () => import("@/views/crafted/pages/supplier/View.vue"),
        meta: {
          pageTitle: "Supplier View",
          breadcrumbs: ["Supplier List", "Supplier View"],
        },
      },
      {
        path: "/suppliers/edit/:id",
        name: "suppliers-edit",
        component: () => import("@/views/crafted/pages/supplier/Edit.vue"),
        meta: {
          pageTitle: "Supplier Edit",
          breadcrumbs: ["Supplier", "Supplier Edit"],
        },
      },
      {
        path: "/suppliers/create",
        name: "suppliers-create",
        component: () => import("@/views/crafted/pages/supplier/Create.vue"),
        meta: {
          pageTitle: "Supplier create",
          breadcrumbs: ["Supplier", "Supplier create"],
        },
      },
      {
        path: "/customers",
        name: "customers-list",
        component: () => import("@/views/crafted/pages/customer/List.vue"),
        meta: {
          pageTitle: "Customer List",
          breadcrumbs: ["Customer List"],
        },
      },
      {
        path: "/customers/:id",
        name: "customers-view",
        component: () => import("@/views/crafted/pages/customer/View.vue"),
        meta: {
          pageTitle: "Customer View",
          breadcrumbs: ["Customer List", "Customer View"],
        },
      },
      {
        path: "/customers/edit/:id",
        name: "customers-edit",
        component: () => import("@/views/crafted/pages/customer/Edit.vue"),
        meta: {
          pageTitle: "Customer Edit",
          breadcrumbs: ["Customer", "Customer Edit"],
        },
      },
      {
        path: "/customers/create",
        name: "customers-create",
        component: () => import("@/views/crafted/pages/customer/Create.vue"),
        meta: {
          pageTitle: "Customer create",
          breadcrumbs: ["Customer", "Customer create"],
        },
      },
      {
        path: "/users",
        name: "users-list",
        component: () => import("@/views/crafted/pages/users/List.vue"),
        meta: {
          pageTitle: "Users List",
          breadcrumbs: ["Users List"],
        },
      },
      {
        path: "/users/:id",
        name: "users-view",
        component: () => import("@/views/crafted/pages/users/View.vue"),
        meta: {
          pageTitle: "Users View",
          breadcrumbs: ["Users List", "Users View"],
        },
      },
      {
        path: "/users/edit/:id",
        name: "users-edit",
        component: () => import("@/views/crafted/pages/users/Edit.vue"),
        meta: {
          pageTitle: "Users Edit",
          breadcrumbs: ["Users", "Users Edit"],
        },
      },
      {
        path: "/users/create",
        name: "users-create",
        component: () => import("@/views/crafted/pages/users/Create.vue"),
        meta: {
          pageTitle: "Users Edit",
          breadcrumbs: ["Users", "Users Edit"],
        },
      },
      
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
});

export default router;
