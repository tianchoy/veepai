import jScrollView from "./j-scroll-view.vue"
jScrollView.install = app =>{  //将组件注册到vue中
    app.component(jScrollView.name,jScrollView)
}
export default jScrollView;