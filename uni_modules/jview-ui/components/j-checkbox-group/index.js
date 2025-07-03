import jCheckboxGroup from "./j-checkbox-group.vue"
jCheckboxGroup.install = app =>{  //将组件注册到vue中
  app.component(jCheckboxGroup.name,jCheckboxGroup)
}
export default jCheckboxGroup;