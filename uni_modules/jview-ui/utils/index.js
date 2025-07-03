import {
	array as testArray,
	number as testNumber
} from './test'
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync 
 */
export function sys() {
	return uni.getSystemInfoSync()
}
/**
 * @description 获取窗口信息
 */
export function getWindowInfo() {
	let ret = {}
	// #ifdef APP || H5 || MP-WEIXIN
	ret = uni.getWindowInfo()
	// #endif
	// #ifndef APP || H5 || MP-WEIXIN
	ret = sys()
	// #endif
	return ret
}
/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.rpx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit 
 * @returns {number|string}
 */
export function getPx(value, unit = false) {
  if (testNumber(value)) {
    return unit ? `${value}px` : Number(value)
  }
  
  // 处理 rpx/upx 单位转换
  if (/(rpx|upx)$/.test(value)) {
    const num = parseInt(value)
    
    // 方案1: 使用官方API（优先）
    if (typeof uni !== 'undefined' && uni.upx2px) {
      const pxVal = uni.upx2px(num)
      return unit ? `${pxVal}px` : Number(pxVal)
    } 
    // 方案2: 手动计算（兼容方案）
    else {
      try {
        // 获取屏幕宽度计算比例
        const sysInfo = sys()
        const pxVal = num * sysInfo.windowWidth / 750
        return unit ? `${pxVal}px` : pxVal
      } catch (e) {
        // 极端兼容方案
        return unit ? `${num}px` : num
      }
    }
  }
  
  return unit ? `${parseInt(value)}px` : parseInt(value)
}
/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function getUuid(len = 32, firstU = true, radix = null) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	const uuid = []
	radix = radix || chars.length

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
	} else {
		let r
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstU) {
		uuid.shift()
		return `u${uuid.join('')}`
	}
	return uuid.join('')
}
/**
 * 等待多久
 */
export const sleep = (time = 0)=>{
	return new Promise((rej)=>{
		const t = setTimeout(()=>{
			clearTimeout(t);
			rej();
		},time);
	})
}

// 阻止事件冒泡
export const preventEvent = (e)=>{
  e && typeof (e.stopPropagation) === 'function' && e.stopPropagation();
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj) {
	// 对常见的“非”值，直接返回原来值
	if ([null, undefined, NaN, false].includes(obj)) return obj
	if (typeof obj !== 'object' && typeof obj !== 'function') {
		// 原始类型直接返回
		return obj
	}
	const o = testArray(obj) ? [] : {}
	for (const i in obj) {
		if (obj.hasOwnProperty(i)) {
			o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
		}
	}
	return o
}

/**
 * @description error提示
 * @param {*} err 错误内容
 */
