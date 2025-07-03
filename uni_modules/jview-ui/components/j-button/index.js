import jButton from "./j-button.vue"
jButton.install = app =>{  //将组件注册到vue中
  app.component(jButton.name,jButton)
}
export default jButton;