




export const icons = ref<Map<string, any | null>>(new Map<string, any | null>())

if (icons.value.size == 0) {
	uni.getFileSystemManager().readFile({
		filePath: '/uni_modules/lime-icon/static/icons.json',
		encoding: 'utf-8',
		success: (res) => {
			const obj = JSON.parseObject(res.data as string)
			if (obj == null) return
			icons.value = obj.toMap();
		},
		fail(err) {
			uni.showToast({
				title: `lime-icon:${err.errMsg}`
			})
		}
	} as ReadFileOptions);
}
