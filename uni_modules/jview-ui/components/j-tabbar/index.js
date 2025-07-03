import jTabbar from "./j-tabbar.vue"
jTabbar.install = app =>{  //将组件注册到vue中
  app.component(jTabbar.name,jTabbar)
}
export default jTabbar;