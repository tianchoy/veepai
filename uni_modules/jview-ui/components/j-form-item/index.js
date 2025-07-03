import jFormItem from "./j-form-item.vue"
jFormItem.install = app =>{  //将组件注册到vue中
  app.component(jFormItem.name,jFormItem)
}
export default jFormItem;