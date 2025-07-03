import jLine from "./j-line.vue"
jLine.install = app =>{  //将组件注册到vue中
  app.component(jLine.name,jLine)
}
export default jLine;