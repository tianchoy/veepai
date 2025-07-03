import jSticky from "./j-sticky.vue"
jSticky.install = app =>{  //将组件注册到vue中
  app.component(jSticky.name,jSticky)
}
export default jSticky;