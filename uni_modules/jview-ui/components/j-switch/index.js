import jSwitch from "./j-switch.vue"
jSwitch.install = app =>{  //将组件注册到vue中
  app.component(jSwitch.name,jSwitch)
}
export default jSwitch;