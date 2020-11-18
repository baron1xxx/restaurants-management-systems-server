// export default [
//   '/auth/login',
//   '/auth/register',
//   '/auth/activate',
//   '/auth/activate/:token',
//   '/auth/password/change/:token',
//   '/auth/password/forgot',
//   '/auth/google',
//   '/auth/facebook'
// ];

// Express Route Tester Package Version 2.0, OPTION (Strict, End)!!!
export default [
  // Auth routers
  /^\/auth\/login$/i, // '/auth/login',
  /^\/auth\/register$/i, // '/auth/register',
  /^\/auth\/activate$/i, // '/auth/activate',
  /^\/auth\/activate\/((?:[^/]+?))$/i, // '/auth/activate/:token'
  /^\/auth\/password\/change\/((?:[^/]+?))$/i, //  '/auth/password/change/:token'
  /^\/auth\/password\/forgot$/i, // '/auth/password/forgot',
  /^\/auth\/google$/i, // '/auth/google',
  /^\/auth\/facebook$/i, // '/auth/facebook',
  // Restaurant routers
  /^\/restaurants$/i, // '/restaurants',
  /^\/restaurant\/((?:[^/]+?))$/i, // '/restaurant/:id'
  // Menu routers
  /^\/menus$/i, // '/menus',
  /^\/menus\/((?:[^/]+?))$/i, // /menus/:id
  /^\/menus\/byRestaurant\/((?:[^/]+?))$/i // '/menus/byRestaurant/:restaurantId'
];
