import jTransition from "./j-transition.vue"
jTransition.install = app =>{  //将组件注册到vue中
  app.component(jTransition.name,jTransition)
}
export default jTransition;