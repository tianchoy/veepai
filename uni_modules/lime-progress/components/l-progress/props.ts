// import { PropType } from 'vue'

export default {
	percent: {
		type: Number,
		default: 0
	},
	showInfo: Boolean,
	infoType: {
		type: String,
		default: 'outer'
	},
	infoAlign: {
		type: String,
		default: 'end'
	},
	strokeColor: String,
	trailColor: String,
	linecap: String,
	infoColor: String,
	fontSize: [String , Number],
	strokeWidth: [String , Number],
}