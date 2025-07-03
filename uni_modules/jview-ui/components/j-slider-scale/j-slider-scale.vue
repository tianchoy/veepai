<!-- 刻度滑动选择 -->
<template>
	<view style="width: 100%;">
		<view class="j-slider-scale" :style="heightStyle">
			<scroll-view scroll-x class="j-slider-scale--scroll" :show-scrollbar="false" :style="scrollStyle" @scroll="slideScroll"
				:scroll-left="scrollLeft" @touchend="slideMoveEnd" :scroll-with-animation="true">
				<view class="j-slider-scale--view" :style="viewStyle">
					<!-- 空白占位 -->
					<view class="j-slider-scale--empty" :style="{ width: scrollWidth / 2 + 'px' }"></view>
					<!-- 列表项 -->
					<template v-for="(s_item, s_index) in list" :key="s_index">
						<view class="j-slider-scale--list" :style="{
							width: bigItemWidth + (selInd === (s_index * cells)?2:0) + 'px', 
							marginLeft:s_index?`${(cellWidth - bigItemWidth+ (selInd === (s_index * cells)?2:0)) / 2}px`:'0px',
							marginRight:s_index===list.length-1?'0px':`${(cellWidth - bigItemWidth+ (selInd === (s_index * cells)?2:0)) / 2}px`,
							backgroundColor: selInd === (s_index * cells) ? selColor : color,
							color: selInd === (s_index * cells) ? selColor : color,
							height: addUnit(bigItemHeight)
						}">
							<view class="j-slider-scale--num"
								:style="numStyle">
								{{ s_item }}
							</view>
						</view>
						<template v-if="s_index<list.length-1">
							<view class="j-slider-scale--item" v-for="(c_item, c_index) in (cells - 1)" :key="c_item" :style="{
								width: itemWidth + (selInd === (s_index * cells + c_index + 1)?2:0) + 'px', 
								margin: `0 ${(cellWidth - itemWidth + (selInd === (s_index * cells + c_index + 1)?2:0)) / 2}px`,
								backgroundColor: selInd === (s_index * cells + c_index + 1) ? selColor : color,
								height: addUnit(itemHeight)
							}"></view>
						</template>
					</template>
					<!-- 空白占位 -->
					<view class="j-slider-scale--empty" :style="{ width: scrollWidth / 2 + 'px' }"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
