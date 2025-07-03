<template>
	<view class="j-collapse">
		<slot></slot>
	</view>
</template>
<script>
	export default{
		name:'j-collapse',
		props:{
			modelValue:{
				type:Array,
				default:()=>{
					return []
				}
			},
			accordion:{ // 是否手风琴模式
				type:Boolean,
				default:false
			},
			border:{ // 是否显示边框
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				arr:[],
			}
		},
		watch:{
			modelValue(){
				this.changeVal();
			}
		},
		mounted() {
			this.changeBorder();
			this.changeVal();
		},
		methods:{
			changeBorder(){ // 如果不显示border才执行
				if(!this.border){
					this.$children?.forEach(item=>{
						if(item.jCollapseItemBorder){
							item.jCollapseItemBorder(false);
						}
					})
				}
			},
			changeVal(){
				this.arr = [...this.modelValue];
				this.$children?.forEach(item=>{
					if(item.jCollapseItemChange){
						item.jCollapseItemChange(this.arr);
					}
				})
			},
			jCollapseChange(name,bool){
				const index = this.arr.indexOf(name);
				if(bool){
					if(this.accordion){
						this.arr = [name];
					}else{
						if(index === -1){
							this.arr.push(name);
						}
					}
				}else if(index !== -1){
					if(this.accordion){
						this.arr = [];
					}else{
						const keys = [...this.arr];
						keys.splice(index,1);
						this.arr = keys;
					}
				}
				this.$emit('update:modelValue',this.arr);
			}
		}
	}
</script>