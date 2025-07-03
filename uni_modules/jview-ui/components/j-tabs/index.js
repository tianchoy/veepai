import jTabs from "./j-tabs.vue"
jTabs.install = app =>{  //将组件注册到vue中
  app.component(jTabs.name,jTabs)
}
export default jTabs;