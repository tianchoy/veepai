import jCollapse from "./j-collapse.vue"
jCollapse.install = app =>{  //将组件注册到vue中
  app.component(jCollapse.name,jCollapse)
}
export default jCollapse;