import jFixedView from "./j-fixed-view.vue"
jFixedView.install = app =>{  //将组件注册到vue中
  app.component(jFixedView.name,jFixedView)
}
export default jFixedView;