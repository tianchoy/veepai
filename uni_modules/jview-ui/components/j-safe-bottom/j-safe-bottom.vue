<template>
	<view class="j-safe-bottom" :style="{height:h+'px'}"></view>
</template>

<script>
	import {getWindowInfo} from "../../utils/index.js"
	export default{
		name:'j-safe-bottom',
		data(){
			return {
				h:0,
			}
		},
		created() {
			const obj = getWindowInfo();
			if(obj.safeAreaInsets){
				this.h = obj.safeAreaInsets.bottom
			}else{
				let num = 0;
				const deviceObj = {
					"iphone 11":34,
					"iphone 12":34,
					"iphone 13":34,
					"iPhone10":34,
					"iPhone11":34,
				}
				for(const key in deviceObj){
					if(obj.model.startsWith(key)){
						num = deviceObj[key];
					}
				}
				if(obj.model.includes('iphone') && num<16){ // 由于不太确定哪些设备有这个安全距离，这只有先给个默认的
					num = 16;
				}
				this.h = num;
			}
		}
	}
</script>

<style scoped>
	.j-safe-bottom{
		width: 100%;
	}
</style>