import jEmpty from "./j-empty.vue"
jEmpty.install = app =>{  //将组件注册到vue中
  app.component(jEmpty.name,jEmpty)
}
export default jEmpty;