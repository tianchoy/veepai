import jCard from "./j-card.vue"
jCard.install = app =>{  //将组件注册到vue中
  app.component(jCard.name,jCard)
}
export default jCard;