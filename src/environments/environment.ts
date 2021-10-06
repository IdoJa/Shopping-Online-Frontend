// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userCheckUrl: "http://localhost:3001/api/auth/usercheck/",
  loginUrl: "http://localhost:3001/api/auth/login/",
  registerUrl: "http://localhost:3001/api/auth/register/",
  productsUrl: "http://localhost:3001/api/products/",
  categoriesUrl: "http://localhost:3001/api/categories/",
  ordersUrl: "http://localhost:3001/api/orders/",
  userCartUrl: "http://localhost:3001/api/usercart/",
  cartItemsUrl: "http://localhost:3001/api/cartItems/",
  citiesUrl: "http://localhost:3001/api/cities/",
  invoiceUrl: "http://localhost:3001/api/invoice/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
