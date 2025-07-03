import jLoadingIcon from "./j-loading-icon.vue"
jLoadingIcon.install = app =>{  //将组件注册到vue中
  app.component(jLoadingIcon.name,jLoadingIcon)
}
export default jLoadingIcon;