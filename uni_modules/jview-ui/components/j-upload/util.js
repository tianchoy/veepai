function pickExclude(obj, keys) {
	// 某些情况下，type可能会为
    if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
        return {}
    }
    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key]
        }
        return prev
    }, {})
}

export const formatImage = (res)=>{
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        type: 'image',
        url: item.path,
        thumb: item.path,
		size: item.size,
		// #ifdef H5
		name: item.name,
		file: item
		// #endif
    }))
}

export const formatVideo = (res)=>{
    return [
        {
            ...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
            type: 'video',
            url: res.tempFilePath,
            thumb: res.thumbTempFilePath,
			size: res.size,
			// #ifdef H5
			name: res.name,
			file: res
			// #endif
        }
    ]
}

export const formatMedia = (res)=>{
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
        type: res.type,
        url: item.tempFilePath,
        thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
		size: item.size,
		// #ifdef H5
		file: item
		// #endif
    }))
}

export const formatFile = (res)=>{
    return res.tempFiles.map((item) => ({ 
		...pickExclude(item, ['path']), 
		url: item.path, 
		size:item.size,
		// #ifdef H5
		name: item.name,
		type: item.type?.split('/')[0],
		file: item
		// #endif 
	}))
}