import jSliderCode from "./j-slider-code.vue"
jSliderCode.install = app =>{  //将组件注册到vue中
  app.component(jSliderCode.name,jSliderCode)
}
export default jSliderCode;