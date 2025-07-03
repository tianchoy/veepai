import jTag from "./j-tag.vue"
jTag.install = app =>{  //将组件注册到vue中
  app.component(jTag.name,jTag)
}
export default jTag;