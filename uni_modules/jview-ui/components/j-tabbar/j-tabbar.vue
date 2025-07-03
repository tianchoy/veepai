<template>
	<view>
		<view :style="{height:height+'px'}"></view>
		<view class="j-tabbar">
			<view :class="'j-tabbar-v '+(border?'j-tabbar-border':'')">
				<view class="j-tabbar-vc" v-for="(item,index) in tabbars" :key="index" @click="choose(item.url,index)">
					<view class="j-tabbar-vct">
						<image class="j-tabbar-vcti" v-if="item.selectedIconPath && current===index" :src="item.selectedIconPath">
						</image>
						<image class="j-tabbar-vcti" v-if="item.iconPath && current!==index" :src="item.iconPath"></image>
					</view>
					<view class="j-tabbar-vcf">
						<text class="j-tabbar-vcft"
							:style="{color:current===index?(item.activeColor||activeColor):(item.color||color)}">
							{{item.title}}
						</text>
					</view>
				</view>
			</view>
			<j-safe-bottom v-if="safeBottom"></j-safe-bottom>
		</view>
	</view>
	
</template>

<script>
	//有的小程序聚焦后，会导致显示出原有的tabbar（比如钉钉小程序，支付宝小程序等）
	//还是使用原生吧
	import {getDomStyle} from "../../utils/index.js"
	export default {
		name: 'j-tabbar',
		props: {
			tabbars: {
				type: Array,
				default: () => {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			},
			safeBottom: {
				type: Boolean,
				default: true,
			},
			border: {
				type: Boolean,
				default: true,
			},
			color: {
				type: String,
				default: 'rgb(125, 126, 128)',
			},
			activeColor: {
				type: String,
				default: 'rgb(25, 137, 250)',
			},
		},
		data(){
			return {
				height:0,
			}
		},
		watch: {
			current() {
				const obj = this.tabbars[this.current];
				if (obj) {
					this.choose(obj.url, this.current);
				}
			}
		},
		beforeCreate() {
			uni.hideTabBar();
		},
		created() {
			if (this.current !== 0) {
				const obj = this.tabbars[this.current];
				if (obj) {
					obj.url && uni.switchTab({
						url: obj.url
					})
				}
			}
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			getHeight() {
				getDomStyle(this, null,'.j-tabbar').then(data=>{
					this.height = data.height;
				})
			},
			choose(url, index) {
				if (index === this.current) return;
				url && uni.switchTab({
					url
				})
				this.$emit('change', index);
			}
		}
	}
</script>
<style scoped lang="scss">
	.j-tabbar {
		background-color: #fff;
		position: fixed;
		bottom:0;
		left:0;
		width: 100%;
		&-v {
			display: flex;
			align-items: flex-end;
			&c {
				flex: 1;
				text-align: center;
				padding: 16rpx 0 8rpx;

				&t {
					&i {
						display: inline-block;
						width: 40rpx;
						height: 40rpx;
					}

					margin-bottom: 0rpx;
				}

				&f {
					line-height: 24rpx;

					&t {
						font-size: 24rpx;
					}
				}
			}
		}

		.j-tabbar-border {
			border-top: 2rpx solid #dadbde;
		}
	}
</style>