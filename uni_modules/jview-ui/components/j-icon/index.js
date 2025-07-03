import jIcon from "./j-icon.vue"
jIcon.install = app =>{  //将组件注册到vue中
  app.component(jIcon.name,jIcon)
}
export default jIcon;