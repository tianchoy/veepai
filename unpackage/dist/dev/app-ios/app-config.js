const __uniConfig = {"pages":[],"globalStyle":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"appname":"veepai","compilerVersion":"4.66","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","themeConfig":{}};
__uniConfig.getTabBarConfig = () =>  {return undefined};
__uniConfig.tabBar = __uniConfig.getTabBarConfig();
const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"navigationStyle":"custom"}},{"path":"pages/message/message","meta":{"navigationStyle":"custom"}},{"path":"pages/mine/mine","meta":{"navigationStyle":"custom"}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute)).concat(typeof __uniSystemRoutes !== 'undefined' ? __uniSystemRoutes : []);

