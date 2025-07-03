import jNotice from "./j-notice.vue"
jNotice.install = app =>{  //将组件注册到vue中
  app.component(jNotice.name,jNotice)
}
export default jNotice;