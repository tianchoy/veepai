import jImage from "./j-image.vue"
jImage.install = app =>{  //将组件注册到vue中
  app.component(jImage.name,jImage)
}
export default jImage;