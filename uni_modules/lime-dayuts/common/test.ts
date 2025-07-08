// @ts-nocheck
import { dayuts } from "./index"
// import { Dates } from "./dates"
import { dayutsIntl } from './use'
console.log('dayuts:::test::12')
// console.log('format1', dayuts().format())
console.log('string number', dayuts(`${Date.now()}`))
console.log('format1', dayuts('2018-04-04T16:00:00.000Z'))
console.log('format1', dayuts('2018 三月 15', 'YYYY MMMM DD', 'zh-cn')) 
console.log('format2', dayuts([2010, 1, 14, 15, 25, 50, 125])) 
console.log('format1', dayuts('1970-00-00', 'YYYY-MM-DD'))
console.log('format1', dayuts(1318781876406))
console.log('format1', dayuts(new Date(2018, 8, 18)))
console.log('format1', dayuts([2010, 1, 14, 15, 25, 50, 125]))
console.log('millisecond2', dayuts().millisecond())
console.log('millisecond2', dayuts().millisecond(1))
console.log('second2', dayuts().second())
console.log('second2', dayuts().second(1))
console.log('minute2', dayuts().minute())
console.log('minute2', dayuts().minute(1))
console.log('hour2', dayuts().hour())
console.log('hour2', dayuts().hour(12))
console.log('date2', dayuts().date())
console.log('date2', dayuts().date(1))
console.log('dayOfYear', dayuts().dayOfYear())
console.log('dayOfYear', dayuts().dayOfYear(1))
console.log('month', dayuts().month())
console.log('month', dayuts().month(1))
console.log('year', dayuts().year())
console.log('year', dayuts().year(2000))
console.log(dayuts().get('year'))
console.log(dayuts().get('month')) // start 0
console.log(dayuts().get('date'))
console.log(dayuts().get('hour'))
console.log(dayuts().get('minute'))
console.log(dayuts().get('second'))
console.log(dayuts().get('millisecond'))
console.log('add', dayuts().add(7, 'day'))
// console.log('add1', new Dates().newDate().add(7, 'day').format('YYYY-MM-DD'))
console.log('subtract', dayuts().subtract(7, 'year'))
console.log('startOf', dayuts().startOf('year'))
console.log('endOf', dayuts().endOf('month'))
console.log('format', dayuts().format())
console.log('format', dayuts('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'))
console.log('format', dayuts('2019-01-25').format('DD/MM/YYYY'))
console.log('fromNow:1', dayuts('1999-01-01').fromNow())
console.log('fromNow:1', dayuts('1999-01-01').fromNow(true))
console.log('fromNow:1', dayuts('2024-03-29').fromNow(true))
console.log('from1', dayuts('1999-01-01').from(dayuts()))
console.log('from1', dayuts('1999-01-01').from(dayuts(), true))
console.log('toNow1', dayuts('1999-01-01').toNow(true))
console.log('toNow1', dayuts('1999-01-01').to(dayuts()))
console.log('diff1', dayuts('2019-01-25').diff(dayuts('2018-06-05')))
console.log('diff1', dayuts('2019-01-25').diff(dayuts('2018-06-05'), 'month'))
console.log('diff1', dayuts('2019-01-25').diff(dayuts('2018-06-05'), 'month', true))
console.log('valueOf', dayuts('2019-01-25').valueOf())
console.log('unix', dayuts('2019-01-25').unix())
console.log('daysInMonth', dayuts('2019-01-25').daysInMonth())
console.log('toDate', dayuts().toDate())
console.log('toArray', dayuts().toArray())
console.log('toJSON', dayuts().toJSON())
console.log('toObject', dayuts().toObject())
console.log('toString', dayuts().toString())
console.log('isBefore', dayuts().isBefore(dayuts('2011-01-01')))
console.log('isBefore', dayuts().isBefore('2011-01-01', 'month'))
console.log('isSame', dayuts().isSame(dayuts('2011-01-01')))
console.log('isSame', dayuts().isSame('2011-01-01', 'year'))
console.log('isAfter', dayuts().isAfter(dayuts('2011-01-01')))
console.log('isAfter', dayuts().isAfter('2011-01-01', 'month'))
console.log('isSameOrBefore', dayuts().isSameOrBefore(dayuts('2011-01-01')))
console.log('isSameOrBefore', dayuts().isSameOrBefore('2011-01-01', 'month'))
console.log('isSameOrBefore', dayuts().isSameOrAfter(dayuts('2011-01-01')))
console.log('isSameOrBefore', dayuts().isSameOrAfter('2011-01-01', 'month'))
console.log('isBetween', dayuts('2010-10-20').isBetween('2010-10-19', dayuts('2010-10-25')))
console.log('isBetween', dayuts().isBetween('2010-10-19', '2010-10-25', 'month'))
console.log('isBetween', dayuts('2016-10-30').isBetween('2016-01-01', '2016-10-30', 'day', '[)'))
console.log('isLeapYear', dayuts().isLeapYear())
console.log('isToday', dayuts().isToday())

// const a = dayuts('1999-01-01')
// const b = dayuts()
// console.log('fromNow:1',a.diff(b, 'year', true))
// console.log('a', a)
// console.log('b', b)
// console.log('fromNow:2',a.diff(b, 'year', true))

dayutsIntl.locale = 'zh-cn'
console.log('new::1', dayuts().$L)

// setTimeout(()=>{
// 	console.log('new::23')
// },100)


export const test = (n : number) : number => {
	switch (n) {
		case 1:
			return 1
		default:
			return 0
	}
}

console.log('test::::', test(1))