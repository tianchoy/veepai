import jGrid from "./j-grid.vue"
jGrid.install = app =>{  //将组件注册到vue中
  app.component(jGrid.name,jGrid)
}
export default jGrid;