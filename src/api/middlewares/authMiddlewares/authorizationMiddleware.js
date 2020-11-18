import jwtAccessTokenMiddleware from './jwtAccessTokenMiddleware';

// export default (routesWhiteList = []) => (req, res, next) => {
//   return routesWhiteList.some(route => !['POST', 'PUT', 'DELETE'].includes(req.method) || req.path.match(route))
//     ? next()
//     : jwtAccessTokenMiddleware(req, res, next);
// };

export default (routesWhiteList = []) => (req, res, next) => {
  console.log('***************');
  console.log(req.path);
  console.log(req.path.match(/^\/menus\/((?:[^/]+?))$/i));
  console.log(routesWhiteList.some(route => req.path.match(route)));
  console.log('***************');
  return (routesWhiteList.some(route => req.path.match(route))
    ? next()
    : jwtAccessTokenMiddleware(req, res, next));
};

