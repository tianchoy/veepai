import jCell from "./j-cell.vue"
jCell.install = app =>{  //将组件注册到vue中
  app.component(jCell.name,jCell)
}
export default jCell;