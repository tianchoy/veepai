<template>
	<view class="demo-block">
		<text class="demo-block__title-text ultra">图标</text>
		<text class="demo-block__desc-text">小标题</text>
		<view class="demo-block__body">
			<view class="demo-block card">
				<text class="demo-block__title-text large">内置ICON</text>
				<text class="demo-block__title-text">内置 tdesign icon font </text>
				<view class="demo-block__body">

					<!-- 内置 ICON -->
					<view style="height: 500rpx;">
						<scroll-view style="height: 500rpx;" v-if="iconsData.length > 0" scroll-y>
							<!-- #ifdef VUE3 -->
							<template v-for="(group) in iconsData" :key="group" :type="group">
								<view class="grid" >
									<view class="grid-item" v-for="item in group" :key="item">
										<l-icon :key="item" :name="item" @click="onClick(item)"></l-icon>
										<text class="grid-item-text">{{item}}</text>
									</view>
								</view>
							</template>
							<!-- #endif -->
							<!-- #ifndef VUE3 -->
							<block v-for="(group) in iconsData" :key="group" :type="group">
								<view class="grid" >
									<view class="grid-item" v-for="item in group" :key="item">
										<l-icon :key="item" :name="item" @click="onClick(item)"></l-icon>
										<text class="grid-item-text">{{item}}</text>
									</view>
								</view>
							</block>
							<!-- #endif -->
						</scroll-view>
					</view>
				</view>
			</view>

			<view class="demo-block card">
				<text class="demo-block__title-text large">使用图片</text>
				<view class="demo-block__body">
					<!-- 使用图片 -->
					<view class="grid">
						<view class="grid-item" v-for="item in imageList" :key="item">
							<l-icon :key="item" :name="item" @click="onClick(item)"></l-icon>
						</view>
					</view>
				</view>
			</view>

			<view class="demo-block card">
				<text class="demo-block__title-text large">iconify</text>
				<view class="demo-block__body">
					<!-- iconify -->
					<view class="grid">
						<view class="grid-item">
							<l-icon name="uil:12-plus" color="blue" @click="onClick('uil:12-plus')"></l-icon>
						</view>
						<view class="grid-item">
							<l-icon name="icon-park-outline:abdominal"></l-icon>
						</view>
						<view class="grid-item">
							<l-icon name="icon-park-outline:acoustic"></l-icon>
						</view>
						<view class="grid-item">
							<l-icon name="ph:tabs-bold"></l-icon>
						</view>
						<view class="grid-item">
							<l-icon name="ri:aliens-fill" size="100px"></l-icon>
						</view>
						
					</view>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// @ts-nocheck
	import { icons } from './icon'
	export default {
		data() {
			return {
				show: false,
				page: 0,
				pageSize: 8,
				iconsData: [] ,
				icons: [],
				customList: [
					'add-circle',
					// 'image-fill',
					// 'image-fail-fill',
					// 'close-circle-fill',
					// 'close',
				],
				imageList: [
					'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
					"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.999 2.999h12v-1h-12v1zM3.377 10.23l4.11-4.035v8.649h1.01V6.19l4.18 4.077.715-.7-5.05-4.926a.5.5 0 0 0-.7.001L2.66 9.532l.716.697z' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E",
					"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjk3OTc4MjQzMDMyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxOC40IDE0OS4yOTA2NjdjMTEyLjU5NzMzMy04MC43ODkzMzMgMjY3Ljg4MjY2Ny02OS4zOTczMzMgMzY4LjEyOCAzMiA1My44NjY2NjcgNTQuNTI4IDg0LjEzODY2NyAxMjguODUzMzMzIDg0LjEzODY2NyAyMDYuMzc4NjY2IDAgNzcuNTI1MzMzLTMwLjI5MzMzMyAxNTEuODUwNjY3LTg0LjA5NiAyMDYuMzM2bC0yOTQuNDIxMzM0IDI5OS41MmExMTAuOTc2IDExMC45NzYgMCAwIDEtODAuMjEzMzMzIDM0LjQ3NDY2NyAxMTAuNzIgMTEwLjcyIDAgMCAxLTc5LjkxNDY2Ny0zNC4xNzZMMTM3LjMyMjY2NyA1OTMuNzcwNjY3QzgzLjU2MjY2NyA1MzkuMjQyNjY3IDUzLjMzMzMzMyA0NjQuOTgxMzMzIDUzLjMzMzMzMyAzODcuNTQxMzMzczMwLjIyOTMzMy0xNTEuNzIyNjY3IDg0LjAxMDY2Ny0yMDYuMjcyYzEwMC4yMjQtMTAxLjM3NiAyNTUuNTMwNjY3LTExMi43NjggMzY4LjEyOC0zMS45Nzg2NjZsNi40NDI2NjcgNC43Nzg2NjYgNi40ODUzMzMtNC43Nzg2NjZ6IG0zMjIuNjAyNjY3IDc2Ljk3MDY2NmMtODQuNjI5MzMzLTg1LjU4OTMzMy0yMTkuMTU3MzMzLTg4LjY0LTMwNy4zMjgtNi45NTQ2NjZsLTIxLjc2IDIwLjEzODY2Ni0yMS43MTczMzQtMjAuMTM4NjY2Yy04OC4xOTItODEuNjg1MzMzLTIyMi43Mi03OC42MzQ2NjctMzA3LjMwNjY2NiA2LjkzMzMzMy00MS45MiA0Mi40OTYtNjUuNTU3MzMzIDEwMC42MDgtNjUuNTU3MzM0IDE2MS4yOCAwIDYwLjY5MzMzMyAyMy42MzczMzMgMTE4LjgwNTMzMyA2NS42IDE2MS4zNDRsMjk1LjA0IDMwMC40MTZjOS4wNDUzMzMgOS40NTA2NjcgMjEuMjY5MzMzIDE0LjcyIDMzLjk2MjY2NyAxNC43MiAxMi42OTMzMzMgMCAyNC45MTczMzMtNS4yNjkzMzMgMzQuMjYxMzMzLTE1LjA0TDg0MC45NiA1NDkuMDc3MzMzYzQyLjAwNTMzMy00Mi40OTYgNjUuNjg1MzMzLTEwMC42NTA2NjcgNjUuNjg1MzMzLTE2MS40MDggMC02MC43MzYtMjMuNjgtMTE4LjkxMi02NS42NjQtMTYxLjQwOHoiIGZpbGw9IiMxMTExMTEiIHAtaWQ9IjE3NzkiPjwvcGF0aD48L3N2Zz4="
				],
				color: 'blue'
			}
		},
		created() {
			let group = []
			let groups = []
			// let index = 0
			// console.log('icons', icons)
			Object.keys(icons).forEach((key,index) => {
				if (index % 3 == 0) {
					group = []
					group.push(key)
				} else if (index % 3 == 2) {
					group.push(key)
					groups.push(group)
				} else {
					group.push(key)
				}
			})

			this.icons = groups
			this.loadData()
		},
		methods: {
			loadData() {

				const end = this.page + this.pageSize
				this.iconsData = this.icons.slice(this.page, end)
				this.page = end
			},
			onShow() {
				this.show = !this.show
			},
			onClick(name) {
				console.log('click')
				uni.setClipboardData({
					data: name,
					success: function () {
						uni.showToast({
							title: name
						})
					}
				})
				console.log('icon name:', name)
			}
		},
		mounted() {
			setTimeout(() => {
				this.color = 'red'
			}, 1000)
		}
	}
