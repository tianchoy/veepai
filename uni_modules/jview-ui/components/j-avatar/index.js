import jAvatar from "./j-avatar.vue"
jAvatar.install = app =>{  //将组件注册到vue中
  app.component(jAvatar.name,jAvatar)
}
export default jAvatar;