//刻度选择器
// <j-slider-scale v-model="value" height="72px" :cellNum="1" :cells="10" :startNum="0" :endNum="100" ></j-slider-scale>
import { getDomStyle, addUnit, getPx } from "../../utils/index";
export default {
	props: {
		height: {
			type: [String, Number],
			default: ''
		},
		// 大刻度宽度
		bigItemWidth: {
			type: Number,
			default: 1
		},
		// 小刻度宽度
		itemWidth: {
			type: Number,
			default: 1
		},
		// 每小格宽度
		cellWidth: {
			type: Number,
			default: 12
		},
		// 每个大格分为几个小格
		cells: {
			type: Number,
			default: 10
		},
		// 每个小格子代表的数值
		cellNum: {
			type: Number,
			default: 1
		},
		// 开始数值
		startNum: {
			type: Number,
			default: 0
		},
		// 结束数值
		endNum: {
			type: Number,
			default: 100
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: 'transparent'
		},
		// 刻度颜色
		color: {
			type: String,
			default: '#9598A4'
		},
		// 选中的颜色
		selColor: {
			type: String,
			default: '#4BB983'
		},
		// 刻度对齐方式 flex-start flex-end
		align: {
			type: String,
			default: 'flex-start'
		},
		// 大刻度高度
		bigItemHeight: {
			type: [String, Number],
			default: 30
		},
		// 小刻度高度
		itemHeight: {
			type: [String, Number],
			default: 20
		},
		// 数值的位置 top bottom 
		numPos: {
			type: String,
			default: 'bottom'
		},
		numColor: {
			type: String,
			default: ''
		},
		// #ifdef VUE2
		// 用v-model双向绑定
		value: {
			type: Number,
			default: 0
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: Number,
			default: 0
		},
		// #endif

	},
	data() {
		return {
			scrollLeft: 0, // 仅用于核准中间位置
			list: [],
			selInd: 0,
			width: 0,
		};
	},
	computed: {
		heightStyle(){
			return `height:${addUnit(this.height)};`;
		},
		viewStyle(){
			return `align-items: ${this.align};padding-bottom:38rpx;${this.heightStyle}`;
		},
		scrollStyle() {
			const { height, bgColor } = this;
			return { height: getPx(height)+getPx('20rpx')+'px', background: bgColor };
		},
		// 总宽度,如果props未传则默认为屏幕宽度
		scrollWidth() {
			const {
				width
			} = this;
			let w = width;
			const screenWidth = uni.getSystemInfoSync().screenWidth;
			if (width <= 100 && width > 0) {
				w = Math.round(screenWidth * width / 100);
			} else if (width > screenWidth || !width) {
				w = screenWidth;
			}
			return w;
		},
		// 大刻度的高度
		bIH() {
			const unit = this.bigItemHeight;
			if (typeof unit === 'number') {
				return (unit + 'px')
			} else {
				return unit;
			}
		},
		numStyle(){
			const {numPos, numColor, selColor} = this;
			return { color:numColor||selColor, top: numPos === 'bottom' ? `calc(100% + 10rpx)` : 'auto', bottom: numPos === 'top' ? `calc(100% + 10rpx)` : 'auto' }
		}
	},
	watch: {
		// #ifdef VUE2
		value() {
			this.getSelInd();
		},
		// #endif
		// #ifdef VUE3
		modelValue() {
			this.getSelInd();
		}
		// #endif
	},
	mounted() {
		this.getWidth();
	},
	methods: {
		addUnit,
		async getWidth() {
			const dom = await getDomStyle(this, null,'.j-slider-scale');
			this.width = dom.width;
			this.initSlide();
		},
		// 滚动触发
		slideScroll(e) {
			const {
				cellWidth,
				endNum,
				startNum,
				cellNum
			} = this;
			const scrollL = e.detail.scrollLeft; // 当前滚动距离左边的距离
			let ind = parseInt(scrollL / cellWidth); // 当前选中是第几个
			const d_len = (endNum - startNum) / cellNum; // 如果略微超过最右边 则也为最后一个
			if (ind > d_len) {
				ind = d_len;
			}
			if (ind !== this.selInd) {
				this.selInd = ind;
			}
			this.overScroll();
			this.setEmitFunc();
		},
		overScroll(){ // 最终停下来时触发的事件
			if(this.status !== "end") return;
			clearTimeout(this.time);
			const {
				selInd,
			} = this;
			this.time = setTimeout(()=>{
				clearTimeout(this.time);
				this.status = undefined;
				this.slideTo(selInd);
			},50);
		},
		// 触摸结束
		slideMoveEnd(e) {
			this.status = "end";
			this.overScroll();
		},
		// 初始化
		initSlide() {
			const {
				startNum,
				endNum,
				cellNum,
				cells
			} = this;
			
			const listNum = cellNum * cells;
			const len = (endNum - startNum) / listNum;
			let list = [],
				defaultInd = 0;
			for (let i = 0; i < len; i++) {
				// 取整
				const l_num = this.getIntNum(startNum + (i * listNum));
				list.push(l_num);
			}
			if(list[list.length-1] !== endNum){
				list.push(endNum)
			}
			this.list = list;
			this.getSelInd();
			if((endNum-startNum)%cells>0){
				throw new Error("endNum-startNum的差值最好为cells的整数倍，不然显示会异常");
			}
		},
		// 滚动到正确的刻度
		slideTo(ind) {
			const {
				scrollWidth,
				cellWidth,
				scrollLeft
			} = this;
			let newLeft = 0;
			if(ind){ // 为0的话就是0
				newLeft = ind * cellWidth + (cellWidth / 2);
			}
			// (scrollLeft + 0.001)这是为了让他触发滚动，防止推拽一点点不会回位的问题
			this.scrollLeft = (scrollLeft === newLeft) ? (scrollLeft + 0.001) : newLeft;
		},
		// 四舍五入
		getIntNum(n) {
			return parseInt(n * 100) / 100
		},
		// value改变后，计算选中的selInd
		getSelInd() {
			const {
				endNum,
				startNum,
				cellNum,
			} = this;
			// #ifdef VUE2
			let value = this.value;
			// #endif
			// #ifdef VUE3
			let value = this.modelValue;
			// #endif

			let isChange = false,
				noHave = false;
			// 不能超过最小最大值
			if (value > endNum) {
				value = endNum;
				isChange = true;
			} else if (value < startNum) {
				value = startNum;
				isChange = true;
			}
			const d_len = (endNum - startNum) / cellNum;
			let defaultInd = -1;
			for (let d = 0; d <= d_len; d++) {
				const item = this.getIntNum(startNum + (d * cellNum));
				if (item === value) {
					defaultInd = d;
					break;
				}
			}
			if (defaultInd === -1) {
				defaultInd = 0;
				noHave = true;
			}
			// 没有匹配到的情况 以及 超过了最大最小值 需要通知父组件修改value
			(isChange || noHave) && this.setEmitFunc();
			if (defaultInd === this.selInd) return;
			this.selInd = defaultInd;
			this.slideTo(defaultInd);
		},
		// 父组件通知事件
		setEmitFunc() {
			const {
				selInd,
				startNum,
				cellNum
			} = this;
			const num = this.getIntNum(selInd * cellNum + startNum);
			// #ifdef VUE2
			this.$emit('input', num);
			// #endif
			// #ifdef VUE3
			this.$emit('update:modelValue', num);
			// #endif
			this.$emit('change', num);
		},
	}
}
</script>

<style scoped lang="scss">
@import "../../bem.scss";

@include b(slider-scale) {
	width: 100%;
	overflow:hidden;
	@include m(view) {
		@include flexRow(flex-start);
		flex-wrap: nowrap;
		height: 100%;
		box-sizing: border-box;
	}
	@include m(list) {
		flex-shrink: 0;
		position: relative;
		border-radius: 4px;
		transition: background-color .1s;
	}

	@include m(num) {
		position: absolute;
		left: 50%;
		line-height: 100%;
		transform: translateX(-50%);
	}

	@include m(item) {
		flex-shrink: 0;
		border-radius: 4px;
		transition: background-color .1s;
	}

	@include m(empty) {
		flex-shrink: 0;
		height: 5px;
	}
}
</style>
