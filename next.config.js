// module.exports = {
//   exportPathMap: function () {
//     return {
//       '/': { page: '/', query: { title: 'hello-nextjs' } },
//       '/legals': { page: '/legals', query: { title: 'Legals' } },
//       '/505': { page: '/505', query: { title: 'Server Error' } },
//       '/404': { page: '/404', query: { title: 'Page not found' } },
//     }
//   },
// }

module.exports = {
  compress: true,
};

module.exports = {
  api: {
    externalResolver: true,
  },
};

const withPlugins = require('next-compose-plugins');
const less = require('@zeit/next-less');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
module.exports = withPlugins([
  [sass],
  [
    less,
    {
      cssModules: false,
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    },
  ],
  [css],
]);
