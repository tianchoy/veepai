import jUpload from "./j-upload.vue"
jUpload.install = app =>{  //将组件注册到vue中
  app.component(jUpload.name,jUpload)
}
export default jUpload;