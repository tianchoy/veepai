import jBadge from "./j-badge.vue"
jBadge.install = app =>{  //将组件注册到vue中
  app.component(jBadge.name,jBadge)
}
export default jBadge;