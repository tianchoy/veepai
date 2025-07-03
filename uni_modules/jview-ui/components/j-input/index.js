import jInput from "./j-input.vue"
jInput.install = app =>{  //将组件注册到vue中
  app.component(jInput.name,jInput)
}
export default jInput;