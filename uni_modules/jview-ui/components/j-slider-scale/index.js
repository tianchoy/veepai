import jSliderScale from "./j-slider-scale.vue"
jSliderScale.install = app =>{  //将组件注册到vue中
  app.component(jSliderScale.name,jSliderScale)
}
export default jSliderScale;