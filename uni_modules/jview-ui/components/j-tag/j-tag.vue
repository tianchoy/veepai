<template>
	<j-transition style="display: inline-block;" ref="transition" :show="bool">
		<view :class="{'j-tag--margin':close}">
			<view :class="classStr" v-if="bool" >
				<slot name="icon"></slot>
				<view class="j-tag--text">
					<slot>
						<text class="j-tag--text">
							{{text}}
						</text>
					</slot>
				</view>
			</view>
			<view v-if="close" @click.stop="closeMethod" class="j-tag--close" :style="closeStyle">
				<j-icon class="j-tag--close__icon" type="closeempty" :style="{lineHeight:iconSize}" :size="iconSize"
					color="#fff"></j-icon>
			</view>
		</view>
	</j-transition>
</template>

<script>
	/**
	 * @property {String}			type					预置样式，info，primary，error，warning，success (默认 'info' )
	 * @property {String}			size					尺寸，large，medium，mini （默认 medium）
	 * @property {String}			text					文字内容
	 * @property {Boolean}		plain					是否为镂空状态
	 * @property {Boolean}		show					是否显示
	 * @property {Boolean}		close					是否关闭icon
	 */
	export default {
		name:'j-tag',
		props: {
			type: {
				type: String,
				default: 'info',
			},
			size: {
				type: String,
				default: 'medium',
			},
			plain: {
				type: Boolean,
				default: false,
			},
			text: {
				type: String,
				default: "",
			},
			show: {
				type: Boolean,
				default: true,
			},
			close:{
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				bool: true,
			}
		},
		watch: {
			show(val) {
				this.init();
			}
		},
		computed: {
			classStr(){
				let str = "j-tag";
				if(this.type){
					str+= ' j-tag--'+this.type;
				}
				if(this.size){
					str+= ' j-tag--'+this.size;
				}
				if(this.plain){
					str+= ' j-tag--plain';
				}
				return str
			},
			iconViewSize() {
				let num = '44rpx';
				if (this.size === 'large') {
					num = '50rpx';
				} else if (this.size === 'mini') {
					num = '36rpx';
				}
				return num;
			},
			closeStyle() {
				let num = 44;
				if (this.size === 'large') {
					num = 50;
				} else if (this.size === 'mini') {
					num = 36;
				}
				const move = 0.5*num;
				return {
					width:num+'rpx',
					height:num+'rpx',
					borderRadius:num*2+'rpx',
					top:`0rpx`,
					right:`0rpx`,
				}
			},
			iconSize() {
				let num = '26rpx';
				if (this.size === 'large') {
					num = '30rpx';
				} else if (this.size === 'mini') {
					num = '24rpx';
				}
				return num;
			},
		},
		created() { // 这考虑还是不用mounted，开始不显示的后面第一次显示不要动画
			this.init();
		},
		methods: {
			init() {
				if (this.bool === this.show) return;
				if (!this.$refs.transition) {
					this.bool = this.show;
					return;
				}
				// #ifdef APP-NVUE
				if (this.show) {
					this.bool = true;
					this.$refs.transition.nvueAnimation({
						styles:{
							opacity:1
						}
					})
				} else {
					this.$refs.transition.nvueAnimation({
						styles:{
							opacity:0
						}
					},()=>{
						this.bool = false;
					})
				}
				// #endif
				// #ifndef APP-NVUE
				if (this.show) {
					this.bool = true;
					this.$refs.transition.vueAnimation({opacity:1})
					// this.$refs.transition.animation.opacity(1).step();
					// this.$refs.transition.animationExport();
				} else {
					this.$refs.transition.vueAnimation({opacity:0},() => {
						this.bool = false;
					})
					// this.$refs.transition.animation.opacity(0).step();
					// this.$refs.transition.animationExport().then(() => {
					// 	this.bool = false;
					// });
				}
				// #endif
			},
			async closeMethod() {
				if (this.loading) return;
				this.loading = true;
				const overFn = ()=>{
					this.loading = false;
					this.bool = false;
					this.$emit('close');
				}
				// #ifdef APP-NVUE
				this.$refs.transition.nvueAnimation({
					styles:{
						opacity:0
					}
				},overFn)
				// #endif
				// #ifndef APP-NVUE
				this.$refs.transition.vueAnimation({opacity:0},overFn)
				// this.$refs.transition.animation.opacity(0).step();
				// await this.$refs.transition.animationExport();
				// overFn();
				// #endif
				
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../bem.scss";
	@include b(tag) {
		@include flexRow(center);
		border-width: 2rpx;
		border-style: solid;
		border-color: transparent;
		height: 52rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		@include m(margin) {
			position: relative;
			padding-top: 20rpx;
			padding-right: 20rpx;
		}
		@include m(text) {
			font-size: 26rpx;
			color: #fff;
		}

		@include m(info) {
			border-color: #ebedf0;
			.j-tag--text {
				color: #323233;
			}
		}

		@include m(primary) {
			border-color: $color-primary;
			background-color: $color-primary !important;
		}

		@include m(success) {
			border-color: $color-success;
			background-color: $color-success !important;
		}

		@include m(error) {
			border-color: $color-error;
			background-color: $color-error !important;
		}

		@include m(warning) {
			border-color: $color-warning;
			background-color: $color-warning !important;
		}

		@include m(plain) {
			background-color: transparent !important;
		}

		@include brother(primary, plain) {
			.j-tag--text {
				color: $color-primary;
			}
		}

		@include brother(success, plain) {
			.j-tag--text {
				color: $color-success;
			}
		}

		@include brother(error, plain) {
			.j-tag--text {
				color: $color-error;
			}
		}

		@include brother(warning, plain) {
			.j-tag--text {
				color: $color-warning;
			}
		}

		@include m(large) {
			height: 64rpx;
			padding: 0 30rpx;

			.j-tag--text {
				font-size: 30rpx;
			}
		}

		@include m(mini) {
			height: 44rpx;
			padding: 0 10rpx;

			.j-tag--text {
				font-size: 24rpx;
			}
		}

		@include m(icon) {
			margin-right: 6rpx;
		}

		@include m(close) {
			position: absolute;
			z-index: 999;
			@include flexRow(center);
			transform: scale(.6);
			background-color: rgb(198, 199, 203);
			@include e(icon) {
				font-weight: normal;
				top: 0px;
			}
		}
	}
</style>