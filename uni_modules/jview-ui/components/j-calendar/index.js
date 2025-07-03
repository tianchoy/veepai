import jCalendar from "./j-calendar.vue"
jCalendar.install = app =>{  //将组件注册到vue中
  app.component(jCalendar.name, jCalendar)
}
export default jCalendar;