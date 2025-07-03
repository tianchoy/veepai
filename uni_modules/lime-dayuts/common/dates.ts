// @ts-nocheck
import {dayuts, Dayuts} from "./index"
// import {DayutsConfig} from '../../types/date.uts'
import { DayutsConfig } from '../utssdk/interface'
export class Dates {
	
	/**
	 * Dayuts实例
	 */
	newDate() : Dayuts;
	newDate(date : string) : Dayuts;
	newDate(date : any[]) : Dayuts;
	newDate(date : number) : Dayuts;
	newDate(date : UTSJSONObject) : Dayuts;
	newDate(date : Date) : Dayuts;
	newDate(date : Dayuts) : Dayuts;
	// #ifndef APP-ANDROID || APP-IOS || APP-HARMONY
	newDate(date : any | null, format : string) : Dayuts;
	newDate(date : any | null, format : string | null, locale : string | null) : Dayuts;
	// #endif
	newDate(date : any | null = null, format : string | null = null, locale : string | null = null) : Dayuts {
		if (date != null && date instanceof Dayuts) return date.clone()
		return new Dayuts({
			date,
			format,
			locale
		} as DayutsConfig)
	}
	
	/**
	 * 万能转日期对象
	 * @param date 时间
	 */
	toDate(date : string) : Date {
		date = date.split('周')[0].trim().split('星期')[0].trim().split('礼拜')[0].trim()
	
		if (date == '') {
			return new Date()
		}
	
		if (date.length >= 10 && /^\d+$/.test(date)) {
			// 时间戳
			let timestamp = parseInt(date)
	
			// 若为unix秒时间戳，则转为毫秒时间戳
			if (/^\d{10}$/.test(timestamp.toString())) {
				return new Date(timestamp * 1000)
			} else {
				return new Date(timestamp)
			}
		} else {
			if (!date.includes('T')) {
				// 容错
				date = date.replace(/\//g, '-').
					replace(/年/g, '-').
					replace(/月/g, '-').
					replace(/日/g, '').
					replace(/时/g, ':').
					replace(/分/g, ':').
					replace(/秒/g, '').
					replace(/^-+|-+$/g, '').
					trim()
				
				// 补全
				if (date.length == 4) {
					date += '-01-01 00:00:00'
				} else if (date.length == 7) {
					date += '-01 00:00:00'
				} else if (date.length == 8) {
					date = `${this.today()} ${date}`
				} else if (date.length == 10) {
					date += ' 00:00:00'
				} else if (date.length == 13) {
					date += ':00:00'
				} else if (date.length == 16) {
					date += ':00'
				}
	
				let d = date.split(/[^0-9]/)
				
				try{
					return new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(d[3]), parseInt(d[4]), parseInt(d[5]))
				}catch(e){
					console.error(`[ux-date]解析失败：${date}`)
					return new Date()
				}
				
			} else {
				return new Date(date)
			}
		}
	}
	
	/**
	 * 万能格式化日期
	 * @param date 时间
	 * @param format 格式化规则 支持yyyy-MM-dd|yyyy-MM-dd HH:mm:ss|yyyy/MM/dd|yyyy/MM/dd HH:mm:ss|yyyy年MM月dd日等组合 默认yyyy-mm-dd
	 */
	fmtDate(date : string, format : string) : string {
		if(format == '') {
			format = 'yyyy-MM-dd'
		}
		
		date = date.split('周')[0].trim().split('星期')[0].trim().split('礼拜')[0].trim()
		
		let d = this.toDate(date)
		
		let timeSource = new Map<string, string>()
		timeSource.set('y', d.getFullYear().toString())
		timeSource.set('M', (d.getMonth() + 1).toString().padStart(2, '0'))
		timeSource.set('d', d.getDate().toString().padStart(2, '0'))
		timeSource.set('H', d.getHours().toString().padStart(2, '0'))
		timeSource.set('m', d.getMinutes().toString().padStart(2, '0'))
		timeSource.set('s', d.getSeconds().toString().padStart(2, '0'))
	
		let result = format.split('周')[0].trim().split('星期')[0].trim().split('礼拜')[0].trim()
		timeSource.forEach((v : string, key : string) => {
			const rets = new RegExp(`${key}+`).exec(result) ?? [] as RegExp[]
			if (rets.length > 0) {
				result = result.replace(rets[0].toString(), v)
			}
		})
		
		let fmtWeek = format.indexOf('周') != -1 || format.indexOf('星期') != -1 || format.indexOf('礼拜') != -1 
		if(fmtWeek) {
			result += ` ${this.weekName(this.toDate(result).getDay(), format)}`
		}
	
		return result
	}
	
	/**
	 * 现在 yyyy-MM-dd HH:mm:ss
	 */
	now() : string {
		let date = new Date()
	
		let year = date.getFullYear()
		let month = `${date.getMonth() + 1}`.padStart(2, '0')
		let day = `${date.getDate()}`.padStart(2, '0')
		let hour = `${date.getHours()}`.padStart(2, '0')
		let minute = `${date.getMinutes()}`.padStart(2, '0')
		let second = `${date.getSeconds()}`.padStart(2, '0')
	
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	}
	
	/**
	 * 今天
	 * @param n n为负则代表取前n天，为正则代表取后n天，0则为今天
	 */
	today(n : number = 0) : string {
		let date = new Date()
		date.setDate(date.getDate() + n)
	
		let year = date.getFullYear()
		let month = `${date.getMonth() + 1}`.padStart(2, '0')
		let day = `${date.getDate()}`.padStart(2, '0')
	
		return `${year}-${month}-${day}`
	}
	
	/**
	 * 本周所有日期
	 */
	weeks() : string[] {
		const fDate = new Date()
		const eDate = new Date()
		fDate.setDate(fDate.getDate() - fDate.getDay() + 1)
		eDate.setDate(eDate.getDate() - eDate.getDay() + 7)
	
		const result : string[] = []
	
		for (let d = fDate; d.getTime() <= eDate.getTime(); d.setDate(d.getDate() + 1)) {
			result.push(d.toISOString().slice(0, 10))
		}
	
		return result;
	}
	
	/**
	 * 周几
	 */
	weekName(day: number, format: string) : string {
		if(format.indexOf('星期') != -1) {
			return ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][day]
		} else if(format.indexOf('礼拜') != -1 ) {
			return ['礼拜天', '礼拜一', '礼拜二', '礼拜三', '礼拜四', '礼拜五', '礼拜六'][day]
		} else {
			return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
		}
	}
	
}