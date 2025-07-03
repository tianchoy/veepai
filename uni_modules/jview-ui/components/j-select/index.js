import jSelect from "./j-select.vue"
jSelect.install = app =>{  //将组件注册到vue中
  app.component(jSelect.name,jSelect)
}
export default jSelect;