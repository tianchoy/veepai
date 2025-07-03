import jStatusBar from "./j-status-bar.vue"
jStatusBar.install = app =>{  //将组件注册到vue中
  app.component(jStatusBar.name,jStatusBar)
}
export default jStatusBar;