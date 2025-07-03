import jCollapseItem from "./j-collapse-item.vue"
jCollapseItem.install = app =>{  //将组件注册到vue中
  app.component(jCollapseItem.name,jCollapseItem)
}
export default jCollapseItem;