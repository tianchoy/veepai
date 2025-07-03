import jCheckbox from "./j-checkbox.vue"
jCheckbox.install = app =>{  //将组件注册到vue中
  app.component(jCheckbox.name,jCheckbox)
}
export default jCheckbox;