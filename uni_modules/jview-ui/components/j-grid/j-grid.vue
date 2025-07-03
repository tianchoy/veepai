<template>
    <view class="j-grid" ref="jGridRef" :style="styleStr">
        <slot></slot>
    </view>
</template>
<script>
import { sleep, getDomStyle } from '../../utils';

export default{
    name:'j-grid',
    props:{
		// 分成几列
        col: {
            type: [String, Number],
            default: 3
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: false
        },
        // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
        align: {
            type: String,
            default: 'left'
        },
        // 间隔
        gap: {
            type: String,
            default: '0px'
        },
				autoHeight:{ // 高度是否为内容高度，不然等宽
					type:Boolean,
					default:false,
				}
    },
	data(){
		return {
			childWidth:0,
		}
	},
	computed: {
		styleStr() {
			const style = {};
			switch (this.align) {
				case 'left':
					style.justifyContent = 'flex-start';
					break;
				case 'center':
					style.justifyContent = 'center';
					break;
				case 'right':
					style.justifyContent = 'flex-end';
					break;
				default:
					style.justifyContent = 'flex-start';
			};
			return style;
		}
	},
	watch:{
		col(){
			this.getWidth();
		}
	},
	created() {
		this.children = []
	},
	mounted(){
		this.getWidth();
	},
	methods:{
		// 获取父元素的尺寸
		getWidth() {
			getDomStyle(this,'jGridRef','.j-grid').then(res=>{
				this.childWidth = Math.floor(res.width/this.col);
				console.log(this.childWidth)
				clearTimeout(this.t);
				this.isChange = true;
				this.children.forEach((item,index)=>{
					if(typeof item.gridItemClasses === 'function'){
						item.gridItemClasses(index);
						item.setWidth(this.childWidth);
					}
				})
			})
		},
		gridAddChildren(child){
			if(this.children){
				if(!this.children.includes(child)){
					this.children.push(child);
					this.childGridItemClasses();
				}
			}
		},
		childGridItemClasses(){
			if(!this.isChange) return ;
			this.t && clearTimeout(this.t);
			this.t = setTimeout(()=>{
				clearTimeout(this.t);
				this.children.forEach((item,index)=>{
					item.gridItemClasses(index);
				})
			},30)
		},
		// 此方法由j-grid-item触发，用于在j-grid发出事件
		childClick(name) {
			this.$emit('choose', name);
		}
	}
	
}
</script>
<style scoped lang="scss">
@import "../../bem.scss";
@include b(grid){
	/* #ifdef APP-NVUE */
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	/* #endif */
	justify-content: center;
	@include flexRow;
	flex-wrap: wrap;
	align-items: center;
}
</style>