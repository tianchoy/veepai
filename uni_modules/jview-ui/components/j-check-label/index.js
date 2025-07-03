import jCheckLabel from "./j-check-label.vue"
jCheckLabel.install = app =>{  //将组件注册到vue中
  app.component(jCheckLabel.name,jCheckLabel)
}
export default jCheckLabel;