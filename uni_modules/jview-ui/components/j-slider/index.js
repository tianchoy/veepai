import jSlider from "./j-slider.vue"
jSlider.install = app =>{  //将组件注册到vue中
  app.component(jSlider.name,jSlider)
}
export default jSlider;