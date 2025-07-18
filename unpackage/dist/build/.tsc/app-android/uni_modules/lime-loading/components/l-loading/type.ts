// 完整类型定义
export interface LoadingProps {
  color?: string;
  type: 'circular' | 'spinner' | 'failed';




  size: string;

  text?: string;
  textColor?: string;
  textSize?: string;
  mode: 'raf' | 'animate';
  vertical: boolean;
  animated: boolean;
}

// defineOptions({
	// 	name: 'l-loading'
	// })
	// const props = defineProps({
	// 	color: {
	// 		type: String,
	//
	// 		default: '#1677ff' // '#c9c9c9'
	//
	// 	},
	// 	type: {
	// 		type: String,
	// 		default: 'circular'
	// 	},
	// 	size: {
	// 		type: String,
	//
	// 		default: '40rpx',
	//
	// 	},
	// 	text: {
	// 		type: String,
	// 		default: ''
	// 	},
	// 	textColor: {
	// 		type: String,
	// 		default: ''
	// 	},
	// 	textSize: {
	// 		type: String,
	// 		default: ''
	// 	},
	// 	vertical: {
	// 		type: Boolean,
	// 		default: false
	// 	},
	// 	animated: {
	// 		type: Boolean,
	// 		default: true
	// 	}
	// })