import jNavbar from "./j-navbar.vue"
jNavbar.install = app =>{  //将组件注册到vue中
  app.component(jNavbar.name,jNavbar)
}
export default jNavbar;