export function error(err) {
	// 开发环境才提示，生产环境不会提示
	if (process.env.NODE_ENV === 'development') {
		console.error(`jView提示：${err}`)
	}
}

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
export function addUnit(value = 'auto', unit = '') {
	if (!unit) {
		unit = 'px'
	}
	// if (unit == 'rpx' && testNumber(String(value))) {
	// 	value = value * 2
	// }
	value = String(value)
	// 用内置验证规则中的number判断是否为数值
	return testNumber(value) ? `${value}${unit}` : value
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
export function toast(title, duration = 2000) {
	uni.showToast({
		title: String(title),
		icon: 'none',
		duration
	})
}

/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
export function getProperty(obj, key) {
	if (typeof obj !== 'object' || null == obj) {
        return ''
    }
	if (typeof key !== 'string' || key === '') {
		return ''
	}
	if (key.indexOf('.') !== -1) {
		const keys = key.split('.')
		let firstObj = obj[keys[0]] || {}

		for (let i = 1; i < keys.length; i++) {
			if (firstObj) {
				firstObj = firstObj[keys[i]]
			}
		}
		return firstObj
	}
	return obj[key]
}


/**
 * @description 设置对象的属性值，如果'a.b.c'的形式进行设置
 * @param {object} obj 对象
 * @param {string} key 需要设置的属性
 * @param {string} value 设置的值
 */
export function setProperty(obj, key, value) {
	if (typeof obj !== 'object' || null == obj) {
		return
	}
	// 递归赋值
	const inFn = function(_obj, keys, v) {
		// 最后一个属性key
		if (keys.length === 1) {
			_obj[keys[0]] = v
			return
		}
		// 0~length-1个key
		while (keys.length > 1) {
			const k = keys[0]
			if (!_obj[k] || (typeof _obj[k] !== 'object')) {
				_obj[k] = {}
			}
			const key = keys.shift()
			// 自调用判断是否存在属性，不存在则自动创建对象
			inFn(_obj[k], keys, v)
		}
	}

	if (typeof key !== 'string' || key === '') {

	} else if (key.indexOf('.') !== -1) { // 支持多层级赋值操作
		const keys = key.split('.')
		inFn(obj, keys, value)
	} else {
		obj[key] = value
	}
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
export function $parent(name = undefined) {
	let parent = this.$parent
	// 通过while历遍，这里主要是为了H5需要多层解析的问题
	while (parent) {
		// 父组件  
		if (parent.$options && parent.$options.name !== name) {
			// 如果组件的name不相等，继续上一级寻找
			parent = parent.$parent
		} else {
			return parent
		}
	}
	return false
}

/**
 * @description 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
export function formValidate(instance, event) {
	const formItem = $parent.call(instance, 'j-form-item')
	const form = $parent.call(instance, 'j-form')
	// 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
	// 同时将form-item的pros传递给form，让其进行精确对象验证
	if (formItem && form) {
		form.validateField(formItem.prop, () => {}, event)
	}
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
export function padZero(value) {
	return `00${value}`.slice(-2)
}

/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min 
 * @param {number} max 
 * @param {number} value
 */
export function range(min = 0, max = 0, value = 0) {
	return Math.max(min, Math.min(max, Number(value)))
}
/**
 * 判断是不是对应的类型
 * @param {String} val 
 * @param {String} type 
 * @returns 
 */
export const typeVal = (val, type)=>{
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}
/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str, pos = 'both') {
	str = String(str)
	if (pos == 'both') {
		return str.replace(/^\s+|\s+$/g, '')
	}
	if (pos == 'left') {
		return str.replace(/^\s*/, '')
	}
	if (pos == 'right') {
		return str.replace(/(\s*$)/g, '')
	}
	if (pos == 'all') {
		return str.replace(/\s+/g, '')
	}
	return str
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
export function addStyle(customStyle, target = 'object') {
	// 字符串转字符串，对象转对象情形，直接返回
	if (!customStyle || typeof(customStyle) === 'object' && target === 'object' || target === 'string' &&
		typeof(customStyle) === 'string') {
		return customStyle
	}
	// 字符串转对象
	if (target === 'object') {
		// 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
		customStyle = trim(customStyle)
		// 根据";"将字符串转为数组形式
		const styleArray = customStyle.split(';')
		const style = {}
		// 历遍数组，拼接成对象
		for (let i = 0; i < styleArray.length; i++) {
			// 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
			if (styleArray[i]) {
				const item = styleArray[i].split(':')
				style[trim(item[0])] = trim(item[1])
			}
		}
		return style
	}
	// 这里为对象转字符串形式
	let string = ''
	if (typeVal(customStyle,'Array')) {
		customStyle.forEach((val, i) => {
			// 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
			const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
			string += `${key}:${val};`
		})
	}else if (typeVal(customStyle,'Object')) {
		for(let key in customStyle){
			const val = customStyle[key];
			key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			string += `${key}:${val};`
		}
	}
	// 去除两端空格
	return trim(string)
}
/**
 * @param {Object} this vue文件中的this
 * @param {Object} refName ref的名字,APP-NVUE获取dom节点信息
 * @param {String} select class类名，如‘.class’,'#id'
 * @param {Boolean} bool 是否延迟50ms执行 默认true
 */
export const getDomStyle = (_this,refName,select,bool=true)=>{
	return new Promise((rej,rsp)=>{
		const fn = ()=>{
			// #ifdef APP-NVUE
			const refObj = _this.$refs[refName];
			if(refObj){
				dom.getComponentRect(Array.isArray(refObj)?refObj[0]:refObj, res => {
					rej(res.size)
				})
			}else{
				rsp("参数错误");
			}
			// #endif
			// #ifndef APP-NVUE
			if(select){
				const query = uni.createSelectorQuery().in(_this);
				query
				.select(select)
				.boundingClientRect((data) => {
					rej(data);
				})
				.exec();
			}else{
				rsp("参数错误");
			}
			// #endif
		}
		if(bool){
			const t = setTimeout(()=>{
				clearTimeout(t);
				fn();
			},50);
		}else{
			fn();
		}
	})
}
/**
 * 判断2个值是不是相同的
 */
export const deepEqual = (val1, val2)=>{
	if(val1 === val2) return true;

	const type1 = Object.prototype.toString.call(val1);
	const type2 = Object.prototype.toString.call(val2);
	if(type1 !== type2) return false;
	if(type1 === '[object Object]'){
		const obj2 = {...val2};
		for(let key in val1){
			if(!deepEqual(val1[key],obj2[key])) return false;
			delete obj2[key];
		}
		if(Object.keys(obj2).length) return false;
		return true;
	}else if(type1 === '[object Array]'){
		if(val1.length !== val2.length) return false;
		for(let i=0;i<val1.length;i++){
			if(!deepEqual(val1[i],val2[i])) return false;
		}
		return true;
	}else{
		return val1 === val2;
	}
}