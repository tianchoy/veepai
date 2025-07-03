import jLoading from "./j-loading.vue"
jLoading.install = app =>{  //将组件注册到vue中
  app.component(jLoading.name,jLoading)
}
export default jLoading;