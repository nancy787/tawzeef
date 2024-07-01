const routes = [
  {
    name: "services",
    path: "/services",
    component: "components/services"
  },
  {
    name: "service_details",
    path: "/services/:id",
    component: "components/services/service_details.vue"
  }
  // {
  //   name: "blogs",
  //   path: "/blogs",
  //   component: "components/blogs"
  // },
];
export default routes;
