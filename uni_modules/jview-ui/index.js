// const importFn = import.meta.glob('./components/j-*/j-*.vue', { eager: true })

// const components = [];
// for (const key in importFn) {
//   let component = importFn[key].default;
// 	if(!component.name){
// 		const keys = key.split('/');
// 		const name = keys[keys.length-1].split('.')[0]
// 		if(name){
// 			component.name = name;
// 		}
// 	}
//   if(component.name){
// 		// 添加组件
// 		components.push(component);
// 	}
// }
// const install = (Vue) => {
//   components.forEach(function(component) {
//     Vue.component(component.name, component); 
//   });
// }

// export default {
//   install
// }
let importFn = [];
// #ifdef VUE3
importFn = import.meta.glob('./components/j-*/index.js', { eager: true })
// #endif
// #ifdef VUE2
importFn = require.context(
	// 要搜索的目录
	'./components',
	// 是否搜索子目录
	true,
	// 匹配组件文件名的正则表达式
	/^.\/j-[^/]+\/index+\.js$/
);
// #endif
export const objComponent = {}
const components = [];
for (const key in importFn) {
  let component = importFn[key].default;
  if(component?.name){
		// 添加组件
		components.push(component);
		objComponent[component.name] = component;
	}
}
const install = (Vue) => {
  components.forEach(function(component) {
    Vue.use(component); 
  });
}

export default {
  install
}