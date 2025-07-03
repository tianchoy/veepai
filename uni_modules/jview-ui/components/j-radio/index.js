import jRadio from "./j-radio.vue"
jRadio.install = app =>{  //将组件注册到vue中
  app.component(jRadio.name,jRadio)
}
export default jRadio;