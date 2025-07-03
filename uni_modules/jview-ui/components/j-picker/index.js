import jPicker from "./j-picker.vue"
jPicker.install = app =>{  //将组件注册到vue中
  app.component(jPicker.name,jPicker)
}
export default jPicker;