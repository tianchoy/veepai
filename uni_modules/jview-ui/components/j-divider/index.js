import jDivider from "./j-divider.vue"
jDivider.install = app =>{  //将组件注册到vue中
  app.component(jDivider.name,jDivider)
}
export default jDivider;