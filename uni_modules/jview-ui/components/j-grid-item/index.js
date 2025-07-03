import jGridItem from "./j-grid-item.vue"
jGridItem.install = app =>{  //将组件注册到vue中
  app.component(jGridItem.name,jGridItem)
}
export default jGridItem;