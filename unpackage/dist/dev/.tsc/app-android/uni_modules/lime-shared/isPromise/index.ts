// @ts-nocheck
import {isFunction} from '../isFunction'
import {isObject} from '../isObject'
/**
 * 检查一个值是否为 Promise 类型
 * @param val 要检查的值
 * @returns 如果值的类型是 Promise 类型，则返回 true；否则返回 false
 */










export const isPromise = (val: any): boolean => {
  return val instanceof Promise<unknown>
};
