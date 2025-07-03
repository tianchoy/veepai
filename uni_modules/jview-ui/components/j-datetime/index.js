import jDatetime from "./j-datetime.vue"
jDatetime.install = app =>{  //将组件注册到vue中
  app.component(jDatetime.name,jDatetime)
}
export default jDatetime;