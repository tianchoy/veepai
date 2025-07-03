import jSafeBottom from "./j-safe-bottom.vue"
jSafeBottom.install = app =>{  //将组件注册到vue中
  app.component(jSafeBottom.name,jSafeBottom)
}
export default jSafeBottom;