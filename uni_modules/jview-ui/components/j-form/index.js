import jForm from "./j-form.vue"
jForm.install = app =>{  //将组件注册到vue中
  app.component(jForm.name,jForm)
}
export default jForm;