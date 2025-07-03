import jPreview from "./j-preview.vue"
jPreview.install = app =>{  //将组件注册到vue中
  app.component(jPreview.name,jPreview)
}
export default jPreview;