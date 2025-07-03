import jSwiper from "./j-swiper.vue"
jSwiper.install = app =>{  //将组件注册到vue中
  app.component(jSwiper.name,jSwiper)
}
export default jSwiper;