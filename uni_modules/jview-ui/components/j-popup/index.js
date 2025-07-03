import jPopup from "./j-popup.vue"
jPopup.install = app =>{  //将组件注册到vue中
  app.component(jPopup.name,jPopup)
}
export default jPopup;