</script>
<style lang="scss">
	.alt {
		// background-color: aqua;
		color: blue
	}

	.grid {
		display: flex;
		// flex: 1;
		flex-direction: row;
		flex-wrap: wrap;

		&-item {
			display: flex;
			flex-direction: column;
			flex-basis: 33.33%;
			align-items: center;
			padding-bottom: 20rpx;

			&-text {
				padding-top: 10rpx;
				font-size: 22rpx;
				opacity: 0.6;
			}
		}
	}



	.demo-block {
		padding: 32px 10px 0;
		width: 100%;
		box-sizing: border-box;
		overflow: visible;

		&.card {
			padding: 20rpx 20rpx;
			background-color: white;
			margin-bottom: 20rpx;
		}

		&__title {
			margin: 0;
			margin-top: 8px;

			&-text {
				color: rgba(0, 0, 0, 0.6);
				font-weight: 400;
				font-size: 14px;
				line-height: 16px;
				display: block;
				&.large {
					color: rgba(0, 0, 0, 0.9);
					font-size: 18px;
					font-weight: 700;
					line-height: 26px;
				}

				&.ultra {
					color: rgba(0, 0, 0, 0.9);
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
				}
			}
		}

		&__desc-text {
			color: rgba(0, 0, 0, 0.6);
			margin: 8px 16px 0 0;
			font-size: 14px;
			line-height: 22px;
		}

		&__body {
			margin: 16px 0;
			overflow: visible;

			.demo-block {
				margin: 0;
			}
		}
	}
</style>