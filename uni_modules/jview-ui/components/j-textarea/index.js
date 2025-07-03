import jTextarea from "./j-textarea.vue"
jTextarea.install = app =>{  //将组件注册到vue中
  app.component(jTextarea.name,jTextarea)
}
export default jTextarea;