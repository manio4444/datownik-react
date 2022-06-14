/*
Workaround for using absolute paths on WebStorm
https://stackoverflow.com/questions/54518538/how-to-use-jsconfig-path-with-webstorm
 */

System.config({
  paths: {
    'api/*': './src/api/*',
    'components/*': './src/components/*',
    pages: './src/pages',
    'pages/*': './src/pages/*',
    router: './src/router',
    'router/*': './src/router/*',
    'shared/*': './src/shared/*',
    'utils/*': './src/utils/*',
  },
});
