<template>
	<view class="j-collapse-item">
		<view @click="choose" :style="{background:bgColor}" :class="{'j-collapse-item--disabled':disabled}">
			<slot name="title">
				<j-cell :title="title" :value="value" :readonly="disabled"></j-cell>
			</slot>
		</view>
		<j-line v-if="borderShow"></j-line>
		<view class="j-collapse-item-c" :animation="animationData" ref="animation">
			<view :id="elId" :ref="elId">
				<view :style="{background:itemColor}" class="j-collapse-item-cv">
					<slot></slot>
				</view>
				<j-line v-if="borderShow"></j-line>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getDomStyle,
		getUuid
	} from "../../utils/index.js"
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	// #endif
	export default {
		name: 'j-collapse-item',
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			itemColor: {
				type: String,
				default: '#f5f9ff'
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			expanded: { // 是否展开
				type: Boolean,
				default: false,
			},
			border:{ // 是否显示边框
				type:[Boolean,undefined],
				default:undefined
			},
		},
		data() {
			return {
				elId: getUuid(),
				duration: 300,
				animating: false,
				// uni.createAnimation的导出数据
				animationData: {},
				show: false,
				borderShow:false,
			}
		},
		watch: {
			expanded() {
				if(this.disabled) return;
				this.changeShow();
			}
		},
		created() {
			this.count = 0;
			if(this.border===undefined){
				this.borderShow = true
			}else{
				this.borderShow = !!this.border;
			}
		},
		mounted() {
			this.count += 2;
			if(!this.show){ // 如果父集先触发jCollapseItemChange就会走进来
				this.changeShow()
			}
		},
		methods: {
			changeShow() {
				if (this.expanded === this.show) return;
				this.show = this.expanded;
				this.setContentAnimate();
			},
			jCollapseItemChange(val) { // 父节点调用该方法改变状态的
				if(this.disabled) return;
				if(this.count<8){
					this.count += 3;
				}
				if (val && val.includes(this.name)) {
					if (this.show) return;
					this.show = true;
				} else {
					if (!this.show) return;
					this.show = false;
				}
				if(this.count === 5){ // 子集自己先触发mounted
					if(this.expanded && !this.show) return;
				}
				this.setContentAnimate();
			},
			jCollapseItemBorder(bool){
				if(this.border!=undefined) return;
				this.borderShow = bool;
			},
			choose() {
				if(this.disabled) return;
				this.show = !this.show;
				this.$emit('change', this.show);
				const jCollapseChange = this.$parent?.jCollapseChange;
				if (jCollapseChange) {
					jCollapseChange(this.name, this.show);
				}
				this.setContentAnimate();
			},
			async setContentAnimate() {
				// 每次面板打开或者收起时，都查询元素尺寸
				// 好处是，父组件从服务端获取内容后，变更折叠面板后可以获得最新的高度
				const bool = this.show;
				const rect = await this.queryRect();
				const height = bool ? rect.height : 0
				this.animating = true
				// #ifdef APP-NVUE
				const ref = this.$refs.animation
				animation.transition(ref, {
					styles: {
						height: height + 'px'
					},
					duration: this.duration,
					// 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
					needLayout: true,
					timingFunction: 'ease-in-out',
				}, () => {
					this.animating = false
				})
				// #endif

				// #ifndef APP-NVUE
				const animation = uni.createAnimation({
					timingFunction: 'ease-in-out',
				});
				animation
					.height(height)
					.step({
						duration: this.duration,
					})
					.step()
				// 导出动画数据给面板的animationData值
				this.animationData = animation.export()
				// 标识动画结束
				const t = setTimeout(() => {
					clearTimeout(t);
					this.animating = false
				}, this.duration)
				// #endif
			},
			// 查询内容高度
			queryRect() {
				return getDomStyle(this, this.elId, `#${this.elId}`);
			}
		}
	}
</script>
<style scoped lang="scss">
	.j-collapse-item {
		&--disabled{
			opacity: 0.6;
		}
		&-c {
			overflow: hidden;
			height: 0;
			&v{
				padding: 24rpx 30rpx;
			}
		}
	}
</style>