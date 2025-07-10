export default {
	name: {
		type: String
	},
	modelValue: {
		type: Array,
		default: null
	},
	value: {
		type: Array,
		default: null
	},
	/**
	 * 是否禁用组件
	 */
	disabled : {
		type: Boolean,
		default: false,
	},
	readonly : {
		type: Boolean,
		default: false,
	},
	imageFit : {
		type: String,
		default: 'aspectFill'//'scaleToFill'|'aspectFit'|'aspectFill'|'widthFix'|'heightFix'|'top'|'bottom'|'center'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right';
	},

	gutter: {
		type: String,
		default: null
	},
	column :{
		type: Number
	},
	max : {
		type: Number,
		default: 0
	},
	sizeLimit :{
		type: Number
	},
	uploadIcon : {
		type: String,
		default: 'camera'
	},
	uploadIconSize: {
		type: String
	},
	gridWidth: {
		type: String,
		default: null
	},
	gridHeight: {
		type: String,
		default: null
	},
	gridBgColor: {
		type: String,
		default: null
	},
	gridBorderRadius: {
		type: String,
		default: null
	},
	addBgColor: {
		type: String
	},
	defaultFiles: {
		type: Array,
		default: null
	},
	loadingText: {
		type: String,
		default: '上传中...'
	},
	reloadText: {
		type: String,
		default: '重新上传'
	},
	failedText: {
		type: String,
		default: '上传失败'
	},
	disablePreview: {
		type: Boolean,
		default: false,
	},
	autoUpload: {
		type: Boolean,
		default: false,
	},
	multiple: {
		type: Boolean,
		default: true,
	},
	mediaType: {
		type: String,
		default: 'image'//'image' | 'video' | 'all';
	},
	maxDuration:{
		type: Number,
		default: 10
	},
	sizeType: {
		type: Array,
		defalut: () => ['original', 'compressed']
	},
	sourceType: {
		type: Array,
		defalut: ()=> ['album', 'camera']
	},
	//上传地址 如需使用uniCloud服务，设置为uniCloud即可
	action: {
		type: String
	},
	//上传的请求头部
	headers: {
		type: Object
	},
	//HTTP 请求中其他额外的 form data
	formData: {
		type: Object
	},
	mode: {
		type: String
	}
}