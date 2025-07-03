import jRadioGroup from "./j-radio-group.vue"
jRadioGroup.install = app =>{  //将组件注册到vue中
  app.component(jRadioGroup.name,jRadioGroup)
}
export default jRadioGroup;