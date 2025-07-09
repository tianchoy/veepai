@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1F0985E
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import java.math.BigDecimal
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import io.dcloud.uniapp.extapi.connectSocket as uni_connectSocket
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.getDeviceInfo as uni_getDeviceInfo
import io.dcloud.uniapp.extapi.getFileSystemManager as uni_getFileSystemManager
import uts.sdk.modules.limeProgress.measureText
import io.dcloud.uniapp.extapi.rpx2px as uni_rpx2px
import io.dcloud.uniapp.extapi.showToast as uni_showToast
val runBlock1 = run {
    __uniConfig.getAppStyles = fun(): Map<String, Map<String, Map<String, Any>>> {
        return GenApp.styles
    }
}
fun initRuntimeSocket(hosts: String, port: String, id: String): UTSPromise<SocketTask?> {
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(null)
    }
    return hosts.split(",").reduce<UTSPromise<SocketTask?>>(fun(promise: UTSPromise<SocketTask?>, host: String): UTSPromise<SocketTask?> {
        return promise.then(fun(socket): UTSPromise<SocketTask?> {
            if (socket != null) {
                return UTSPromise.resolve(socket)
            }
            return tryConnectSocket(host, port, id)
        }
        )
    }
    , UTSPromise.resolve(null))
}
val SOCKET_TIMEOUT: Number = 500
fun tryConnectSocket(host: String, port: String, id: String): UTSPromise<SocketTask?> {
    return UTSPromise(fun(resolve, reject){
        val socket = uni_connectSocket(ConnectSocketOptions(url = "ws://" + host + ":" + port + "/" + id, fail = fun(_) {
            resolve(null)
        }
        ))
        val timer = setTimeout(fun(){
            socket.close(CloseSocketOptions(code = 1006, reason = "connect timeout"))
            resolve(null)
        }
        , SOCKET_TIMEOUT)
        socket.onOpen(fun(e){
            clearTimeout(timer)
            resolve(socket)
        }
        )
        socket.onClose(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
        socket.onError(fun(e){
            clearTimeout(timer)
            resolve(null)
        }
        )
    }
    )
}
fun initRuntimeSocketService(): UTSPromise<Boolean> {
    val hosts: String = "127.0.0.1,192.168.3.34"
    val port: String = "8090"
    val id: String = "app-android_fDFzhr"
    if (hosts == "" || port == "" || id == "") {
        return UTSPromise.resolve(false)
    }
    var socketTask: SocketTask? = null
    __registerWebViewUniConsole(fun(): String {
        return "!function(){\"use strict\";\"function\"==typeof SuppressedError&&SuppressedError;var e=[\"log\",\"warn\",\"error\",\"info\",\"debug\"],n=e.reduce((function(e,n){return e[n]=console[n].bind(console),e}),{}),t=null,r=new Set,o={};function i(e){if(null!=t){var n=e.map((function(e){if(\"string\"==typeof e)return e;var n=e&&\"promise\"in e&&\"reason\"in e,t=n?\"UnhandledPromiseRejection: \":\"\";if(n&&(e=e.reason),e instanceof Error&&e.stack)return e.message&&!e.stack.includes(e.message)?\"\".concat(t).concat(e.message,\"\\n\").concat(e.stack):\"\".concat(t).concat(e.stack);if(\"object\"==typeof e&&null!==e)try{return t+JSON.stringify(e)}catch(e){return t+String(e)}return t+String(e)})).filter(Boolean);n.length>0&&t(JSON.stringify(Object.assign({type:\"error\",data:n},o)))}else e.forEach((function(e){r.add(e)}))}function a(e,n){try{return{type:e,args:u(n)}}catch(e){}return{type:e,args:[]}}function u(e){return e.map((function(e){return c(e)}))}function c(e,n){if(void 0===n&&(n=0),n>=7)return{type:\"object\",value:\"[Maximum depth reached]\"};switch(typeof e){case\"string\":return{type:\"string\",value:e};case\"number\":return function(e){return{type:\"number\",value:String(e)}}(e);case\"boolean\":return function(e){return{type:\"boolean\",value:String(e)}}(e);case\"object\":try{return function(e,n){if(null===e)return{type:\"null\"};if(function(e){return e.\$&&s(e.\$)}(e))return function(e,n){return{type:\"object\",className:\"ComponentPublicInstance\",value:{properties:Object.entries(e.\$.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(s(e))return function(e,n){return{type:\"object\",className:\"ComponentInternalInstance\",value:{properties:Object.entries(e.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return e.style&&null!=e.tagName&&null!=e.nodeName}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e).filter((function(e){var n=e[0];return[\"id\",\"tagName\",\"nodeName\",\"dataset\",\"offsetTop\",\"offsetLeft\",\"style\"].includes(n)})).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return\"function\"==typeof e.getPropertyValue&&\"function\"==typeof e.setProperty&&e.\$styles}(e))return function(e,n){return{type:\"object\",value:{properties:Object.entries(e.\$styles).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(Array.isArray(e))return{type:\"object\",subType:\"array\",value:{properties:e.map((function(e,t){return function(e,n,t){var r=c(e,t);return r.name=\"\".concat(n),r}(e,t,n+1)}))}};if(e instanceof Set)return{type:\"object\",subType:\"set\",className:\"Set\",description:\"Set(\".concat(e.size,\")\"),value:{entries:Array.from(e).map((function(e){return function(e,n){return{value:c(e,n)}}(e,n+1)}))}};if(e instanceof Map)return{type:\"object\",subType:\"map\",className:\"Map\",description:\"Map(\".concat(e.size,\")\"),value:{entries:Array.from(e.entries()).map((function(e){return function(e,n){return{key:c(e[0],n),value:c(e[1],n)}}(e,n+1)}))}};if(e instanceof Promise)return{type:\"object\",subType:\"promise\",value:{properties:[]}};if(e instanceof RegExp)return{type:\"object\",subType:\"regexp\",value:String(e),className:\"Regexp\"};if(e instanceof Date)return{type:\"object\",subType:\"date\",value:String(e),className:\"Date\"};if(e instanceof Error)return{type:\"object\",subType:\"error\",value:e.message||String(e),className:e.name||\"Error\"};var t=void 0,r=e.constructor;r&&r.get\$UTSMetadata\$&&(t=r.get\$UTSMetadata\$().name);var o=Object.entries(e);(function(e){return e.modifier&&e.modifier._attribute&&e.nodeContent})(e)&&(o=o.filter((function(e){var n=e[0];return\"modifier\"!==n&&\"nodeContent\"!==n})));return{type:\"object\",className:t,value:{properties:o.map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n)}catch(e){return{type:\"object\",value:{properties:[]}}}case\"undefined\":return{type:\"undefined\"};case\"function\":return function(e){return{type:\"function\",value:\"function \".concat(e.name,\"() {}\")}}(e);case\"symbol\":return function(e){return{type:\"symbol\",value:e.description}}(e);case\"bigint\":return function(e){return{type:\"bigint\",value:String(e)}}(e)}}function s(e){return e.type&&null!=e.uid&&e.appContext}function f(e,n,t){var r=c(n,t);return r.name=e,r}var l=null,p=[],y={},g=\"---BEGIN:EXCEPTION---\",d=\"---END:EXCEPTION---\";function v(e){null!=l?l(JSON.stringify(Object.assign({type:\"console\",data:e},y))):p.push.apply(p,e)}var m=/^\\s*at\\s+[\\w/./-]+:\\d+\$/;function b(){function t(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=function(e,n,t){if(t||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}([],t,!0);if(o.length){var u=o[o.length-1];\"string\"==typeof u&&m.test(u)&&o.pop()}if(n[e].apply(n,o),\"error\"===e&&1===t.length){var c=t[0];if(\"string\"==typeof c&&c.startsWith(g)){var s=g.length,f=c.length-d.length;return void i([c.slice(s,f)])}if(c instanceof Error)return void i([c])}v([a(e,t)])}}return function(){var e=console.log,n=Symbol();try{console.log=n}catch(e){return!1}var t=console.log===n;return console.log=e,t}()?(e.forEach((function(e){console[e]=t(e)})),function(){e.forEach((function(e){console[e]=n[e]}))}):function(){}}function _(e){var n={type:\"WEB_INVOKE_APPSERVICE\",args:{data:{name:\"console\",arg:e}}};return window.__uniapp_x_postMessageToService?window.__uniapp_x_postMessageToService(n):window.__uniapp_x_.postMessageToService(JSON.stringify(n))}!function(){if(!window.__UNI_CONSOLE_WEBVIEW__){window.__UNI_CONSOLE_WEBVIEW__=!0;var e=\"[web-view]\".concat(window.__UNI_PAGE_ROUTE__?\"[\".concat(window.__UNI_PAGE_ROUTE__,\"]\"):\"\");b(),function(e,n){if(void 0===n&&(n={}),l=e,Object.assign(y,n),null!=e&&p.length>0){var t=p.slice();p.length=0,v(t)}}((function(e){_(e)}),{channel:e}),function(e,n){if(void 0===n&&(n={}),t=e,Object.assign(o,n),null!=e&&r.size>0){var a=Array.from(r);r.clear(),i(a)}}((function(e){_(e)}),{channel:e}),window.addEventListener(\"error\",(function(e){i([e.error])})),window.addEventListener(\"unhandledrejection\",(function(e){i([e])}))}}()}();"
    }
    , fun(data: String){
        socketTask?.send(SendSocketMessageOptions(data = data))
    }
    )
    return UTSPromise.resolve().then(fun(): UTSPromise<Boolean> {
        return initRuntimeSocket(hosts, port, id).then(fun(socket): Boolean {
            if (socket == null) {
                return false
            }
            socketTask = socket
            return true
        }
        )
    }
    ).`catch`(fun(): Boolean {
        return false
    }
    )
}
val runBlock2 = run {
    initRuntimeSocketService()
}
var firstBackTime: Number = 0
open class GenApp : BaseApp {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onLaunch(fun(_: OnLaunchOptions) {
            console.log("App Launch", " at App.uvue:5")
        }
        , __ins)
        onAppShow(fun(_: OnShowOptions) {
            console.log("App Show", " at App.uvue:8")
        }
        , __ins)
        onAppHide(fun() {
            console.log("App Hide", " at App.uvue:11")
        }
        , __ins)
        onLastPageBackPress(fun() {
            console.log("App LastPageBackPress", " at App.uvue:15")
            if (firstBackTime == 0) {
                uni_showToast(ShowToastOptions(title = "再按一次退出应用", position = "bottom"))
                firstBackTime = Date.now()
                setTimeout(fun(){
                    firstBackTime = 0
                }, 2000)
            } else if (Date.now() - firstBackTime < 2000) {
                firstBackTime = Date.now()
                uni_exit(null)
            }
        }
        , __ins)
        onExit(fun() {
            console.log("App Exit", " at App.uvue:32")
        }
        , __ins)
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("uni-row" to padStyleMapOf(utsMapOf("flexDirection" to "row")), "uni-column" to padStyleMapOf(utsMapOf("flexDirection" to "column")))
            }
    }
}
val GenAppClass = CreateVueAppComponent(GenApp::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "app", name = "", inheritAttrs = true, inject = Map(), props = Map(), propsNeedCastKeys = utsArrayOf(), emits = Map(), components = Map(), styles = GenApp.styles)
}
, fun(instance): GenApp {
    return GenApp(instance)
}
)
val GenPagesIndexIndexClass = CreateVueComponent(GenPagesIndexIndex::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesIndexIndex.inheritAttrs, inject = GenPagesIndexIndex.inject, props = GenPagesIndexIndex.props, propsNeedCastKeys = GenPagesIndexIndex.propsNeedCastKeys, emits = GenPagesIndexIndex.emits, components = GenPagesIndexIndex.components, styles = GenPagesIndexIndex.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesIndexIndex.setup(props as GenPagesIndexIndex)
    }
    )
}
, fun(instance, renderer): GenPagesIndexIndex {
    return GenPagesIndexIndex(instance, renderer)
}
)
val `default` = "/static/dot1.png"
val default1 = "/static/dot.png"
typealias DateType = String
open class WeekRange (
    @JsonNotNull
    open var start: Date,
    @JsonNotNull
    open var end: Date,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("WeekRange", "uni_modules/lime-date-strip/components/l-date-strip/type.uts", 6, 13)
    }
}
open class DateStriPDay (
    @JsonNotNull
    open var date: Date,
    @JsonNotNull
    open var key: String,
    @JsonNotNull
    open var day: Number,
    @JsonNotNull
    open var year: Number,
    @JsonNotNull
    open var month: Number,
    @JsonNotNull
    open var text: String,
    @JsonNotNull
    open var type: DateType,
    @JsonNotNull
    open var prefix: String,
    open var prefixStyle: UTSJSONObject? = null,
    open var textStyle: UTSJSONObject? = null,
    open var suffix: String? = null,
    open var suffixStyle: UTSJSONObject? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DateStriPDay", "uni_modules/lime-date-strip/components/l-date-strip/type.uts", 10, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return DateStriPDayReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class DateStriPDayReactiveObject : DateStriPDay, IUTSReactive<DateStriPDay> {
    override var __v_raw: DateStriPDay
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: DateStriPDay, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(date = __v_raw.date, key = __v_raw.key, day = __v_raw.day, year = __v_raw.year, month = __v_raw.month, text = __v_raw.text, type = __v_raw.type, prefix = __v_raw.prefix, prefixStyle = __v_raw.prefixStyle, textStyle = __v_raw.textStyle, suffix = __v_raw.suffix, suffixStyle = __v_raw.suffixStyle) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): DateStriPDayReactiveObject {
        return DateStriPDayReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var date: Date
        get() {
            return trackReactiveGet(__v_raw, "date", __v_raw.date, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("date")) {
                return
            }
            val oldValue = __v_raw.date
            __v_raw.date = value
            triggerReactiveSet(__v_raw, "date", oldValue, value)
        }
    override var key: String
        get() {
            return trackReactiveGet(__v_raw, "key", __v_raw.key, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("key")) {
                return
            }
            val oldValue = __v_raw.key
            __v_raw.key = value
            triggerReactiveSet(__v_raw, "key", oldValue, value)
        }
    override var day: Number
        get() {
            return trackReactiveGet(__v_raw, "day", __v_raw.day, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("day")) {
                return
            }
            val oldValue = __v_raw.day
            __v_raw.day = value
            triggerReactiveSet(__v_raw, "day", oldValue, value)
        }
    override var year: Number
        get() {
            return trackReactiveGet(__v_raw, "year", __v_raw.year, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("year")) {
                return
            }
            val oldValue = __v_raw.year
            __v_raw.year = value
            triggerReactiveSet(__v_raw, "year", oldValue, value)
        }
    override var month: Number
        get() {
            return trackReactiveGet(__v_raw, "month", __v_raw.month, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("month")) {
                return
            }
            val oldValue = __v_raw.month
            __v_raw.month = value
            triggerReactiveSet(__v_raw, "month", oldValue, value)
        }
    override var text: String
        get() {
            return trackReactiveGet(__v_raw, "text", __v_raw.text, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("text")) {
                return
            }
            val oldValue = __v_raw.text
            __v_raw.text = value
            triggerReactiveSet(__v_raw, "text", oldValue, value)
        }
    override var type: DateType
        get() {
            return trackReactiveGet(__v_raw, "type", __v_raw.type, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("type")) {
                return
            }
            val oldValue = __v_raw.type
            __v_raw.type = value
            triggerReactiveSet(__v_raw, "type", oldValue, value)
        }
    override var prefix: String
        get() {
            return trackReactiveGet(__v_raw, "prefix", __v_raw.prefix, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("prefix")) {
                return
            }
            val oldValue = __v_raw.prefix
            __v_raw.prefix = value
            triggerReactiveSet(__v_raw, "prefix", oldValue, value)
        }
    override var prefixStyle: UTSJSONObject?
        get() {
            return trackReactiveGet(__v_raw, "prefixStyle", __v_raw.prefixStyle, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("prefixStyle")) {
                return
            }
            val oldValue = __v_raw.prefixStyle
            __v_raw.prefixStyle = value
            triggerReactiveSet(__v_raw, "prefixStyle", oldValue, value)
        }
    override var textStyle: UTSJSONObject?
        get() {
            return trackReactiveGet(__v_raw, "textStyle", __v_raw.textStyle, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("textStyle")) {
                return
            }
            val oldValue = __v_raw.textStyle
            __v_raw.textStyle = value
            triggerReactiveSet(__v_raw, "textStyle", oldValue, value)
        }
    override var suffix: String?
        get() {
            return trackReactiveGet(__v_raw, "suffix", __v_raw.suffix, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("suffix")) {
                return
            }
            val oldValue = __v_raw.suffix
            __v_raw.suffix = value
            triggerReactiveSet(__v_raw, "suffix", oldValue, value)
        }
    override var suffixStyle: UTSJSONObject?
        get() {
            return trackReactiveGet(__v_raw, "suffixStyle", __v_raw.suffixStyle, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("suffixStyle")) {
                return
            }
            val oldValue = __v_raw.suffixStyle
            __v_raw.suffixStyle = value
            triggerReactiveSet(__v_raw, "suffixStyle", oldValue, value)
        }
}
open class WeekDateCollection (
    @JsonNotNull
    open var start: Number,
    @JsonNotNull
    open var end: Number,
    @JsonNotNull
    open var dates: UTSArray<DateStriPDay>,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("WeekDateCollection", "uni_modules/lime-date-strip/components/l-date-strip/type.uts", 24, 13)
    }
}
typealias DateFormatType = (day: DateStriPDay) -> DateStriPDay
interface DateStripProps {
    var firstDayOfWeek: Number
    var format: DateFormatType?
    var maxDate: Number?
    var minDate: Number?
    var value: Number?
    var defaultValue: Number?
    var modelValue: Number?
    var height: String?
    var gridWidth: String?
    var color: String?
    var activeBgColor: String?
    var activeColor: String?
    var bgColor: String?
    var radius: String?
    var switchMode: String
    var shape: String
    var showNavigation: Boolean?
    var weekdays: UTSArray<String>
}
interface DateStripItemProps {
    var dates: UTSArray<DateStriPDay>
    var color: String?
    var activeBgColor: String?
    var activeColor: String?
    var bgColor: String?
    var radius: String?
    var gridWidth: String?
    var switchMode: String
    var shape: String
}
val GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItemClass = CreateVueComponent(GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.inheritAttrs, inject = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.inject, props = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.props, propsNeedCastKeys = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.propsNeedCastKeys, emits = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.emits, components = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.components, styles = GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem.setup(props as GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem {
    return GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem(instance)
}
)
fun getWeekRange(date: Date, firstDayOfWeek: Number): WeekRange {
    val start = Date(date.getTime())
    val dayOffset = (date.getDay() - firstDayOfWeek + 7) % 7
    start.setDate(start.getDate() - dayOffset)
    val end = Date(start.getTime())
    end.setDate(end.getDate() + 6)
    return WeekRange(start = start, end = end)
}
fun addDays(date: Date, days: Number): Date {
    val result = Date(date.getTime())
    result.setDate(result.getDate() + days)
    return result
}
fun addWeeks(date: Date, weeks: Number): Date {
    val result = Date(date.getTime())
    result.setDate(result.getDate() + weeks * 7)
    return result
}
fun isSameDay(date1: Date, date2: Date): Boolean {
    return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())
}
fun calcType(date: Date, minDate: Date, maxDate: Date, selectedDate: Date?): DateType {
    if (date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()) {
        return "disabled"
    }
    if (selectedDate != null && isSameDay(date, selectedDate)) {
        return "selected"
    }
    return ""
}
fun daysBetween(date1: Date, date2: Date): Number {
    val diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
    return Math.floor(diffInMilliseconds / 86400000)
}
fun isString(str: Any?): Boolean {
    return UTSAndroid.`typeof`(str) == "string"
}
fun isNumber(value: Any?): Boolean {
    return utsArrayOf(
        "Byte",
        "UByte",
        "Short",
        "UShort",
        "Int",
        "UInt",
        "Long",
        "ULong",
        "Float",
        "Double",
        "number"
    ).includes(UTSAndroid.`typeof`(value))
}
fun isNumeric(value: Any?): Boolean {
    if (value == null) {
        return false
    }
    if (isNumber(value)) {
        return true
    } else if (isString(value)) {
        val regex = UTSRegExp("^(-)?\\d+(\\.\\d+)?\$")
        return regex.test(value as String)
    }
    return false
}
fun unitConvert(value: Any?, base: Number = 0): Number {
    if (isNumber(value)) {
        return value as Number
    }
    if (isNumeric(value)) {
        return parseFloat(value as String)
    }
    if (isString(value)) {
        val reg = UTSRegExp("^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)\$", "g")
        val results = reg.exec(value as String)
        if (results == null) {
            return 0
        }
        val unit = results[3]
        val _value = parseFloat(value)
        if (unit == "rpx") {
            return uni_rpx2px(_value)
        }
        if (unit == "px") {
            return _value
        }
        if (unit == "%") {
            return _value / 100 * base
        }
    }
    return 0
}
val GenUniModulesLimeDateStripComponentsLDateStripLDateStripClass = CreateVueComponent(GenUniModulesLimeDateStripComponentsLDateStripLDateStrip::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.inheritAttrs, inject = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.inject, props = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.props, propsNeedCastKeys = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.propsNeedCastKeys, emits = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.emits, components = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.components, styles = GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesLimeDateStripComponentsLDateStripLDateStrip.setup(props as GenUniModulesLimeDateStripComponentsLDateStripLDateStrip, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeDateStripComponentsLDateStripLDateStrip {
    return GenUniModulesLimeDateStripComponentsLDateStripLDateStrip(instance)
}
)
interface LDay {
    var day: Number
    var month: Number
    var year: Number
    var fullDate: String
    var isBeforeToday: Boolean
    var isToday: Boolean
    var isCurrentMonth: Boolean
    var width: Number
    var height: Number
    var originalMonth: Number
    var type: String
    var fontSize: Number
    var timestamp: Number
    fun isCoordinateInside(x: Number, y: Number): Boolean
    fun setPosition(x: Number, y: Number)
    fun setDimensions(width: Number, height: Number)
    var selectDate: LDay?
    var canSupplement: Boolean
    var isCheckedIn: Boolean
    fun draw(ctx: CanvasRenderingContext2D)
}
open class LYearMonth (
    @JsonNotNull
    open var year: Number,
    @JsonNotNull
    open var month: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LYearMonth", "uni_modules/lime-daily-punch/index.uts", 25, 13)
    }
}
open class LGridSize (
    @JsonNotNull
    open var x: Number,
    @JsonNotNull
    open var y: Number,
    @JsonNotNull
    open var width: Number,
    @JsonNotNull
    open var height: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LGridSize", "uni_modules/lime-daily-punch/index.uts", 29, 13)
    }
}
open class LMonthData (
    @JsonNotNull
    open var year: Number,
    @JsonNotNull
    open var month: Number,
    @JsonNotNull
    open var days: UTSArray<LDay>,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LMonthData", "uni_modules/lime-daily-punch/index.uts", 35, 13)
    }
}
open class LOptions (
    open var canSupplement: Boolean? = null,
    open var isFullCalendar: Boolean? = null,
    open var yearMonth: String? = null,
    open var signedDates: UTSArray<String>? = null,
    open var week: UTSArray<String>? = null,
    open var dayHeight: Number? = null,
    open var weekStartsOn: Number? = null,
    open var weekColor: String? = null,
    open var weekFontSize: Number? = null,
    open var weekHeight: Number? = null,
    open var selectedDayBgColor: String? = null,
    open var dayFontSize: Number? = null,
    open var textColor: String? = null,
    open var disabledColor: String? = null,
    open var monthTitleHeight: Number? = null,
    open var monthTitleFontSize: Number? = null,
    open var color: String? = null,
    open var unsignedColor: String? = null,
    open var select: ((day: LDay) -> Unit)? = null,
    open var panelChange: ((res: LYearMonth) -> Unit)? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LOptions", "uni_modules/lime-daily-punch/index.uts", 40, 13)
    }
}
open class ArrowIcon : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ArrowIcon", "uni_modules/lime-daily-punch/components/l-daily-punch/calender.uts", 3, 14)
    }
    open var x: Number = 0
    open var y: Number = 0
    open var size: Number = 0
    open var type: String = ""
    open var color: String = ""
    constructor(x: Number, y: Number, size: Number, type: String, color: String){
        this.x = x
        this.y = y
        this.size = size
        this.type = type
        this.color = color
    }
    open fun draw(ctx: CanvasRenderingContext2D) {
        val _this = this
        val x = _this.x
        val y = _this.y
        val size = _this.size
        val color = _this.color
        val type = _this.type
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.lineJoin = "round"
        ctx.lineWidth = 2
        if (type === "left") {
            ctx.moveTo(x + size * 0.6042, y + size * 0.25)
            ctx.lineTo(x + size * 0.3542, y + size * 0.5)
            ctx.lineTo(x + size * 0.6042, y + size * 0.75)
        } else if (type === "right") {
            ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25)
            ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5)
            ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75)
        }
        ctx.stroke()
    }
    open fun isCoordinateInside(x: Number, y: Number): Boolean {
        return x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size
    }
}
open class Day : LDay, IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Day", "uni_modules/lime-daily-punch/components/l-daily-punch/calender.uts", 40, 14)
    }
    override var day: Number = 0
    override var month: Number = 0
    override var year: Number = 0
    open var fullDay: String = "00"
    open var fullMonth: String = "00"
    override var fullDate: String = ""
    override var isBeforeToday: Boolean = false
    override var isToday: Boolean = false
    override var isCurrentMonth: Boolean = false
    private var x: Number = 0
    private var y: Number = 0
    private var calendar: Calendar
    override var width: Number = 0
    override var height: Number = 0
    override var originalMonth: Number = 0
    override var type: String = "current"
    override var fontSize: Number = 20
    override var timestamp: Number = 0
    constructor(day: Number, month: Number, year: Number, isCurrentMonth: Boolean, isToday: Boolean, isBeforeToday: Boolean, calendar: Calendar){
        this.day = day
        this.month = month
        this.year = year
        this.originalMonth = month - 1
        this.fullMonth = this.formatMonth(month)
        this.fullDay = this.formatDay(day)
        this.fullDate = "" + year + "-" + this.fullMonth + "-" + this.fullDay
        this.isCurrentMonth = isCurrentMonth
        this.isBeforeToday = isBeforeToday
        this.isToday = isToday
        this.calendar = calendar
        this.timestamp = Date(year, month - 1, day).getTime()
    }
    private fun formatDay(day: Number): String {
        return ("" + day).padStart(2, "0")
    }
    private fun formatMonth(month: Number): String {
        return ("" + month).padStart(2, "0")
    }
    override fun isCoordinateInside(x: Number, y: Number): Boolean {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
    }
    override fun setPosition(x: Number, y: Number): Unit {
        this.x = x
        this.y = y
    }
    override fun setDimensions(width: Number, height: Number): Unit {
        this.width = width
        this.height = height
    }
    open val opt: LOptions
        get(): LOptions {
            return this.calendar.opt
        }
    override var selectDate: LDay?
        get(): LDay? {
            return this.calendar.selectDate
        }
        set(_val: LDay?) {}
    override var canSupplement: Boolean
        get(): Boolean {
            return this.opt.canSupplement!! && this.isBeforeToday && !this.isCheckedIn
        }
        set(_v: Boolean) {}
    override var isCheckedIn: Boolean
        get(): Boolean {
            return this.calendar.signedDates.includes(this.timestamp)
        }
        set(_v: Boolean) {}
    private fun drawCircle(ctx: CanvasRenderingContext2D, x: Number, y: Number, radius: Number, color: String, border: Boolean = false) {
        ctx.beginPath()
        if (border) {
            ctx.lineWidth = 1
            ctx.strokeStyle = "white"
        }
        ctx.fillStyle = color
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        if (border) {
            ctx.stroke()
        }
    }
    override fun draw(ctx: CanvasRenderingContext2D) {
        val size = Math.min(this.width, this.height) * 0.9
        val centerX = this.x + this.width / 2
        val centerY = this.y + this.height / 2
        val color = this.opt.color!!
        val unsignedColor = this.opt.unsignedColor!!
        val selectedDayBgColor = this.opt.selectedDayBgColor!!
        val textColor = this.opt.textColor!!
        val disabledColor = this.opt.disabledColor!!
        val dayFontSize = this.opt.dayFontSize!!
        ctx.textAlign = "center"
        ctx.font = if (this.isToday) {
            "" + (dayFontSize - 2) + "px Arial"
        } else {
            "" + dayFontSize + "px Arial"
        }
        ctx.textBaseline = "middle"
        val isSelectedDate = this.selectDate == null || this.selectDate == this
        var txtColor = if (this.type == "current") {
            textColor
        } else {
            disabledColor
        }
        if (this.isToday && !isSelectedDate) {
            txtColor = color
        }
        if (this.selectDate != null && this.selectDate == this) {
            ctx.beginPath()
            ctx.fillStyle = selectedDayBgColor
            ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
            ctx.fill()
        }
        if (this.isToday && isSelectedDate) {
            this.drawCircle(ctx, centerX, centerY, size / 2, color)
            txtColor = "white"
        }
        if (this.type == "current" && (this.isCheckedIn || this.canSupplement)) {
            this.drawCircle(ctx, centerX, centerY + this.fontSize * 0.9, 4, if (this.isCheckedIn) {
                if (this.isToday && isSelectedDate) {
                    "white"
                } else {
                    color
                }
            } else {
                unsignedColor
            }
            )
        }
        ctx.fillStyle = txtColor
        ctx.fillText(if (this.isToday) {
            "今天"
        } else {
            this.fullDay
        }
        , centerX, centerY)
    }
}
open class Calendar : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Calendar", "uni_modules/lime-daily-punch/components/l-daily-punch/calender.uts", 170, 14)
    }
    private var year: Number = 0
    private var month: Number = 0
    private var el: UniCanvasElement? = null
    private var ctx: CanvasRenderingContext2D? = null
    private var init: Boolean = false
    private var today: Number = 0
    private var currentMonth: Number = 0
    private var currentYear: Number = 0
    private var monthDateCache: Map<String, LMonthData>
    private var week: UTSArray<String> = utsArrayOf()
    open var selectDate: LDay? = null
    private var containerHeight: Number = 0
    private var containerWidth: Number = 0
    private var arrowIcons: UTSArray<ArrowIcon> = utsArrayOf()
    open var opt: LOptions = LOptions(canSupplement = false, isFullCalendar = true, yearMonth = "", signedDates = utsArrayOf(), week = utsArrayOf(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
    ), weekStartsOn = 0, weekColor = "#BDC0C3", weekFontSize = 12, weekHeight = 40, selectedDayBgColor = "rgba(0,0,0,0.06)", dayFontSize = 12, textColor = "#1A1F24", disabledColor = "#BDC0C3", monthTitleHeight = 50, monthTitleFontSize = 20, color = "#3B87F6", unsignedColor = "#F1A33A")
    constructor(){
        val date = Date()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1
        this.today = date.getDate()
        this.monthDateCache = Map<String, LMonthData>()
        this.week = this.opt.week ?: utsArrayOf()
    }
    open val signedDates: UTSArray<Number>
        get(): UTSArray<Number> {
            if (this.opt.signedDates == null) {
                return utsArrayOf()
            }
            val values: UTSArray<Number> = utsArrayOf()
            this.opt.signedDates!!.forEach(fun(item){
                val _item_split_map = item.split("-").map(fun(v: String): Number {
                    return parseInt(v)
                }
                )
                val year = _item_split_map[0]
                val month = _item_split_map[1]
                val day = _item_split_map[2]
                val time = Date(year, month - 1, day).getTime()
                if (!values.includes(time)) {
                    values.push(time)
                }
            }
            )
            return values
        }
    open val checkinDays: Number
        get(): Number {
            if (this.signedDates.length == 0) {
                return 0
            }
            val sortedDates = this.signedDates.sort(fun(a, b): Number {
                if (a.compareTo(b) == 0) {
                    return 0
                }
                return b - a
            }
            )
            return this.calculateContinuousCheckinDays(sortedDates)
        }
    private fun calculateContinuousCheckinDays(sortedDates: UTSArray<Number>): Number {
        val dayInMillis: Number = 86400000
        val todayTime = Date(this.currentYear, this.currentMonth - 1, this.today).getTime()
        var streak: Number = 0
        run {
            var i: Number = 0
            while(i < sortedDates.length){
                if (i == 0) {
                    if (todayTime - sortedDates[i] > dayInMillis) {
                        break
                    }
                    if (sortedDates[i] == todayTime || todayTime - sortedDates[i] == dayInMillis) {
                        streak = 1
                    }
                } else {
                    if (sortedDates[i - 1] - sortedDates[i] == dayInMillis) {
                        streak++
                    } else {
                        break
                    }
                }
                i++
            }
        }
        return streak
    }
    open fun setCanvas(el: UniCanvasElement?) {
        if (el == null) {
            return
        }
        this.el = el
        this.containerHeight = 6 * (this.opt.dayHeight ?: 0) + this.opt.weekHeight!! + this.opt.monthTitleHeight!!
        this.containerWidth = this.el!!.offsetWidth
        this.el!!.style.setProperty("height", this.containerHeight + "px")
        this.ctx = el.getContext("2d")!!
        val dpr = uni_getDeviceInfo(null).devicePixelRatio ?: 1
        this.el!!.width = this.containerWidth * dpr
        this.el!!.height = this.containerHeight * dpr
        this.ctx!!.scale(dpr, dpr)
    }
    open fun setOptions(opt: LOptions) {
        var datechange = false
        var weekStartsOn: Number = -1
        for(key in resolveUTSKeyIterator(opt)){
            val value = opt[key]
            if (key == "yearMonth" && value != null && value != this.opt.yearMonth) {
                datechange = true
            }
            if (key == "weekStartsOn" && value != null && value != this.opt.weekStartsOn) {
                weekStartsOn = value as Number
            }
            if (value != null) {
                this.opt[key] = value
            }
        }
        if (weekStartsOn != -1) {
            val normalWeek = this.opt.week!!.slice()
            val sIndex = if (weekStartsOn < 0) {
                0
            } else {
                if (weekStartsOn >= normalWeek.length) {
                    normalWeek.length - 1
                } else {
                    weekStartsOn
                }
            }
            normalWeek.unshift(*normalWeek.slice(-sIndex).toTypedArray())
            normalWeek.length = 6
            this.week = normalWeek
        }
        if (this.opt.yearMonth != "" && !this.init || datechange) {
            val arr = this.opt.yearMonth!!.split("-")
            this.year = parseInt(arr[0])
            this.month = parseInt(arr[1])
            this.init = true
        }
    }
    open fun getMonthDayLength(year: Number, month: Number): Number {
        return Date(year, month, 0).getDate()
    }
    open fun getFirstDayOfWeek(year: Number, month: Number, day: Number = 1): Number {
        return Date(year, month - 1, day).getDay()
    }
    open fun getOperateMonthDate(nowYear: Number, nowMonth: Number, num: Number): LYearMonth {
        var month = nowMonth + num
        var year = nowYear
        if (month > 12) {
            month = 1
            year++
        } else if (month < 1) {
            month = 12
            year--
        }
        return LYearMonth(month = month, year = year)
    }
    open fun generateMonthDateCache(year: Number = this.year, month: Number = this.month): LMonthData {
        val key = "" + year + "-" + month
        if (this.monthDateCache.has(key)) {
            return this.monthDateCache.get(key)!!
        }
        val arr: UTSArray<LDay> = utsArrayOf()
        val days = this.getMonthDayLength(year, month)
        val firstday = this.getFirstDayOfWeek(year, month)
        val beforeEmptyLength = (firstday + this.opt.weekStartsOn!!) % 7
        val afterEmptyLength = 35 - beforeEmptyLength - days
        val last = this.getOperateMonthDate(year, month, -1)
        val lastMonthEndDay = this.getMonthDayLength(last.year, last.month)
        val next = this.getOperateMonthDate(year, month, 1)
        val today = Date(this.currentYear, this.currentMonth - 1, this.today).getTime()
        var index: Number = 0
        val getGridSize = fun(i: Number): LGridSize {
            val rect = this.el?.getBoundingClientRect()
            val height = this.opt.dayHeight ?: 0
            val width = if (rect == null) {
                0
            } else {
                rect.width / 7
            }
            val row = Math.floor(i / 7)
            val col = i % 7
            val x = col * width
            val y = row * height + this.opt.monthTitleHeight!! + this.opt.weekHeight!!
            return LGridSize(x = x, y = y, width = width, height = height)
        }
        run {
            var i: Number = 0
            while(i < beforeEmptyLength){
                val _getGridSize = getGridSize(index)
                val x = _getGridSize.x
                val y = _getGridSize.y
                val width = _getGridSize.width
                val height = _getGridSize.height
                val date = lastMonthEndDay - beforeEmptyLength + i + 1
                val time = Date(last.year, last.month - 1, date).getTime()
                val day = Day(date, last.month, last.year, last.year == this.currentYear && last.month == this.currentMonth, time == today, time < today, this)
                day.type = "last"
                day.setPosition(x, y)
                day.setDimensions(width, height)
                arr.push(day)
                index++
                i++
            }
        }
        run {
            var i: Number = 0
            while(i < days){
                val _getGridSize = getGridSize(index)
                val x = _getGridSize.x
                val y = _getGridSize.y
                val width = _getGridSize.width
                val height = _getGridSize.height
                val date = i + 1
                val time = Date(year, month - 1, date).getTime()
                val day = Day(date, month, year, year == this.currentYear && month == this.currentMonth, time == today, time < today, this)
                day.setPosition(x, y)
                day.setDimensions(width, height)
                arr.push(day)
                index++
                i++
            }
        }
        run {
            var i: Number = 0
            while(i < afterEmptyLength){
                val _getGridSize = getGridSize(index)
                val x = _getGridSize.x
                val y = _getGridSize.y
                val width = _getGridSize.width
                val height = _getGridSize.height
                val date = i + 1
                val time = Date(next.year, next.month - 1, date).getTime()
                val day = Day(date, next.month, next.year, next.year == this.currentYear && next.month == this.currentMonth, time == today, time < today, this)
                day.type = "next"
                day.setPosition(x, y)
                day.setDimensions(width, height)
                arr.push(day)
                index++
                i++
            }
        }
        val monthData = LMonthData(year = year, month = month, days = arr)
        this.monthDateCache.set(key, monthData)
        return monthData
    }
    open fun next() {
        val _this_getOperateMonthDate = this.getOperateMonthDate(this.year, this.month, 1)
        val year = _this_getOperateMonthDate.year
        val month = _this_getOperateMonthDate.month
        val canSwitchToNextMonth = this.currentYear > year || (this.currentYear == year && month - this.currentMonth <= 1)
        if (canSwitchToNextMonth) {
            this.year = year
            this.month = month
            this.render(year, month)
        } else {
            uni_showToast(ShowToastOptions(icon = "error", title = "往后最多查看一个月"))
        }
    }
    open fun last() {
        val _this_getOperateMonthDate = this.getOperateMonthDate(this.year, this.month, -1)
        val year = _this_getOperateMonthDate.year
        val month = _this_getOperateMonthDate.month
        this.year = year
        this.month = month
        this.render(year, month)
    }
    open fun goToDate(date: String? = null) {
        if (date == null) {
            this.render(this.currentYear, this.currentMonth, this.today)
        } else {
            try {
                val _date_split_map = date.split("-").map(fun(item): Number {
                    return parseInt(item)
                }
                )
                val year = _date_split_map[0]
                val month = _date_split_map[1]
                val day = _date_split_map[2]
                this.render(year, month, day)
            }
             catch (e: Throwable) {
                throw UTSError("参数有误")
            }
        }
    }
    private fun drawIcon(ctx: CanvasRenderingContext2D, size: Number, x: Number, y: Number, arrow: String, color: String) {
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.lineJoin = "round"
        ctx.lineWidth = 2
        if (arrow === "left") {
            ctx.moveTo(x + size * 0.6042, y + size * 0.25)
            ctx.lineTo(x + size * 0.3542, y + size * 0.5)
            ctx.lineTo(x + size * 0.6042, y + size * 0.75)
        } else if (arrow === "right") {
            ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25)
            ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5)
            ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75)
        }
        ctx.stroke()
    }
    private fun drawHead(monthData: LMonthData) {
        val width = this.containerWidth
        if (this.ctx == null) {
            return
        }
        val ctx = this.ctx!!
        val height = this.opt.monthTitleHeight!!
        ctx.textAlign = "center"
        ctx.fillStyle = this.opt.textColor!!
        ctx.font = " " + this.opt.monthTitleFontSize!! + "px sans-serif"
        ctx.textBaseline = "middle"
        ctx.fillText("" + monthData.year + "\u5E74" + ("" + monthData.month).padStart(2, "0") + "月", width * 0.5, height * 0.55)
        if (this.arrowIcons.length == 0) {
            val offsetTop = (height - 30) / 2
            this.arrowIcons.push(ArrowIcon(0, offsetTop, 30, "left", "#A0A5AA"))
            this.arrowIcons.push(ArrowIcon(width - 30, offsetTop, 30, "right", "#A0A5AA"))
        }
        this.arrowIcons.forEach(fun(icon){
            icon.draw(ctx)
        }
        )
    }
    private fun drawWeek() {
        if (this.ctx == null) {
            return
        }
        val ctx = this.ctx!!
        ctx.textAlign = "center"
        ctx.font = "" + this.opt.weekFontSize + "px Arial"
        ctx.textBaseline = "middle"
        ctx.fillStyle = this.opt.weekColor!!
        this.week.forEach(fun(week, index){
            ctx.fillText("" + week, this.containerWidth / 7 * (index + 0.5), this.opt.monthTitleHeight!! + this.opt.weekHeight!! * 0.5)
        }
        )
    }
    open fun render(year: Number = this.year, month: Number = this.month, day: Number? = null) {
        val monthData = this.generateMonthDateCache(year, month)
        if (day != null) {
            this.selectDate = monthData.days.find(fun(item): Boolean {
                return item.day == day
            }
            )
        }
        if (this.el != null && this.ctx != null) {
            this.ctx!!.clearRect(0, 0, this.containerWidth, this.containerHeight)
            this.drawHead(monthData)
            this.drawWeek()
            monthData.days.forEach(fun(day){
                day.draw(this.ctx!!)
            }
            )
        }
        return
    }
    open fun touch(e: UniPointerEvent) {
        if (this.el == null) {
            return
        }
        val rect = this.el!!.getBoundingClientRect()
        val x = e.clientX - rect.left
        val y = e.clientY - rect.top
        val icon = this.arrowIcons.find(fun(icon): Boolean {
            return icon.isCoordinateInside(x, y)
        }
        )
        if (icon != null) {
            if (icon.type == "left") {
                this.last()
            } else {
                this.next()
            }
            this.opt.panelChange?.invoke(LYearMonth(year = this.year, month = this.month))
            return
        }
        val month = this.monthDateCache.get("" + this.year + "-" + this.month)
        if (month == null) {
            return
        }
        val day = month.days.find(fun(day): Boolean {
            return day.isCoordinateInside(x, y)
        }
        )
        if (day != null && day.type == "current") {
            this.selectDate = day
            this.render()
            this.opt.select?.invoke(day)
        }
    }
}
val GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunchClass = CreateVueComponent(GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.inheritAttrs, inject = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.inject, props = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.props, propsNeedCastKeys = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.propsNeedCastKeys, emits = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.emits, components = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.components, styles = GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch.setup(props as GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch {
    return GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.inject, props = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.emits, components = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.components, styles = GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup {
    return GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup(instance)
}
)
val SECONDS_A_MINUTE: Number = 60
val SECONDS_A_HOUR = SECONDS_A_MINUTE * 60
val SECONDS_A_DAY = SECONDS_A_HOUR * 24
val SECONDS_A_WEEK = SECONDS_A_DAY * 7
val MILLISECONDS_A_SECOND: Number = 1e3
val MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND
val MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND
val MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND
val MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND
val MS = "millisecond"
val S = "second"
val MIN = "minute"
val H = "hour"
val D = "day"
val W = "week"
val M = "month"
val Q = "quarter"
val Y = "year"
val DATE = "date"
val FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ"
val INVALID_DATE_STRING = "Invalid Date"
val REGEX_PARSE = UTSRegExp("^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[Tt\\s]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?[.:]?(\\d+)?\$", "")
open class DayutsConfig (
    open var date: Any? = null,
    open var format: String? = null,
    open var locale: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsConfig", "uni_modules/lime-dayuts/utssdk/interface.uts", 2, 13)
    }
}
typealias DayutsUnit = String
open class DayutsFormats (
    @JsonNotNull
    open var LT: String,
    @JsonNotNull
    open var LTS: String,
    @JsonNotNull
    @get:JvmName("getL0")
    @set:JvmName("setL0")
    open var L: String,
    @JsonNotNull
    open var LL: String,
    @JsonNotNull
    open var LLL: String,
    @JsonNotNull
    open var LLLL: String,
    @JsonNotNull
    @get:JvmName("getL1")
    @set:JvmName("setL1")
    open var l: String,
    @JsonNotNull
    open var ll: String,
    @JsonNotNull
    open var lll: String,
    @JsonNotNull
    open var llll: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsFormats", "uni_modules/lime-dayuts/utssdk/interface.uts", 8, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return DayutsFormatsReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class DayutsFormatsReactiveObject : DayutsFormats, IUTSReactive<DayutsFormats> {
    override var __v_raw: DayutsFormats
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: DayutsFormats, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(LT = __v_raw.LT, LTS = __v_raw.LTS, L = __v_raw.L, LL = __v_raw.LL, LLL = __v_raw.LLL, LLLL = __v_raw.LLLL, l = __v_raw.l, ll = __v_raw.ll, lll = __v_raw.lll, llll = __v_raw.llll) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): DayutsFormatsReactiveObject {
        return DayutsFormatsReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var LT: String
        get() {
            return trackReactiveGet(__v_raw, "LT", __v_raw.LT, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("LT")) {
                return
            }
            val oldValue = __v_raw.LT
            __v_raw.LT = value
            triggerReactiveSet(__v_raw, "LT", oldValue, value)
        }
    override var LTS: String
        get() {
            return trackReactiveGet(__v_raw, "LTS", __v_raw.LTS, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("LTS")) {
                return
            }
            val oldValue = __v_raw.LTS
            __v_raw.LTS = value
            triggerReactiveSet(__v_raw, "LTS", oldValue, value)
        }
    override var L: String
        @JvmName("getL0")
        get() {
            return trackReactiveGet(__v_raw, "L", __v_raw.L, this.__v_isReadonly, this.__v_isShallow)
        }
        @JvmName("setL0")
        set(value) {
            if (!this.__v_canSet("L")) {
                return
            }
            val oldValue = __v_raw.L
            __v_raw.L = value
            triggerReactiveSet(__v_raw, "L", oldValue, value)
        }
    override var LL: String
        get() {
            return trackReactiveGet(__v_raw, "LL", __v_raw.LL, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("LL")) {
                return
            }
            val oldValue = __v_raw.LL
            __v_raw.LL = value
            triggerReactiveSet(__v_raw, "LL", oldValue, value)
        }
    override var LLL: String
        get() {
            return trackReactiveGet(__v_raw, "LLL", __v_raw.LLL, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("LLL")) {
                return
            }
            val oldValue = __v_raw.LLL
            __v_raw.LLL = value
            triggerReactiveSet(__v_raw, "LLL", oldValue, value)
        }
    override var LLLL: String
        get() {
            return trackReactiveGet(__v_raw, "LLLL", __v_raw.LLLL, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("LLLL")) {
                return
            }
            val oldValue = __v_raw.LLLL
            __v_raw.LLLL = value
            triggerReactiveSet(__v_raw, "LLLL", oldValue, value)
        }
    override var l: String
        @JvmName("getL1")
        get() {
            return trackReactiveGet(__v_raw, "l", __v_raw.l, this.__v_isReadonly, this.__v_isShallow)
        }
        @JvmName("setL1")
        set(value) {
            if (!this.__v_canSet("l")) {
                return
            }
            val oldValue = __v_raw.l
            __v_raw.l = value
            triggerReactiveSet(__v_raw, "l", oldValue, value)
        }
    override var ll: String
        get() {
            return trackReactiveGet(__v_raw, "ll", __v_raw.ll, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("ll")) {
                return
            }
            val oldValue = __v_raw.ll
            __v_raw.ll = value
            triggerReactiveSet(__v_raw, "ll", oldValue, value)
        }
    override var lll: String
        get() {
            return trackReactiveGet(__v_raw, "lll", __v_raw.lll, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("lll")) {
                return
            }
            val oldValue = __v_raw.lll
            __v_raw.lll = value
            triggerReactiveSet(__v_raw, "lll", oldValue, value)
        }
    override var llll: String
        get() {
            return trackReactiveGet(__v_raw, "llll", __v_raw.llll, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("llll")) {
                return
            }
            val oldValue = __v_raw.llll
            __v_raw.llll = value
            triggerReactiveSet(__v_raw, "llll", oldValue, value)
        }
}
open class DayutsRelativeTime (
    @JsonNotNull
    open var future: String,
    @JsonNotNull
    open var past: String,
    @JsonNotNull
    open var s: String,
    @JsonNotNull
    @get:JvmName("getM0")
    @set:JvmName("setM0")
    open var m: String,
    @JsonNotNull
    open var mm: String,
    @JsonNotNull
    open var h: String,
    @JsonNotNull
    open var hh: String,
    @JsonNotNull
    open var d: String,
    @JsonNotNull
    open var dd: String,
    @JsonNotNull
    @get:JvmName("getM1")
    @set:JvmName("setM1")
    open var M: String,
    @JsonNotNull
    open var MM: String,
    @JsonNotNull
    open var y: String,
    @JsonNotNull
    open var yy: String,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsRelativeTime", "uni_modules/lime-dayuts/utssdk/interface.uts", 50, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return DayutsRelativeTimeReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class DayutsRelativeTimeReactiveObject : DayutsRelativeTime, IUTSReactive<DayutsRelativeTime> {
    override var __v_raw: DayutsRelativeTime
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: DayutsRelativeTime, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(future = __v_raw.future, past = __v_raw.past, s = __v_raw.s, m = __v_raw.m, mm = __v_raw.mm, h = __v_raw.h, hh = __v_raw.hh, d = __v_raw.d, dd = __v_raw.dd, M = __v_raw.M, MM = __v_raw.MM, y = __v_raw.y, yy = __v_raw.yy) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): DayutsRelativeTimeReactiveObject {
        return DayutsRelativeTimeReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var future: String
        get() {
            return trackReactiveGet(__v_raw, "future", __v_raw.future, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("future")) {
                return
            }
            val oldValue = __v_raw.future
            __v_raw.future = value
            triggerReactiveSet(__v_raw, "future", oldValue, value)
        }
    override var past: String
        get() {
            return trackReactiveGet(__v_raw, "past", __v_raw.past, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("past")) {
                return
            }
            val oldValue = __v_raw.past
            __v_raw.past = value
            triggerReactiveSet(__v_raw, "past", oldValue, value)
        }
    override var s: String
        get() {
            return trackReactiveGet(__v_raw, "s", __v_raw.s, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("s")) {
                return
            }
            val oldValue = __v_raw.s
            __v_raw.s = value
            triggerReactiveSet(__v_raw, "s", oldValue, value)
        }
    override var m: String
        @JvmName("getM0")
        get() {
            return trackReactiveGet(__v_raw, "m", __v_raw.m, this.__v_isReadonly, this.__v_isShallow)
        }
        @JvmName("setM0")
        set(value) {
            if (!this.__v_canSet("m")) {
                return
            }
            val oldValue = __v_raw.m
            __v_raw.m = value
            triggerReactiveSet(__v_raw, "m", oldValue, value)
        }
    override var mm: String
        get() {
            return trackReactiveGet(__v_raw, "mm", __v_raw.mm, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("mm")) {
                return
            }
            val oldValue = __v_raw.mm
            __v_raw.mm = value
            triggerReactiveSet(__v_raw, "mm", oldValue, value)
        }
    override var h: String
        get() {
            return trackReactiveGet(__v_raw, "h", __v_raw.h, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("h")) {
                return
            }
            val oldValue = __v_raw.h
            __v_raw.h = value
            triggerReactiveSet(__v_raw, "h", oldValue, value)
        }
    override var hh: String
        get() {
            return trackReactiveGet(__v_raw, "hh", __v_raw.hh, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("hh")) {
                return
            }
            val oldValue = __v_raw.hh
            __v_raw.hh = value
            triggerReactiveSet(__v_raw, "hh", oldValue, value)
        }
    override var d: String
        get() {
            return trackReactiveGet(__v_raw, "d", __v_raw.d, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("d")) {
                return
            }
            val oldValue = __v_raw.d
            __v_raw.d = value
            triggerReactiveSet(__v_raw, "d", oldValue, value)
        }
    override var dd: String
        get() {
            return trackReactiveGet(__v_raw, "dd", __v_raw.dd, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("dd")) {
                return
            }
            val oldValue = __v_raw.dd
            __v_raw.dd = value
            triggerReactiveSet(__v_raw, "dd", oldValue, value)
        }
    override var M: String
        @JvmName("getM1")
        get() {
            return trackReactiveGet(__v_raw, "M", __v_raw.M, this.__v_isReadonly, this.__v_isShallow)
        }
        @JvmName("setM1")
        set(value) {
            if (!this.__v_canSet("M")) {
                return
            }
            val oldValue = __v_raw.M
            __v_raw.M = value
            triggerReactiveSet(__v_raw, "M", oldValue, value)
        }
    override var MM: String
        get() {
            return trackReactiveGet(__v_raw, "MM", __v_raw.MM, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("MM")) {
                return
            }
            val oldValue = __v_raw.MM
            __v_raw.MM = value
            triggerReactiveSet(__v_raw, "MM", oldValue, value)
        }
    override var y: String
        get() {
            return trackReactiveGet(__v_raw, "y", __v_raw.y, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("y")) {
                return
            }
            val oldValue = __v_raw.y
            __v_raw.y = value
            triggerReactiveSet(__v_raw, "y", oldValue, value)
        }
    override var yy: String
        get() {
            return trackReactiveGet(__v_raw, "yy", __v_raw.yy, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("yy")) {
                return
            }
            val oldValue = __v_raw.yy
            __v_raw.yy = value
            triggerReactiveSet(__v_raw, "yy", oldValue, value)
        }
}
open class DayutsLocale (
    @JsonNotNull
    open var name: String,
    @JsonNotNull
    open var weekdays: UTSArray<String>,
    open var weekdaysShort: UTSArray<String>? = null,
    open var weekdaysMin: UTSArray<String>? = null,
    @JsonNotNull
    open var months: UTSArray<String>,
    open var monthsShort: UTSArray<String>? = null,
    open var ordinal: (number: Number, period: String) -> String,
    open var weekStart: Number? = null,
    open var yearStart: Number? = null,
    open var formats: DayutsFormats? = null,
    open var relativeTime: DayutsRelativeTime? = null,
    open var meridiem: ((hour: Number, minute: Number, isLowercase: Boolean) -> String)? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsLocale", "uni_modules/lime-dayuts/utssdk/interface.uts", 107, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return DayutsLocaleReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class DayutsLocaleReactiveObject : DayutsLocale, IUTSReactive<DayutsLocale> {
    override var __v_raw: DayutsLocale
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: DayutsLocale, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(name = __v_raw.name, weekdays = __v_raw.weekdays, weekdaysShort = __v_raw.weekdaysShort, weekdaysMin = __v_raw.weekdaysMin, months = __v_raw.months, monthsShort = __v_raw.monthsShort, ordinal = __v_raw.ordinal, weekStart = __v_raw.weekStart, yearStart = __v_raw.yearStart, formats = __v_raw.formats, relativeTime = __v_raw.relativeTime, meridiem = __v_raw.meridiem) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): DayutsLocaleReactiveObject {
        return DayutsLocaleReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var name: String
        get() {
            return trackReactiveGet(__v_raw, "name", __v_raw.name, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("name")) {
                return
            }
            val oldValue = __v_raw.name
            __v_raw.name = value
            triggerReactiveSet(__v_raw, "name", oldValue, value)
        }
    override var weekdays: UTSArray<String>
        get() {
            return trackReactiveGet(__v_raw, "weekdays", __v_raw.weekdays, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("weekdays")) {
                return
            }
            val oldValue = __v_raw.weekdays
            __v_raw.weekdays = value
            triggerReactiveSet(__v_raw, "weekdays", oldValue, value)
        }
    override var weekdaysShort: UTSArray<String>?
        get() {
            return trackReactiveGet(__v_raw, "weekdaysShort", __v_raw.weekdaysShort, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("weekdaysShort")) {
                return
            }
            val oldValue = __v_raw.weekdaysShort
            __v_raw.weekdaysShort = value
            triggerReactiveSet(__v_raw, "weekdaysShort", oldValue, value)
        }
    override var weekdaysMin: UTSArray<String>?
        get() {
            return trackReactiveGet(__v_raw, "weekdaysMin", __v_raw.weekdaysMin, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("weekdaysMin")) {
                return
            }
            val oldValue = __v_raw.weekdaysMin
            __v_raw.weekdaysMin = value
            triggerReactiveSet(__v_raw, "weekdaysMin", oldValue, value)
        }
    override var months: UTSArray<String>
        get() {
            return trackReactiveGet(__v_raw, "months", __v_raw.months, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("months")) {
                return
            }
            val oldValue = __v_raw.months
            __v_raw.months = value
            triggerReactiveSet(__v_raw, "months", oldValue, value)
        }
    override var monthsShort: UTSArray<String>?
        get() {
            return trackReactiveGet(__v_raw, "monthsShort", __v_raw.monthsShort, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("monthsShort")) {
                return
            }
            val oldValue = __v_raw.monthsShort
            __v_raw.monthsShort = value
            triggerReactiveSet(__v_raw, "monthsShort", oldValue, value)
        }
    override var weekStart: Number?
        get() {
            return trackReactiveGet(__v_raw, "weekStart", __v_raw.weekStart, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("weekStart")) {
                return
            }
            val oldValue = __v_raw.weekStart
            __v_raw.weekStart = value
            triggerReactiveSet(__v_raw, "weekStart", oldValue, value)
        }
    override var yearStart: Number?
        get() {
            return trackReactiveGet(__v_raw, "yearStart", __v_raw.yearStart, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("yearStart")) {
                return
            }
            val oldValue = __v_raw.yearStart
            __v_raw.yearStart = value
            triggerReactiveSet(__v_raw, "yearStart", oldValue, value)
        }
    override var formats: DayutsFormats?
        get() {
            return trackReactiveGet(__v_raw, "formats", __v_raw.formats, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("formats")) {
                return
            }
            val oldValue = __v_raw.formats
            __v_raw.formats = value
            triggerReactiveSet(__v_raw, "formats", oldValue, value)
        }
    override var relativeTime: DayutsRelativeTime?
        get() {
            return trackReactiveGet(__v_raw, "relativeTime", __v_raw.relativeTime, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("relativeTime")) {
                return
            }
            val oldValue = __v_raw.relativeTime
            __v_raw.relativeTime = value
            triggerReactiveSet(__v_raw, "relativeTime", oldValue, value)
        }
}
open class DayutsObject (
    @JsonNotNull
    open var years: Number,
    @JsonNotNull
    open var months: Number,
    @JsonNotNull
    open var date: Number,
    @JsonNotNull
    open var hours: Number,
    @JsonNotNull
    open var minutes: Number,
    @JsonNotNull
    open var seconds: Number,
    @JsonNotNull
    open var milliseconds: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsObject", "uni_modules/lime-dayuts/utssdk/interface.uts", 166, 13)
    }
}
val default2 = DayutsLocale(name = "en", weekdays = utsArrayOf(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
), months = utsArrayOf(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
), relativeTime = DayutsRelativeTime(future = "in %s", past = "%s ago", s = "a few seconds", m = "a minute", mm = "%d minutes", h = "an hour", hh = "%d hours", d = "a day", dd = "%d days", M = "a month", MM = "%d months", y = "a year", yy = "%d years"), ordinal = fun(n: Number, _: String): String {
    val s = utsArrayOf(
        "th",
        "st",
        "nd",
        "rd"
    )
    val v = n % 100
    val i = (v - 20) % 10
    val k = if (i < s.length) {
        i
    } else {
        if (v < s.length) {
            v
        } else {
            0
        }
    }
    return "[" + n + s[k] + "]"
}
)
val locale = DayutsLocale(name = "zh-cn", weekdays = utsArrayOf(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
), weekdaysShort = utsArrayOf(
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六"
), weekdaysMin = utsArrayOf(
    "日",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六"
), months = utsArrayOf(
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
), monthsShort = utsArrayOf(
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
), ordinal = fun(number: Number, period: String): String {
    if (period == "W") {
        return "" + number + "\u5468"
    }
    return "" + number + "\u65E5"
}
, weekStart = 1, yearStart = 4, formats = DayutsFormats(LT = "HH:mm", LTS = "HH:mm:ss", L = "YYYY/MM/DD", LL = "YYYY年M月D日", LLL = "YYYY年M月D日Ah点mm分", LLLL = "YYYY年M月D日ddddAh点mm分", l = "YYYY/M/D", ll = "YYYY年M月D日", lll = "YYYY年M月D日 HH:mm", llll = "YYYY年M月D日dddd HH:mm"), relativeTime = DayutsRelativeTime(future = "%s内", past = "%s前", s = "几秒", m = "1 分钟", mm = "%d 分钟", h = "1 小时", hh = "%d 小时", d = "1 天", dd = "%d 天", M = "1 个月", MM = "%d 个月", y = "1 年", yy = "%d 年"), meridiem = fun(hour: Number, minute: Number, _: Boolean): String {
    val hm = (hour * 100) + minute
    if (hm < 600) {
        return "凌晨"
    } else if (hm < 900) {
        return "早上"
    } else if (hm < 1100) {
        return "上午"
    } else if (hm < 1300) {
        return "中午"
    } else if (hm < 1800) {
        return "下午"
    }
    return "晚上"
}
)
val localesMap = Map<String, DayutsLocale>()
open class LocaleState (
    @JsonNotNull
    open var lang: String,
    @JsonNotNull
    open var locales: Map<String, DayutsLocale>,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LocaleState", "uni_modules/lime-dayuts/common/use.uts", 7, 6)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return LocaleStateReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class LocaleStateReactiveObject : LocaleState, IUTSReactive<LocaleState> {
    override var __v_raw: LocaleState
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: LocaleState, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(lang = __v_raw.lang, locales = __v_raw.locales) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): LocaleStateReactiveObject {
        return LocaleStateReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var lang: String
        get() {
            return trackReactiveGet(__v_raw, "lang", __v_raw.lang, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("lang")) {
                return
            }
            val oldValue = __v_raw.lang
            __v_raw.lang = value
            triggerReactiveSet(__v_raw, "lang", oldValue, value)
        }
    override var locales: Map<String, DayutsLocale>
        get() {
            return trackReactiveGet(__v_raw, "locales", __v_raw.locales, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("locales")) {
                return
            }
            val oldValue = __v_raw.locales
            __v_raw.locales = value
            triggerReactiveSet(__v_raw, "locales", oldValue, value)
        }
}
var localeState = reactive(LocaleState(lang = "en", locales = localesMap))
val runBlock3 = run {
    localeState.locales.set("en", default2)
    localeState.locales.set("zh-cn", locale)
}
open class DayutsIntl : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("DayutsIntl", "uni_modules/lime-dayuts/common/use.uts", 17, 7)
    }
    constructor(){}
    open fun use(locale: DayutsLocale): DayutsIntl {
        localeState.locales.set(locale.name, locale)
        return this
    }
    open var locale: String
        get(): String {
            return localeState.lang
        }
        set(locale: String) {
            if (localeState.locales.has(locale)) {
                localeState.lang = locale
            } else {
                var list: UTSArray<String> = utsArrayOf()
                localeState.locales.forEach(fun(_: Any, key: String) {
                    list.push(key)
                }
                )
                console.warn("\u672A\u77E5\u8BED\u8A00: \"" + locale + "\". \u8BF7\u4F7F\u7528\u4EE5\u4E0B\u5DF2\u77E5\u8BED\u8A00\u4E4B\u4E00:" + list.join(", "), " at uni_modules/lime-dayuts/common/use.ts:46")
            }
        }
    open fun set(name: String, locale: DayutsLocale) {
        localeState.locales.set(name, locale)
    }
    open fun has(name: String): Boolean {
        return localeState.locales.has(name)
    }
}
val dayutsIntl = DayutsIntl()
open class Threshold (
    @JsonNotNull
    open var l: String,
    open var r: Number? = null,
    open var d: DayutsUnit? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Threshold", "uni_modules/lime-dayuts/common/index.uts", 6, 6)
    }
}
fun padStart(string: String, length: Number, pad: String): String {
    val str = string
    if (str.length >= length) {
        return str
    }
    return str.padStart(length, pad)
}
fun parseLocale(preset: String?): String? {
    return parseLocale(preset as Any?, null, false)
}
fun parseLocale(preset: DayutsLocale?): String? {
    return parseLocale(preset as Any?, null, false)
}
fun parseLocale(preset: String, kObject: DayutsLocale?, isLocal: Boolean): String? {
    return parseLocale(preset as Any?, kObject as DayutsLocale?, isLocal as Boolean)
}
fun parseLocale(preset: DayutsLocale, kObject: DayutsLocale, isLocal: Boolean): String? {
    return parseLocale(preset as Any?, kObject as DayutsLocale?, isLocal as Boolean)
}
fun parseLocale(preset: Any?, kObject: DayutsLocale? = null, isLocal: Boolean = false): String? {
    var l: String? = null
    if (preset == null) {
        return dayutsIntl.locale
    }
    if (UTSAndroid.`typeof`(preset) == "string") {
        val presetLower = (preset as String).toLowerCase()
        if (dayutsIntl.has(presetLower)) {
            l = presetLower
        }
        if (kObject != null) {
            dayutsIntl.set(presetLower, kObject)
            l = presetLower
        }
        val presetSplit = (preset as String).split("-")
        if (l == null && presetSplit.length > 1) {
            return parseLocale(presetSplit[0])
        }
    } else if (preset is DayutsLocale) {
        dayutsIntl.set(preset.name, preset)
        l = preset.name
    }
    if (!isLocal && l != null) {
        dayutsIntl.locale = l
    }
    return l ?: dayutsIntl.locale
}
fun padZoneStr(instance: Dayuts): String {
    val negMinutes = -instance.utcOffset()
    val minutes = Math.abs(negMinutes)
    val hourOffset = Math.floor(minutes / 60)
    val minuteOffset = minutes % 60
    return "" + (if (negMinutes <= 0) {
        "+"
    } else {
        "-"
    }
    ) + padStart(hourOffset.toString(10), 2, "0") + ":" + padStart(minuteOffset.toString(10), 2, "0")
}
fun isNumber1(value: Any?): Boolean {
    return utsArrayOf(
        "Byte",
        "UByte",
        "Short",
        "UShort",
        "Int",
        "UInt",
        "Long",
        "ULong",
        "Float",
        "Double",
        "number"
    ).includes(UTSAndroid.`typeof`(value))
}
fun tryParseNumberAtIndex(digits: UTSArray<Any?>, index: Number): Number? {
    if (index >= 0 && index < digits.length) {
        if (digits[index] == null) {
            return null
        }
        val parsedNumber = if (isNumber1(digits[index])) {
            digits[index] as Number
        } else {
            parseInt("" + digits[index], 10)
        }
        if (!isNaN(parsedNumber)) {
            return parsedNumber
        }
    }
    return null
}
fun createDateFromArray(d: UTSArray<Any?>, offset: Number = 0): Date {
    val year = tryParseNumberAtIndex(d, 1 - offset) ?: Date().getFullYear()
    val month = (tryParseNumberAtIndex(d, 2 - offset) ?: 1) - 1
    val day = tryParseNumberAtIndex(d, 3 - offset) ?: 1
    val hour = tryParseNumberAtIndex(d, 4 - offset) ?: 0
    val minute = tryParseNumberAtIndex(d, 5 - offset) ?: 0
    val second = tryParseNumberAtIndex(d, 6 - offset) ?: 0
    val millisecond = (tryParseNumberAtIndex(d, 7 - offset) ?: 0).toString(10).substring(0, 3)
    return Date(year, month, day, hour, minute, second, parseInt(millisecond))
}
fun parseDate(cfg: DayutsConfig): Date? {
    val date = cfg.date
    if (date == null) {
        return Date()
    }
    if (date is Date) {
        return date as Date
    }
    try {
        if (UTSAndroid.`typeof`(date) == "string" && UTSRegExp("^\\d+\$", "").test(date as String)) {
            return Date(parseInt(("" + date as String).padEnd(13, "0")))
        }
        if (UTSAndroid.`typeof`(date) == "string" && !UTSRegExp("Z\$", "i").test(date as String)) {
            val d = (date as String).match(REGEX_PARSE)
            val isNull = d == null || UTSArray.isArray(d) && d.length == 0
            if (!isNull) {
                return createDateFromArray(d as UTSArray<Any?>)
            }
        }
        if (UTSAndroid.`typeof`(date) == "string") {
            return Date(date as String)
        }
        if (UTSArray.isArray(date)) {
            return createDateFromArray(date as UTSArray<Any?>, 1)
        }
        if (isNumber1(date)) {
            return Date(date as Number)
        }
        return null
    }
     catch (err: Throwable) {
        return null
    }
}
fun wrapper(date: Any, instance: Dayuts): Dayuts {
    return dayuts(date, instance.`$L`)
}
fun prettyUnit(u: String): DayutsUnit {
    val special = Map<String, String>(utsArrayOf(
        utsArrayOf(
            "M",
            M
        ),
        utsArrayOf(
            "y",
            Y
        ),
        utsArrayOf(
            "w",
            W
        ),
        utsArrayOf(
            "d",
            D
        ),
        utsArrayOf(
            "D",
            DATE
        ),
        utsArrayOf(
            "h",
            H
        ),
        utsArrayOf(
            "m",
            MIN
        ),
        utsArrayOf(
            "s",
            S
        ),
        utsArrayOf(
            "ms",
            MS
        ),
        utsArrayOf(
            "Q",
            Q
        )
    ))
    return (special.get(u) ?: ("" + u).toLowerCase().replace(UTSRegExp("s\$", ""), "")) as DayutsUnit
}
fun monthDiff(a: Dayuts, b: Dayuts): Number {
    if (a.date() < b.date()) {
        return -monthDiff(b, a)
    }
    val wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month())
    val anchor = a.clone().add(wholeMonthDiff, M).valueOf()
    val c = b.valueOf() - anchor < 0
    val anchor2 = a.clone().add(wholeMonthDiff + (if (c) {
        -1
    } else {
        1
    }
    ), M).valueOf()
    val decimalMonthDiff = (b.valueOf() - anchor) / (if (c) {
        (anchor - anchor2)
    } else {
        (anchor2 - anchor)
    }
    )
    val result = wholeMonthDiff + decimalMonthDiff
    val negatedResult = -result
    val absResult = +negatedResult
    val finalResult = if (!isNaN(absResult)) {
        absResult
    } else {
        0
    }
    return finalResult
}
fun absFloor(n: Number): Number {
    return if (n < 0) {
        Math.max(Math.ceil(n), 0)
    } else {
        Math.floor(n)
    }
}
open class Dayuts : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Dayuts", "uni_modules/lime-dayuts/common/index.uts", 104, 14)
    }
    open var `$L`: String
    private var valid: Boolean = true
    private var `$d`: Date = Date()
    private var `$y`: Number = 0
    private var `$M`: Number = 0
    private var `$D`: Number = 0
    private var `$W`: Number = 0
    private var `$H`: Number = 0
    private var `$m`: Number = 0
    private var `$s`: Number = 0
    private var `$ms`: Number = 0
    private var `$u`: Boolean = false
    constructor(cfg: DayutsConfig){
        this.`$L` = parseLocale(cfg.locale) ?: dayutsIntl.locale
        this.parse(cfg)
    }
    open fun parse(cfg: DayutsConfig) {
        val _d = parseDate(cfg)
        if (_d != null) {
            this.`$d` = parseDate(cfg)!!
            this.init()
        } else {
            this.valid = false
        }
    }
    open fun init() {
        val `$d` = this.`$d`
        this.`$y` = `$d`.getFullYear()
        this.`$M` = `$d`.getMonth()
        this.`$D` = `$d`.getDate()
        this.`$W` = `$d`.getDay()
        this.`$H` = `$d`.getHours()
        this.`$m` = `$d`.getMinutes()
        this.`$s` = `$d`.getSeconds()
        this.`$ms` = `$d`.getMilliseconds()
    }
    open fun isValid(): Boolean {
        return this.valid
    }
    open fun isSame(input: String): Boolean {
        return this.isSame(input as Any, "millisecond")
    }
    open fun isSame(input: Number): Boolean {
        return this.isSame(input as Any, "millisecond")
    }
    open fun isSame(input: Date): Boolean {
        return this.isSame(input as Any, "millisecond")
    }
    open fun isSame(input: Dayuts): Boolean {
        return this.isSame(input as Any, "millisecond")
    }
    open fun isSame(input: UTSJSONObject): Boolean {
        return this.isSame(input as Any, "millisecond")
    }
    open fun isSame(input: String, units: DayutsUnit): Boolean {
        return this.isSame(input as Any, units as DayutsUnit)
    }
    open fun isSame(input: Number, units: DayutsUnit): Boolean {
        return this.isSame(input as Any, units as DayutsUnit)
    }
    open fun isSame(input: Date, units: DayutsUnit): Boolean {
        return this.isSame(input as Any, units as DayutsUnit)
    }
    open fun isSame(input: Dayuts, units: DayutsUnit): Boolean {
        return this.isSame(input as Any, units as DayutsUnit)
    }
    open fun isSame(input: UTSJSONObject, units: DayutsUnit): Boolean {
        return this.isSame(input as Any, units as DayutsUnit)
    }
    open fun isSame(input: Any, units: DayutsUnit = "millisecond"): Boolean {
        val other = if (input is Dayuts) {
            input as Dayuts
        } else {
            dayuts(input)
        }
        val date1 = this.startOf(units).valueOf()
        val date2 = other.valueOf()
        val date3 = this.endOf(units).valueOf()
        return date1 <= date2 && date2 <= date3
    }
    open fun isAfter(input: String): Boolean {
        return this.isAfter(input as Any, "millisecond")
    }
    open fun isAfter(input: Number): Boolean {
        return this.isAfter(input as Any, "millisecond")
    }
    open fun isAfter(input: Date): Boolean {
        return this.isAfter(input as Any, "millisecond")
    }
    open fun isAfter(input: Dayuts): Boolean {
        return this.isAfter(input as Any, "millisecond")
    }
    open fun isAfter(input: UTSJSONObject): Boolean {
        return this.isAfter(input as Any, "millisecond")
    }
    open fun isAfter(input: String, units: DayutsUnit): Boolean {
        return this.isAfter(input as Any, units as DayutsUnit)
    }
    open fun isAfter(input: Number, units: DayutsUnit): Boolean {
        return this.isAfter(input as Any, units as DayutsUnit)
    }
    open fun isAfter(input: Date, units: DayutsUnit): Boolean {
        return this.isAfter(input as Any, units as DayutsUnit)
    }
    open fun isAfter(input: Dayuts, units: DayutsUnit): Boolean {
        return this.isAfter(input as Any, units as DayutsUnit)
    }
    open fun isAfter(input: UTSJSONObject, units: DayutsUnit): Boolean {
        return this.isAfter(input as Any, units as DayutsUnit)
    }
    open fun isAfter(input: Any, units: DayutsUnit = "millisecond"): Boolean {
        val other = if (input is Dayuts) {
            input as Dayuts
        } else {
            dayuts(input)
        }
        val date1 = other.valueOf()
        val date2 = this.startOf(units).valueOf()
        return date1 < date2
    }
    open fun isBefore(input: String): Boolean {
        return this.isBefore(input as Any, "millisecond")
    }
    open fun isBefore(input: Number): Boolean {
        return this.isBefore(input as Any, "millisecond")
    }
    open fun isBefore(input: Date): Boolean {
        return this.isBefore(input as Any, "millisecond")
    }
    open fun isBefore(input: Dayuts): Boolean {
        return this.isBefore(input as Any, "millisecond")
    }
    open fun isBefore(input: UTSJSONObject): Boolean {
        return this.isBefore(input as Any, "millisecond")
    }
    open fun isBefore(input: String, units: DayutsUnit): Boolean {
        return this.isBefore(input as Any, units as DayutsUnit)
    }
    open fun isBefore(input: Number, units: DayutsUnit): Boolean {
        return this.isBefore(input as Any, units as DayutsUnit)
    }
    open fun isBefore(input: Date, units: DayutsUnit): Boolean {
        return this.isBefore(input as Any, units as DayutsUnit)
    }
    open fun isBefore(input: Dayuts, units: DayutsUnit): Boolean {
        return this.isBefore(input as Any, units as DayutsUnit)
    }
    open fun isBefore(input: UTSJSONObject, units: DayutsUnit): Boolean {
        return this.isBefore(input as Any, units as DayutsUnit)
    }
    open fun isBefore(input: Any, units: DayutsUnit = "millisecond"): Boolean {
        val other = if (input is Dayuts) {
            input as Dayuts
        } else {
            dayuts(input)
        }
        val date1 = other.valueOf()
        val date2 = this.endOf(units).valueOf()
        return date2 < date1
    }
    open fun isSameOrBefore(input: String): Boolean {
        return this.isSameOrBefore(input as Any, "millisecond")
    }
    open fun isSameOrBefore(input: Number): Boolean {
        return this.isSameOrBefore(input as Any, "millisecond")
    }
    open fun isSameOrBefore(input: Date): Boolean {
        return this.isSameOrBefore(input as Any, "millisecond")
    }
    open fun isSameOrBefore(input: Dayuts): Boolean {
        return this.isSameOrBefore(input as Any, "millisecond")
    }
    open fun isSameOrBefore(input: UTSJSONObject): Boolean {
        return this.isSameOrBefore(input as Any, "millisecond")
    }
    open fun isSameOrBefore(input: String, units: DayutsUnit): Boolean {
        return this.isSameOrBefore(input as Any, units as DayutsUnit)
    }
    open fun isSameOrBefore(input: Number, units: DayutsUnit): Boolean {
        return this.isSameOrBefore(input as Any, units as DayutsUnit)
    }
    open fun isSameOrBefore(input: Date, units: DayutsUnit): Boolean {
        return this.isSameOrBefore(input as Any, units as DayutsUnit)
    }
    open fun isSameOrBefore(input: Dayuts, units: DayutsUnit): Boolean {
        return this.isSameOrBefore(input as Any, units as DayutsUnit)
    }
    open fun isSameOrBefore(input: UTSJSONObject, units: DayutsUnit): Boolean {
        return this.isSameOrBefore(input as Any, units as DayutsUnit)
    }
    open fun isSameOrBefore(input: Any, units: DayutsUnit = "millisecond"): Boolean {
        return this.isSame(input, units) || this.isBefore(input, units)
    }
    open fun isSameOrAfter(input: String): Boolean {
        return this.isSameOrAfter(input as Any, "millisecond")
    }
    open fun isSameOrAfter(input: Number): Boolean {
        return this.isSameOrAfter(input as Any, "millisecond")
    }
    open fun isSameOrAfter(input: Date): Boolean {
        return this.isSameOrAfter(input as Any, "millisecond")
    }
    open fun isSameOrAfter(input: Dayuts): Boolean {
        return this.isSameOrAfter(input as Any, "millisecond")
    }
    open fun isSameOrAfter(input: UTSJSONObject): Boolean {
        return this.isSameOrAfter(input as Any, "millisecond")
    }
    open fun isSameOrAfter(input: String, units: DayutsUnit): Boolean {
        return this.isSameOrAfter(input as Any, units as DayutsUnit)
    }
    open fun isSameOrAfter(input: Number, units: DayutsUnit): Boolean {
        return this.isSameOrAfter(input as Any, units as DayutsUnit)
    }
    open fun isSameOrAfter(input: Date, units: DayutsUnit): Boolean {
        return this.isSameOrAfter(input as Any, units as DayutsUnit)
    }
    open fun isSameOrAfter(input: Dayuts, units: DayutsUnit): Boolean {
        return this.isSameOrAfter(input as Any, units as DayutsUnit)
    }
    open fun isSameOrAfter(input: UTSJSONObject, units: DayutsUnit): Boolean {
        return this.isSameOrAfter(input as Any, units as DayutsUnit)
    }
    open fun isSameOrAfter(input: Any, units: DayutsUnit = "millisecond"): Boolean {
        return this.isSame(input, units) || this.isAfter(input, units)
    }
    open fun isBetween(input: Any, input2: Any, units: DayutsUnit = "millisecond", interval: String = "()"): Boolean {
        val dA = dayuts(input)
        val dB = dayuts(input2)
        val dAi = interval.startsWith("(")
        val dBi = interval.endsWith(")")
        return ((if (dAi) {
            this.isAfter(dA, units)
        } else {
            !this.isBefore(dA, units)
        }
        ) && (if (dBi) {
            this.isBefore(dB, units)
        } else {
            !this.isAfter(dB, units)
        }
        )) || ((if (dAi) {
            this.isBefore(dA, units)
        } else {
            !this.isAfter(dA, units)
        }
        ) && (if (dBi) {
            this.isAfter(dB, units)
        } else {
            !this.isBefore(dB, units)
        }
        ))
    }
    open fun isLeapYear(): Boolean {
        return ((this.`$y` % 4 == 0) && (this.`$y` % 100 != 0)) || (this.`$y` % 400 == 0)
    }
    open fun isToday(): Boolean {
        val comparisonTemplate = "YYYY-MM-DD"
        val now = dayuts()
        return this.format(comparisonTemplate) == now.format(comparisonTemplate)
    }
    open fun unix(): Number {
        return Math.floor(this.valueOf() / 1000)
    }
    open fun startOf(units: DayutsUnit, startOf: Boolean = true): Dayuts {
        val isStartOf = startOf
        val unit = prettyUnit(units)
        val instanceFactory = fun(d: Number, m: Number): Dayuts {
            val ins = dayuts(Date(this.`$y`, m, d))
            return if (isStartOf) {
                ins
            } else {
                ins.endOf(D)
            }
        }
        val instanceFactorySet = fun(method: String, slice: Number): Dayuts {
            val argumentStart: UTSArray<Number> = utsArrayOf(
                0,
                0,
                0,
                0
            )
            val argumentEnd: UTSArray<Number> = utsArrayOf(
                23,
                59,
                59,
                999
            )
            val args = (if (isStartOf) {
                argumentStart
            } else {
                argumentEnd
            }
            ).slice(slice)
            val date = this.toDate()
            if (method == "setHours") {
                date.setHours(args[0])
                date.setMinutes(args[1])
                date.setSeconds(args[2])
                date.setMilliseconds(args[3])
            } else if (method == "setMinutes") {
                date.setMinutes(args[0])
                date.setSeconds(args[1])
                date.setMilliseconds(args[2])
            } else if (method == "setSeconds") {
                date.setSeconds(args[0])
                date.setMilliseconds(args[1])
            } else if (method == "setMilliseconds") {
                date.setMilliseconds(args[0])
            }
            return dayuts(date)
        }
        val _this = this
        val `$W` = _this.`$W`
        val `$M` = _this.`$M`
        val `$D` = _this.`$D`
        val utcPad = "set" + (if (this.`$u`) {
            "UTC"
        } else {
            ""
        }
        )
        if (unit == Y) {
            return if (isStartOf) {
                instanceFactory(1, 0)
            } else {
                instanceFactory(31, 11)
            }
        } else if (unit == M) {
            return if (isStartOf) {
                instanceFactory(1, `$M`)
            } else {
                instanceFactory(0, `$M` + 1)
            }
        } else if (unit == W) {
            val weekStart = this.`$locale`().weekStart ?: 0
            val gap = (if (`$W` < weekStart) {
                `$W` + 7
            } else {
                `$W`
            }) - weekStart
            return instanceFactory(if (isStartOf) {
                `$D` - gap
            } else {
                `$D` + (6 - gap)
            }, `$M`)
        } else if (unit == D || unit == DATE) {
            return instanceFactorySet("" + utcPad + "Hours", 0)
        } else if (unit == H) {
            return instanceFactorySet("" + utcPad + "Minutes", 1)
        } else if (unit == MIN) {
            return instanceFactorySet("" + utcPad + "Seconds", 2)
        } else if (unit == S) {
            return instanceFactorySet("" + utcPad + "Milliseconds", 3)
        } else {
            return this.clone()
        }
    }
    open fun endOf(units: DayutsUnit): Dayuts {
        return this.startOf(units, false)
    }
    private fun `$set`(units: DayutsUnit, int: Number): Dayuts {
        val unit = prettyUnit(units)
        val arg = if (unit == D) {
            this.`$D` + (int - this.`$W`)
        } else {
            int
        }
        val setDateUnit = fun(date: Dayuts, unit: DayutsUnit, arg: Number){
            if (unit == D || unit == DATE) {
                date.`$d`.setDate(arg)
            } else if (unit == M) {
                date.`$d`.setMonth(arg)
            } else if (unit == Y) {
                date.`$d`.setFullYear(arg)
            } else if (unit == H) {
                date.`$d`.setHours(arg)
            } else if (unit == MIN) {
                date.`$d`.setMinutes(arg)
            } else if (unit == S) {
                date.`$d`.setSeconds(arg)
            } else if (unit == MS) {
                date.`$d`.setMilliseconds(arg)
            }
        }
        if (unit == M || unit == Y) {
            val date = this.clone().set(DATE, 1)
            setDateUnit(date, unit, arg)
            date.init()
            this.`$d` = date.set(DATE, Math.min(this.`$D`, date.daysInMonth())).`$d`
        } else {
            setDateUnit(this, unit, arg)
        }
        this.init()
        return this
    }
    open fun set(string: DayutsUnit, int: Number): Dayuts {
        return this.clone().`$set`(string, int)
    }
    open fun get(units: DayutsUnit): Number {
        val unit = prettyUnit(units)
        if (unit == D) {
            return this.day()
        } else if (unit == DATE) {
            return this.date()
        } else if (unit == M) {
            return this.month()
        } else if (unit == Y) {
            return this.year()
        } else if (unit == H) {
            return this.hour()
        } else if (unit == MIN) {
            return this.minute()
        } else if (unit == S) {
            return this.second()
        } else if (unit == MS) {
            return this.millisecond()
        }
        return 0
    }
    open fun year(): Number {
        return this.year(null) as Number
    }
    open fun year(input: Number): Dayuts {
        return this.year(input as Number?) as Dayuts
    }
    open fun year(input: Number? = null): Any {
        if (input == null) {
            return this.`$y`
        }
        return this.set(Y, input)
    }
    open fun month(): Number {
        return this.month(null) as Number
    }
    open fun month(input: Number): Dayuts {
        return this.month(input as Number?) as Dayuts
    }
    open fun month(input: Number? = null): Any {
        if (input == null) {
            return this.`$M`
        }
        return this.set(M, input)
    }
    open fun day(): Number {
        return this.day(null) as Number
    }
    open fun day(input: Number): Dayuts {
        return this.day(input as Number?) as Dayuts
    }
    open fun day(input: Number? = null): Any {
        if (input == null) {
            return this.`$W`
        }
        return this.set(D, input)
    }
    open fun date(): Number {
        return this.date(null) as Number
    }
    open fun date(input: Number): Dayuts {
        return this.date(input as Number?) as Dayuts
    }
    open fun date(input: Number? = null): Any {
        if (input == null) {
            return this.`$D`
        }
        return this.set(DATE, input)
    }
    open fun hour(): Number {
        return this.hour(null) as Number
    }
    open fun hour(input: Number): Dayuts {
        return this.hour(input as Number?) as Dayuts
    }
    open fun hour(input: Number? = null): Any {
        if (input == null) {
            return this.`$H`
        }
        return this.set(H, input)
    }
    open fun minute(): Number {
        return this.minute(null) as Number
    }
    open fun minute(input: Number): Dayuts {
        return this.minute(input as Number?) as Dayuts
    }
    open fun minute(input: Number? = null): Any {
        if (input == null) {
            return this.`$m`
        }
        return this.set(MIN, input)
    }
    open fun second(): Number {
        return this.second(null) as Number
    }
    open fun second(input: Number): Dayuts {
        return this.second(input as Number?) as Dayuts
    }
    open fun second(input: Number? = null): Any {
        if (input == null) {
            return this.`$s`
        }
        return this.set(S, input)
    }
    open fun millisecond(): Number {
        return this.millisecond(null) as Number
    }
    open fun millisecond(input: Number): Dayuts {
        return this.millisecond(input as Number?) as Dayuts
    }
    open fun millisecond(input: Number? = null): Any {
        if (input == null) {
            return this.`$ms`
        }
        return this.set(MS, input)
    }
    open fun add(number: Number, units: DayutsUnit): Dayuts {
        val unit = prettyUnit(units)
        val instanceFactorySet = fun(n: Number): Dayuts {
            val d = dayuts(this)
            return d.date(d.date() + Math.round(n * number))
        }
        if (unit == M) {
            return this.set(M, this.`$M` + number)
        }
        if (unit == Y) {
            return this.set(Y, this.`$y` + number)
        }
        if (unit == D) {
            return instanceFactorySet(1)
        }
        if (unit == W) {
            return instanceFactorySet(7)
        }
        val steps = Map<String, Number>(utsArrayOf(
            utsArrayOf(
                MIN,
                MILLISECONDS_A_MINUTE
            ),
            utsArrayOf(
                H,
                MILLISECONDS_A_HOUR
            ),
            utsArrayOf(
                S,
                MILLISECONDS_A_SECOND
            )
        ))
        val step = steps.get(unit) ?: 1
        val nextTimeStamp = this.`$d`.getTime() + (number * step)
        return wrapper(nextTimeStamp, this)
    }
    open fun subtract(number: Number, units: DayutsUnit): Dayuts {
        return this.add(number * -1, units)
    }
    open fun format(formatStr: String? = null): String {
        val locale = this.`$locale`()
        if (!this.isValid()) {
            return INVALID_DATE_STRING
        }
        val str = formatStr ?: FORMAT_DEFAULT
        val zoneStr = padZoneStr(this)
        val _this = this
        val `$H` = _this.`$H`
        val `$m` = _this.`$m`
        val `$M` = _this.`$M`
        val weekdays = locale.weekdays
        val months = locale.months
        val meridiem = locale.meridiem
        fun getShort(arr: UTSArray<String>?, index: Number, full: UTSArray<String> = utsArrayOf(), length: Number = 0): String {
            if (arr != null && arr.length >= index) {
                return arr[index]
            } else if (full.length >= index) {
                return full[index].slice(0, length)
            }
            return ""
        }
        val `get$H` = fun(num: Number): String {
            return padStart((if (`$H` % 12 == 0) {
                12
            } else {
                `$H` % 12
            }
            ).toString(10), num, "0")
        }
        val meridiemFunc = meridiem ?: (fun(hour: Number, _: Number, isLowercase: Boolean): String {
            val m = if (hour < 12) {
                "AM"
            } else {
                "PM"
            }
            return if (isLowercase) {
                m.toLowerCase()
            } else {
                m
            }
        }
        )
        return str.replace("YYYY", padStart(this.`$y`.toString(10), 4, "0")).replace("YY", this.`$y`.toString(10).slice(-2)).replace("MMMM", getShort(months, `$M`)).replace("MM", padStart((`$M` + 1).toString(10), 2, "0")).replace("M", (`$M` + 1).toString(10)).replace("DD", padStart(this.`$D`.toString(10), 2, "0")).replace("D", this.`$D`.toString(10)).replace("dddd", weekdays[this.`$W`]).replace("ddd", getShort(locale.weekdaysShort, this.`$W`, weekdays, 3)).replace("dd", getShort(locale.weekdaysMin, this.`$W`, weekdays, 2)).replace("d", this.`$W`.toString(10)).replace("HH", padStart(`$H`.toString(10), 2, "0")).replace("H", `$H`.toString(10)).replace("hh", `get$H`(2)).replace("h", `get$H`(1)).replace("mm", padStart(`$m`.toString(10), 2, "0")).replace("m", `$m`.toString(10)).replace("ss", padStart(this.`$s`.toString(10), 2, "0")).replace("s", this.`$s`.toString(10)).replace("SSS", padStart(this.`$ms`.toString(10), 3, "0")).replace("A", meridiemFunc(`$H`, `$m`, false)).replace("a", meridiemFunc(`$H`, `$m`, true)).replace("Z", zoneStr)
    }
    open fun utcOffset(): Number {
        return 0
    }
    open fun diff(input: String): Number {
        return this.diff(input as Any, "millisecond", false)
    }
    open fun diff(input: Number): Number {
        return this.diff(input as Any, "millisecond", false)
    }
    open fun diff(input: Date): Number {
        return this.diff(input as Any, "millisecond", false)
    }
    open fun diff(input: Dayuts): Number {
        return this.diff(input as Any, "millisecond", false)
    }
    open fun diff(input: UTSJSONObject): Number {
        return this.diff(input as Any, "millisecond", false)
    }
    open fun diff(input: String, units: DayutsUnit): Number {
        return this.diff(input as Any, units as DayutsUnit, false)
    }
    open fun diff(input: Number, units: DayutsUnit): Number {
        return this.diff(input as Any, units as DayutsUnit, false)
    }
    open fun diff(input: Date, units: DayutsUnit): Number {
        return this.diff(input as Any, units as DayutsUnit, false)
    }
    open fun diff(input: Dayuts, units: DayutsUnit): Number {
        return this.diff(input as Any, units as DayutsUnit, false)
    }
    open fun diff(input: UTSJSONObject, units: DayutsUnit): Number {
        return this.diff(input as Any, units as DayutsUnit, false)
    }
    open fun diff(input: String, units: DayutsUnit, float: Boolean): Number {
        return this.diff(input as Any, units as DayutsUnit, float as Boolean)
    }
    open fun diff(input: Number, units: DayutsUnit, float: Boolean): Number {
        return this.diff(input as Any, units as DayutsUnit, float as Boolean)
    }
    open fun diff(input: Date, units: DayutsUnit, float: Boolean): Number {
        return this.diff(input as Any, units as DayutsUnit, float as Boolean)
    }
    open fun diff(input: Dayuts, units: DayutsUnit, float: Boolean): Number {
        return this.diff(input as Any, units as DayutsUnit, float as Boolean)
    }
    open fun diff(input: UTSJSONObject, units: DayutsUnit, float: Boolean): Number {
        return this.diff(input as Any, units as DayutsUnit, float as Boolean)
    }
    open fun diff(input: Any, units: DayutsUnit = "millisecond", float: Boolean = false): Number {
        val unit = prettyUnit(units)
        val that = dayuts(input)
        val zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE
        val diff = this.valueOf() - that.valueOf()
        val getMonth = fun(): Number {
            return monthDiff(this, that)
        }
        var result: Number
        when (unit) {
            Y -> 
                result = getMonth() / 12
            M -> 
                result = getMonth()
            Q -> 
                result = getMonth() / 3
            W -> 
                result = (diff - zoneDelta) / MILLISECONDS_A_WEEK
            D -> 
                result = (diff - zoneDelta) / MILLISECONDS_A_DAY
            H -> 
                result = diff / MILLISECONDS_A_HOUR
            MIN -> 
                result = diff / MILLISECONDS_A_MINUTE
            S -> 
                result = diff / MILLISECONDS_A_SECOND
            else -> 
                result = diff
        }
        return if (float) {
            result
        } else {
            absFloor(result)
        }
    }
    open fun toDate(): Date {
        return Date(this.valueOf())
    }
    open fun toJSON(): String? {
        return if (this.isValid()) {
            this.toISOString()
        } else {
            null
        }
    }
    open fun toISOString(): String {
        return this.`$d`.toString()
    }
    open fun toObject(): DayutsObject {
        return DayutsObject(years = this.`$y`, months = this.`$M`, date = this.`$D`, hours = this.`$H`, minutes = this.`$m`, seconds = this.`$s`, milliseconds = this.`$ms`)
    }
    open fun toArray(): UTSArray<Number> {
        return utsArrayOf(
            this.`$y`,
            this.`$M`,
            this.`$D`,
            this.`$H`,
            this.`$m`,
            this.`$s`,
            this.`$ms`
        )
    }
    open fun valueOf(): Number {
        return this.`$d`.getTime()
    }
    open fun daysInMonth(): Number {
        return this.endOf(M).`$D`
    }
    private fun `$locale`(): DayutsLocale {
        return localeState.locales.get(this.`$L`)!!
    }
    open fun locale(preset: String, kObject: DayutsLocale): Dayuts {
        return this.locale(preset as Any, kObject as DayutsLocale?)
    }
    open fun locale(preset: DayutsLocale, kObject: DayutsLocale): Dayuts {
        return this.locale(preset as Any, kObject as DayutsLocale?)
    }
    open fun locale(preset: Any, kObject: DayutsLocale? = null): Dayuts {
        val that = this.clone()
        val nextLocaleName = parseLocale(preset, kObject, true)
        if (nextLocaleName != null) {
            that.`$L` = nextLocaleName
        }
        return that
    }
    open fun clone(): Dayuts {
        return wrapper(this.`$d`.getTime(), this)
    }
    override fun toString(): String {
        return this.`$d`.toString()
    }
    open fun dayOfYear(): Number {
        return this.dayOfYear(null) as Number
    }
    open fun dayOfYear(input: Number): Dayuts {
        return this.dayOfYear(input as Number?) as Dayuts
    }
    open fun dayOfYear(input: Number? = null): Any {
        val dayOfYear = Math.round((this.startOf("day").valueOf() - this.startOf("year").valueOf()) / 864e5) + 1
        return if (input == null) {
            dayOfYear
        } else {
            this.add(input - dayOfYear, "day")
        }
    }
    open fun fromToBase(input: String, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        return this.fromToBase(input as Any, withoutSuffix as Boolean, instance as Dayuts, isFrom as Boolean)
    }
    open fun fromToBase(input: Number, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        return this.fromToBase(input as Any, withoutSuffix as Boolean, instance as Dayuts, isFrom as Boolean)
    }
    open fun fromToBase(input: Date, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        return this.fromToBase(input as Any, withoutSuffix as Boolean, instance as Dayuts, isFrom as Boolean)
    }
    open fun fromToBase(input: Dayuts, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        return this.fromToBase(input as Any, withoutSuffix as Boolean, instance as Dayuts, isFrom as Boolean)
    }
    open fun fromToBase(input: UTSJSONObject, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        return this.fromToBase(input as Any, withoutSuffix as Boolean, instance as Dayuts, isFrom as Boolean)
    }
    open fun fromToBase(input: Any, withoutSuffix: Boolean, instance: Dayuts, isFrom: Boolean): String {
        val relObj = localeState.locales.get("en")?.relativeTime
        val loc = instance.`$locale`().relativeTime ?: relObj
        if (loc == null) {
            return ""
        }
        val T = utsArrayOf(
            Threshold(l = "s", r = 44, d = S),
            Threshold(l = "m", r = 89),
            Threshold(l = "mm", r = 44, d = MIN),
            Threshold(l = "h", r = 89),
            Threshold(l = "hh", r = 21, d = H),
            Threshold(l = "d", r = 35),
            Threshold(l = "dd", r = 25, d = D),
            Threshold(l = "M", r = 45),
            Threshold(l = "MM", r = 10, d = M),
            Threshold(l = "y", r = 17),
            Threshold(l = "yy", d = Y)
        ) as UTSArray<Threshold>
        val Tl = T.length
        var result: Number = 0
        var out: String = ""
        var isFuture: Boolean = false
        run {
            var i: Number = 0
            while(i < Tl){
                var t = T[i]
                if (t.d != null) {
                    result = if (isFrom) {
                        dayuts(input).diff(instance, t.d!!, true)
                    } else {
                        instance.diff(input, t.d!!, true)
                    }
                }
                var abs = Math.round(Math.abs(result))
                isFuture = result > 0
                if (t.r == null || t.r != null && abs <= t.r!!) {
                    if (abs <= 1 && i > 0) {
                        t = T[i - 1]
                    }
                    val format = loc[t.l]
                    if (UTSAndroid.`typeof`(format) == "string") {
                        out = (format as String).replace("%d", abs.toString(10))
                    }
                    break
                }
                i += 1
            }
        }
        if (withoutSuffix) {
            return out
        }
        val pastOrFuture = if (isFuture) {
            loc.future
        } else {
            loc.past
        }
        return pastOrFuture.replace("%s", out)
    }
    open fun to(input: String): String {
        return this.to(input as Any, false)
    }
    open fun to(input: Number): String {
        return this.to(input as Any, false)
    }
    open fun to(input: Date): String {
        return this.to(input as Any, false)
    }
    open fun to(input: Dayuts): String {
        return this.to(input as Any, false)
    }
    open fun to(input: UTSJSONObject): String {
        return this.to(input as Any, false)
    }
    open fun to(input: String, withoutSuffix: Boolean): String {
        return this.to(input as Any, withoutSuffix as Boolean)
    }
    open fun to(input: Number, withoutSuffix: Boolean): String {
        return this.to(input as Any, withoutSuffix as Boolean)
    }
    open fun to(input: Date, withoutSuffix: Boolean): String {
        return this.to(input as Any, withoutSuffix as Boolean)
    }
    open fun to(input: Dayuts, withoutSuffix: Boolean): String {
        return this.to(input as Any, withoutSuffix as Boolean)
    }
    open fun to(input: UTSJSONObject, withoutSuffix: Boolean): String {
        return this.to(input as Any, withoutSuffix as Boolean)
    }
    open fun to(input: Any, withoutSuffix: Boolean = false): String {
        return this.fromToBase(input, withoutSuffix, this, true)
    }
    open fun from(input: String): String {
        return this.from(input as Any, false)
    }
    open fun from(input: Number): String {
        return this.from(input as Any, false)
    }
    open fun from(input: Date): String {
        return this.from(input as Any, false)
    }
    open fun from(input: Dayuts): String {
        return this.from(input as Any, false)
    }
    open fun from(input: UTSJSONObject): String {
        return this.from(input as Any, false)
    }
    open fun from(input: String, withoutSuffix: Boolean): String {
        return this.from(input as Any, withoutSuffix as Boolean)
    }
    open fun from(input: Number, withoutSuffix: Boolean): String {
        return this.from(input as Any, withoutSuffix as Boolean)
    }
    open fun from(input: Date, withoutSuffix: Boolean): String {
        return this.from(input as Any, withoutSuffix as Boolean)
    }
    open fun from(input: Dayuts, withoutSuffix: Boolean): String {
        return this.from(input as Any, withoutSuffix as Boolean)
    }
    open fun from(input: UTSJSONObject, withoutSuffix: Boolean): String {
        return this.from(input as Any, withoutSuffix as Boolean)
    }
    open fun from(input: Any, withoutSuffix: Boolean = false): String {
        return this.fromToBase(input, withoutSuffix, this, false)
    }
    open fun toNow(): String {
        return this.toNow(false)
    }
    open fun toNow(withoutSuffix: Boolean = false): String {
        return this.to(dayuts(), withoutSuffix)
    }
    open fun fromNow(): String {
        return this.fromNow(false)
    }
    open fun fromNow(withoutSuffix: Boolean = false): String {
        return this.from(dayuts(), withoutSuffix)
    }
}
fun dayuts(): Dayuts {
    return dayuts(null, null, null)
}
fun dayuts(date: String): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: UTSArray<Any>): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: Number): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: UTSJSONObject): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: Date): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: Dayuts): Dayuts {
    return dayuts(date as Any?, null, null)
}
fun dayuts(date: Any? = null, format: String? = null, locale: String? = null): Dayuts {
    if (date != null && date is Dayuts) {
        return (date as Dayuts).clone()
    }
    return Dayuts(DayutsConfig(date = date, format = format, locale = locale))
}
val GenPagesMessageMessageClass = CreateVueComponent(GenPagesMessageMessage::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMessageMessage.inheritAttrs, inject = GenPagesMessageMessage.inject, props = GenPagesMessageMessage.props, propsNeedCastKeys = GenPagesMessageMessage.propsNeedCastKeys, emits = GenPagesMessageMessage.emits, components = GenPagesMessageMessage.components, styles = GenPagesMessageMessage.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMessageMessage.setup(props as GenPagesMessageMessage)
    }
    )
}
, fun(instance, renderer): GenPagesMessageMessage {
    return GenPagesMessageMessage(instance, renderer)
}
)
val GenPagesMineMineClass = CreateVueComponent(GenPagesMineMine::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineMine.inheritAttrs, inject = GenPagesMineMine.inject, props = GenPagesMineMine.props, propsNeedCastKeys = GenPagesMineMine.propsNeedCastKeys, emits = GenPagesMineMine.emits, components = GenPagesMineMine.components, styles = GenPagesMineMine.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineMine.setup(props as GenPagesMineMine)
    }
    )
}
, fun(instance, renderer): GenPagesMineMine {
    return GenPagesMineMine(instance, renderer)
}
)
val GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.inject, props = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.emits, components = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.components, styles = GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch {
    return GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitch(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.inject, props = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.emits, components = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.components, styles = GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton {
    return GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton(instance)
}
)
val default3 = "/static/mine/right.png"
val GenPagesMineUserInfoUserInfoClass = CreateVueComponent(GenPagesMineUserInfoUserInfo::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineUserInfoUserInfo.inheritAttrs, inject = GenPagesMineUserInfoUserInfo.inject, props = GenPagesMineUserInfoUserInfo.props, propsNeedCastKeys = GenPagesMineUserInfoUserInfo.propsNeedCastKeys, emits = GenPagesMineUserInfoUserInfo.emits, components = GenPagesMineUserInfoUserInfo.components, styles = GenPagesMineUserInfoUserInfo.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineUserInfoUserInfo.setup(props as GenPagesMineUserInfoUserInfo)
    }
    )
}
, fun(instance, renderer): GenPagesMineUserInfoUserInfo {
    return GenPagesMineUserInfoUserInfo(instance, renderer)
}
)
val default4 = "/static/error_big.png"
val GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass = CreateVueComponent(GenPagesMineUserInfoCancelAnAccountCancelAnAccount::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.inheritAttrs, inject = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.inject, props = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.props, propsNeedCastKeys = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.propsNeedCastKeys, emits = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.emits, components = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.components, styles = GenPagesMineUserInfoCancelAnAccountCancelAnAccount.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineUserInfoCancelAnAccountCancelAnAccount.setup(props as GenPagesMineUserInfoCancelAnAccountCancelAnAccount)
    }
    )
}
, fun(instance, renderer): GenPagesMineUserInfoCancelAnAccountCancelAnAccount {
    return GenPagesMineUserInfoCancelAnAccountCancelAnAccount(instance, renderer)
}
)
val default5: UTSJSONObject = object : UTSJSONObject() {
    var addressbook = "\ue80c"
    var `addfriends-fill` = "\ue80a"
    var addfriends = "\ue80b"
    var `backspace-fill` = "\ue808"
    var backspace = "\ue809"
    var `bankcard-fill` = "\ue806"
    var bankcard = "\ue807"
    var `camera-fill` = "\ue804"
    var camera = "\ue805"
    var `captcha-fill` = "\ue802"
    var captcha = "\ue803"
    var `cart-fill` = "\ue800"
    var cart = "\ue801"
    var classify = "\ue7fe"
    var `classify-fill` = "\ue7ff"
    var `comment-fill` = "\ue7fc"
    var comment = "\ue7fd"
    var `community-fill` = "\ue7fa"
    var community = "\ue7fb"
    var `coupon-fill` = "\ue7f8"
    var coupon = "\ue7f9"
    var `delete` = "\ue7f6"
    var `delete-fill` = "\ue7f7"
    var edit = "\ue7f4"
    var `edit-fill` = "\ue7f5"
    var `fabulous-fill` = "\ue7f2"
    var fabulous = "\ue7f3"
    var find = "\ue7f0"
    var `find-fill` = "\ue7f1"
    var `help-fill` = "\ue7ee"
    var help = "\ue7ef"
    var `home-fill` = "\ue7ec"
    var home = "\ue7ed"
    var `idcard-fill` = "\ue7ea"
    var idcard = "\ue7eb"
    var info = "\ue7e8"
    var `info-fill` = "\ue7e9"
    var `invite-fill` = "\ue7e6"
    var invite = "\ue7e7"
    var `kefu-fill` = "\ue7e4"
    var kefu = "\ue7e5"
    var `like-fill` = "\ue7e2"
    var like = "\ue7e3"
    var location = "\ue7e0"
    var `location-fill` = "\ue7e1"
    var lock = "\ue7de"
    var `lock-fill` = "\ue7df"
    var `mail-fill` = "\ue7dc"
    var mail = "\ue7dd"
    var message = "\ue7da"
    var `message-fill` = "\ue7db"
    var `mobile-fill` = "\ue7d8"
    var mobile = "\ue7d9"
    var more = "\ue7d6"
    var `more-fill` = "\ue7d7"
    var `my-fill` = "\ue7d4"
    var my = "\ue7d5"
    var principal = "\ue80d"
    var `notice-fill` = "\ue7d2"
    var notice = "\ue7d3"
    var order = "\ue7d0"
    var `order-fill` = "\ue7d1"
    var picture = "\ue7ce"
    var `picture-fill` = "\ue7cf"
    var `setup-fill` = "\ue7cc"
    var setup = "\ue7cd"
    var share = "\ue7ca"
    var `share-fill` = "\ue7cb"
    var shop = "\ue7c8"
    var `shop-fill` = "\ue7c9"
    var `star-fill` = "\ue7c5"
    var star = "\ue7c6"
    var starhalf = "\ue7c7"
    var `stepon-fill` = "\ue7c3"
    var stepon = "\ue7c4"
    var `wait-fill` = "\ue7c1"
    var wait = "\ue7c2"
    var warning = "\ue7bf"
    var `warning-fill` = "\ue7c0"
    var plus = "\ue7bc"
    var `plussign-fill` = "\ue7bd"
    var plussign = "\ue7be"
    var minus = "\ue7b9"
    var minussign = "\ue7ba"
    var `minussign-fill` = "\ue7bb"
    var close = "\ue7b8"
    var clear = "\ue7b6"
    var `clear-fill` = "\ue7b7"
    var `checkbox-fill` = "\ue7b5"
    var checkround = "\ue7b4"
    var checkbox = "\ue7b3"
    var check = "\ue7b2"
    var `pulldown-fill` = "\ue7ae"
    var pullup = "\ue7af"
    var `pullup-fill` = "\ue7b0"
    var pulldown = "\ue7b1"
    var `roundright-fill` = "\ue7ac"
    var roundright = "\ue7ad"
    var arrowright = "\ue7a9"
    var arrowleft = "\ue7aa"
    var arrowdown = "\ue7ab"
    var left = "\ue7a6"
    var up = "\ue7a7"
    var right = "\ue7a8"
    var back = "\ue7a3"
    var top = "\ue7a4"
    var dropdown = "\ue7a5"
    var turningleft = "\ue79f"
    var turningup = "\ue7a0"
    var turningright = "\ue7a1"
    var turningdown = "\ue7a2"
    var refresh = "\ue79c"
    var loading = "\ue79d"
    var search = "\ue79e"
    var rotate = "\ue79b"
    var screen = "\ue79a"
    var signin = "\ue799"
    var calendar = "\ue798"
    var scan = "\ue797"
    var qrcode = "\ue796"
    var wallet = "\ue795"
    var telephone = "\ue794"
    var visible = "\ue793"
    var invisible = "\ue792"
    var menu = "\ue78e"
    var operate = "\ue78f"
    var slide = "\ue790"
    var list = "\ue791"
    var nonetwork = "\ue78d"
    var partake = "\ue78c"
    var qa = "\ue78b"
    var barchart = "\ue788"
    var piechart = "\ue789"
    var linechart = "\ue78a"
    var at = "\ue787"
    var face = "\ue77f"
    var redpacket = "\ue780"
    var suspend = "\ue781"
    var link = "\ue782"
    var keyboard = "\ue783"
    var play = "\ue784"
    var video = "\ue785"
    var voice = "\ue786"
    var sina = "\ue77a"
    var browser = "\ue77b"
    var moments = "\ue77c"
    var qq = "\ue77d"
    var wechat = "\ue77e"
    var balance = "\ue779"
    var bankcardpay = "\ue778"
    var wxpay = "\ue777"
    var alipay = "\ue776"
    var payment = "\ue818"
    var receive = "\ue817"
    var sendout = "\ue816"
    var evaluate = "\ue815"
    var aftersale = "\ue814"
    var warehouse = "\ue813"
    var transport = "\ue812"
    var delivery = "\ue811"
    var `switch` = "\ue810"
    var goods = "\ue80f"
    var `goods-fill` = "\ue80e"
}
val GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.inject, props = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.emits, components = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.components, styles = GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon {
    return GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiInputFuiInput::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.inject, props = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.emits, components = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.components, styles = GenUniModulesFirstuiUnixComponentsFuiInputFuiInput.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiInputFuiInput {
    return GenUniModulesFirstuiUnixComponentsFuiInputFuiInput(instance)
}
)
val GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass = CreateVueComponent(GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.inheritAttrs, inject = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.inject, props = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.props, propsNeedCastKeys = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.propsNeedCastKeys, emits = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.emits, components = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.components, styles = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.setup(props as GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber)
    }
    )
}
, fun(instance, renderer): GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber {
    return GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber(instance, renderer)
}
)
val GenPagesMineUserInfoChangePasswordChangePasswordClass = CreateVueComponent(GenPagesMineUserInfoChangePasswordChangePassword::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineUserInfoChangePasswordChangePassword.inheritAttrs, inject = GenPagesMineUserInfoChangePasswordChangePassword.inject, props = GenPagesMineUserInfoChangePasswordChangePassword.props, propsNeedCastKeys = GenPagesMineUserInfoChangePasswordChangePassword.propsNeedCastKeys, emits = GenPagesMineUserInfoChangePasswordChangePassword.emits, components = GenPagesMineUserInfoChangePasswordChangePassword.components, styles = GenPagesMineUserInfoChangePasswordChangePassword.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineUserInfoChangePasswordChangePassword.setup(props as GenPagesMineUserInfoChangePasswordChangePassword)
    }
    )
}
, fun(instance, renderer): GenPagesMineUserInfoChangePasswordChangePassword {
    return GenPagesMineUserInfoChangePasswordChangePassword(instance, renderer)
}
)
interface ProgressProps {
    var showInfo: Boolean
    var infoType: String
    var infoAlign: String
    var strokeColor: String
    var trailColor: String
    var linecap: String
    var infoColor: String
    var fontSize: Any
    var strokeWidth: Any
}
open class LProgressOptions (
    open var showInfo: Boolean? = null,
    open var strokeColor: String? = null,
    open var trailColor: String? = null,
    open var linecap: String? = null,
    open var fontSize: Number? = null,
    open var infoAlign: String? = null,
    open var infoType: String? = null,
    open var strokeWidth: Number? = null,
    open var infoColor: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LProgressOptions", "uni_modules/lime-progress/components/l-progress/types.uts", 13, 13)
    }
}
fun cubicBezier(p1x: Number, p1y: Number, p2x: Number, p2y: Number): (x: Number) -> Number {
    val ZERO_LIMIT: Number = 1e-6
    val ax = 3 * p1x - 3 * p2x + 1
    val bx = 3 * p2x - 6 * p1x
    val cx = 3 * p1x
    val ay = 3 * p1y - 3 * p2y + 1
    val by1 = 3 * p2y - 6 * p1y
    val cy = 3 * p1y
    fun sampleCurveDerivativeX(t: Number): Number {
        return (3 * ax * t + 2 * bx) * t + cx
    }
    fun sampleCurveX(t: Number): Number {
        return ((ax * t + bx) * t + cx) * t
    }
    fun sampleCurveY(t: Number): Number {
        return ((ay * t + by1) * t + cy) * t
    }
    fun solveCurveX(x: Number): Number {
        var t2 = x
        var derivative: Number
        var x2: Number
        run {
            var i: Number = 0
            while(i < 8){
                x2 = sampleCurveX(t2) - x
                if (Math.abs(x2) < ZERO_LIMIT) {
                    return t2
                }
                derivative = sampleCurveDerivativeX(t2)
                if (Math.abs(derivative) < ZERO_LIMIT) {
                    break
                }
                t2 -= x2 / derivative
                i++
            }
        }
        var t1: Number = 1
        var t0: Number = 0
        t2 = x
        while(t1 > t0){
            x2 = sampleCurveX(t2) - x
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2
            }
            if (x2 > 0) {
                t1 = t2
            } else {
                t0 = t2
            }
            t2 = (t1 + t0) / 2
        }
        return t2
    }
    return fun(x: Number): Number {
        return sampleCurveY(solveCurveX(x))
    }
}
var ease = cubicBezier(0.25, 0.1, 0.25, 1)
var linear = cubicBezier(0, 0, 1, 1)
fun raf(fn: UniAnimationFrameCallback): Number {
    return raf(fn as Any)
}
fun raf(fn: UniAnimationFrameCallbackWithNoArgument): Number {
    return raf(fn as Any)
}
fun raf(fn: Any): Number {
    if (UTSAndroid.`typeof`(fn) == "UniAnimationFrameCallback") {
        return requestAnimationFrame(fn as UniAnimationFrameCallback)
    } else {
        return requestAnimationFrame(fn as UniAnimationFrameCallbackWithNoArgument)
    }
}
fun cancelRaf(id: Number) {
    cancelAnimationFrame(id)
}
fun doubleRaf(fn: UniAnimationFrameCallback): Unit {
    return doubleRaf(fn as Any)
}
fun doubleRaf(fn: UniAnimationFrameCallbackWithNoArgument): Unit {
    return doubleRaf(fn as Any)
}
fun doubleRaf(fn: Any): Unit {
    raf(fun(): Number {
        return raf(fn)
    }
    )
}
open class Timeline : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Timeline", "uni_modules/lime-shared/animation/uvue.uts", 3, 14)
    }
    open var state: String
    open var animations: Set<Animation> = Set<Animation>()
    open var delAnimations: UTSArray<Animation> = utsArrayOf()
    open var startTimes: Map<Animation, Number> = Map<Animation, Number>()
    open var pauseTime: Number = 0
    open var pauseStart: Number = Date.now()
    open var tickHandler: Number = 0
    open var tickHandlers: UTSArray<Number> = utsArrayOf()
    open var tick: (() -> Unit)? = null
    constructor(){
        this.state = "Initiated"
    }
    open fun start() {
        if (!(this.state == "Initiated")) {
            return
        }
        this.state = "Started"
        var startTime = Date.now()
        this.pauseTime = 0
        this.tick = fun(){
            var now = Date.now()
            this.animations.forEach(fun(animation: Animation){
                var t: Number
                val ani = this.startTimes.get(animation)
                if (ani == null) {
                    return
                }
                if (ani < startTime) {
                    t = now - startTime - animation.delay - this.pauseTime
                } else {
                    t = now - ani - animation.delay - this.pauseTime
                }
                if (t > animation.duration) {
                    this.delAnimations.push(animation)
                    t = animation.duration
                }
                if (t > 0) {
                    animation.run(t)
                }
            }
            )
            while(this.delAnimations.length > 0){
                val animation = this.delAnimations.pop()
                if (animation == null) {
                    return
                }
                this.animations.`delete`(animation)
            }
            if (this.state != "Started") {
                return
            }
            this.tickHandler = raf(fun(){
                this.tick!!()
            }
            )
            this.tickHandlers.push(this.tickHandler)
        }
        if (this.tick != null) {
            this.tick!!()
        }
    }
    open fun pause() {
        if (!(this.state === "Started")) {
            return
        }
        this.state = "Paused"
        this.pauseStart = Date.now()
        cancelRaf(this.tickHandler)
    }
    open fun resume() {
        if (!(this.state === "Paused")) {
            return
        }
        this.state = "Started"
        this.pauseTime += Date.now() - this.pauseStart
        this.tick!!()
    }
    open fun reset() {
        this.pause()
        this.state = "Initiated"
        this.pauseTime = 0
        this.pauseStart = 0
        this.animations.clear()
        this.delAnimations.clear()
        this.startTimes.clear()
        this.tickHandler = 0
    }
    open fun add(animation: Animation, reassignedStartTime: Number?) {
        var startTime = reassignedStartTime
        if (startTime == null) {
            startTime = Date.now()
        }
        this.animations.add(animation)
        this.startTimes.set(animation, startTime)
    }
}
open class Animation : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Animation", "uni_modules/lime-shared/animation/uvue.uts", 95, 14)
    }
    open var startValue: Number
    open var endValue: Number
    open var duration: Number
    open var timingFunction: (t: Number) -> Number
    open var delay: Number
    open var template: (t: Number) -> Unit
    constructor(startValue: Number, endValue: Number, duration: Number, delay: Number, timingFunction: (t: Number) -> Number, template: (v: Number) -> Unit){
        this.startValue = startValue
        this.endValue = endValue
        this.duration = duration
        this.timingFunction = timingFunction
        this.delay = delay
        this.template = template
    }
    open fun run(time: Number) {
        var range = this.endValue - this.startValue
        var progress = time / this.duration
        if (progress != 1) {
            progress = this.timingFunction(progress)
        }
        this.template(this.startValue + range * progress)
    }
}
open class UseTransitionOptions (
    open var duration: Number? = null,
    open var immediate: Boolean? = null,
    open var context: ComponentPublicInstance? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseTransitionOptions", "uni_modules/lime-shared/animation/useTransition.uts", 5, 13)
    }
}
typealias UseTransitionReturnType = Ref<Number>
fun useTransition(source: Any, options: UseTransitionOptions): UseTransitionReturnType {
    val outputRef: Ref<Number> = ref(0)
    val immediate = options.immediate ?: false
    val duration = options.duration ?: 300
    val context = options.context
    var tl: Timeline? = null
    var timer: Number = -1
    val watchFunc = fun(v: Number){
        if (tl == null) {
            tl = Timeline()
        }
        tl!!.start()
        tl!!.add(Animation(outputRef.value, v, duration, 0, ease, fun(nowValue){
            outputRef.value = nowValue
            clearTimeout(timer)
            if (outputRef.value == v) {
                timer = setTimeout(fun(){
                    tl?.pause()
                    tl = null
                }
                , duration)
            }
        }
        ), null)
    }
    if (context != null && UTSAndroid.`typeof`(source) == "string") {
        context.`$watch`(source as String, watchFunc, WatchOptions(immediate = immediate))
    } else if (UTSAndroid.`typeof`(source) == "function") {
        watch(source, watchFunc, WatchOptions(immediate = immediate))
    } else if (isRef(source) && source is Ref<*>) {
        watch(source as Ref<Number>, watchFunc, WatchOptions(immediate = immediate))
    }
    return outputRef
}
fun calculateBorderRadius(width: Number, height: Number, radius: UTSArray<Number>): UTSArray<Number> {
    if (radius.some(fun(r): Boolean {
        return r < 0
    }
    )) {
        throw UTSError("Radius values must be non-negative numbers.")
    }
    while(radius.length < 4){
        radius.push(radius[if (radius.length > 2) {
            radius.length - 2
        } else {
            0
        }
        ])
    }
    val factors = utsArrayOf(
        width / (radius[0] + radius[1]),
        height / (radius[1] + radius[2]),
        width / (radius[2] + radius[3]),
        height / (radius[0] + radius[3])
    )
    val minFactor = Math.min(*factors.toTypedArray())
    if (minFactor <= 1) {
        run {
            var i: Number = 0
            while(i < radius.length){
                radius[i] *= minFactor
                i++
            }
        }
    }
    return radius
}
fun roundRect(ctx: DrawableContext, x: Number, y: Number, width: Number, height: Number, radius: UTSArray<Number>) {
    val _radius = calculateBorderRadius(width, height, radius)
    val x1 = x
    val y1 = y
    val x2 = width + x
    val y2 = height + y
    val leftTopCx = _radius[0] * (1 - 0.55191502449)
    val rightTopCx = _radius[1] * (1 - 0.55191502449)
    val rightBottomCx = _radius[2] * (1 - 0.55191502449)
    val leftBottomCx = _radius[3] * (1 - 0.55191502449)
    ctx.beginPath()
    ctx.moveTo(x1 + _radius[0], y1)
    ctx.lineTo(x2 - _radius[1], y1)
    ctx.bezierCurveTo(x2 - rightTopCx, y1, x2, y1 + rightTopCx, x2, y1 + _radius[1])
    ctx.lineTo(x2, y2 - _radius[2])
    ctx.bezierCurveTo(x2, y2 - rightBottomCx, x2 - rightBottomCx, y2, x2 - _radius[2], y2)
    ctx.lineTo(x1 + _radius[3], y2)
    ctx.bezierCurveTo(x1 + leftBottomCx, y2, x1, y2 - leftBottomCx, x1, y2 - _radius[3])
    ctx.lineTo(x1, y1 + _radius[0])
    ctx.bezierCurveTo(x1, y1 + leftTopCx, x1 + leftTopCx, y1, x1 + _radius[0], y1)
    ctx.closePath()
}
fun drawRoundedRect(ctx: DrawableContext, x: Number, y: Number, width: Number, height: Number, radius: Number = 0) {
    roundRect(ctx, x - radius, y - radius, width + radius, height, utsArrayOf(
        radius
    ))
}
open class Progress : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("Progress", "uni_modules/lime-progress/components/l-progress/progress.uts", 67, 14)
    }
    private var el: UniElement
    private var ctx: DrawableContext
    private var textWidth: Number = 0
    private var containerWidth: Number = 0
    private var containerHeight: Number = 0
    private var currentPercentage: Number = 0
    private var isInitialized = false
    private var resizeObserver: UniResizeObserver
    private var opt: LProgressOptions = LProgressOptions(showInfo = false, strokeColor = "#1677ff", strokeWidth = 4, trailColor = "rgba(0, 0, 0, 0.06)", linecap = "round", fontSize = 12, infoAlign = "end", infoType = "outer", infoColor = "black")
    constructor(el: UniElement){
        this.el = el
        this.ctx = el.getDrawableContext() as DrawableContext
        this.resizeObserver = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
            val height = Math.max(if (this.opt.showInfo!!) {
                measureText(this.opt.fontSize!!, "00%")[1]
            } else {
                0
            }
            , this.opt.strokeWidth!!)
            this.el.style.setProperty("height", height + "px")
            val rect = entries[0].target.getBoundingClientRect()
            this.containerWidth = rect.width
            this.containerHeight = height
            this.isInitialized = false
            this.render(this.currentPercentage)
        }
        )
        this.resizeObserver.observe(el)
    }
    open fun setOption(options: LProgressOptions) {
        for(key in resolveUTSKeyIterator(options)){
            if (options[key] != null && options[key] != 0) {
                this.opt[key] = options[key]
            }
        }
        if (this.opt.showInfo!!) {
            this.textWidth = 0
        }
        val height = Math.max(if (this.opt.showInfo!!) {
            measureText(this.opt.fontSize!!, "00%")[1]
        } else {
            0
        }
        , this.opt.strokeWidth!!)
        this.el.style.setProperty("height", height + "px")
        val rect = this.el.getBoundingClientRect()
        this.containerWidth = rect.width
        this.containerHeight = height
    }
    open fun render(percentage: Number) {
        val roundedPercentage = Math.floor(percentage)
        if (this.isInitialized && this.currentPercentage == roundedPercentage) {
            return
        }
        if (this.currentPercentage != roundedPercentage) {
            this.currentPercentage = roundedPercentage
        }
        this.isInitialized = true
        this.ctx.reset()
        val percentageText = roundedPercentage.toString(10).replace(UTSRegExp("\\.0\$", ""), "") + "%"
        val strokeWidth = this.opt.strokeWidth!!
        val isInfoOuter = this.opt.infoType == "outer"
        val isInfoStart = this.opt.infoAlign == "start"
        val showInfo = this.opt.showInfo!!
        var textWidth: Number = 0
        var startX: Number = 0
        var startY = this.containerHeight / 2
        var offset: Number = 0
        var gap: Number = 5
        var lineWidth = strokeWidth
        var fontSize = this.opt.fontSize!!
        var textY: Number = 0
        if (showInfo) {
            val _measureText = measureText(fontSize, percentageText)
            val width = _measureText[0]
            val height = _measureText[1]
            textWidth = width
            val textHeight = height
            offset = if (isInfoOuter) {
                width + gap
            } else {
                0
            }
            lineWidth = if (!isInfoOuter) {
                Math.max(strokeWidth, textHeight)
            } else {
                strokeWidth
            }
            this.ctx.fillStyle = this.opt.infoColor!!
            this.ctx.font = "" + fontSize + "px"
            startX += if (isInfoStart && isInfoOuter) {
                textWidth + gap
            } else {
                0
            }
            textY = this.containerHeight - (this.containerHeight - textHeight * 0.64) / 2
        }
        if (this.opt.linecap == "round") {
            startX += (lineWidth / 2)
            offset += (lineWidth / 2)
        }
        if (isInfoStart && showInfo && isInfoOuter) {
            offset = (lineWidth / 2)
            this.ctx.fillText(percentageText, 0, textY)
        }
        if (!isInfoStart && showInfo && isInfoOuter) {
            this.ctx.fillText(percentageText, this.containerWidth - textWidth, textY)
        }
        var percent = roundedPercentage / 100 * (this.containerWidth - offset)
        this.ctx.lineWidth = lineWidth
        this.ctx.fillStyle = this.opt.trailColor!!
        drawRoundedRect(this.ctx, startX, startY, this.containerWidth - offset, lineWidth, lineWidth / 2)
        this.ctx.fill()
        if (!isInfoOuter && showInfo) {
            this.ctx.fillStyle = this.opt.strokeColor!!
            drawRoundedRect(this.ctx, startX, startY, Math.max(percent, textWidth + lineWidth / 2), lineWidth, lineWidth / 2)
            this.ctx.fill()
        } else if (this.currentPercentage != 0) {
            this.ctx.fillStyle = this.opt.strokeColor!!
            drawRoundedRect(this.ctx, startX, startY, Math.max(percent, startX), lineWidth, lineWidth / 2)
            this.ctx.fill()
        }
        if (isInfoStart && this.opt.showInfo!! && !isInfoOuter) {
            this.ctx.fillStyle = this.opt.infoColor!!
            this.ctx.fillText(percentageText, 5, textY)
        }
        if (!isInfoStart && this.opt.showInfo!! && !isInfoOuter) {
            this.ctx.fillStyle = this.opt.infoColor!!
            this.ctx.textAlign = "right"
            this.ctx.fillText(percentageText, Math.max(textWidth + lineWidth / 2, percent), textY)
        }
        this.ctx.update()
    }
    open fun disconnect() {
        this.resizeObserver.disconnect()
    }
}
val GenUniModulesLimeProgressComponentsLProgressLProgressClass = CreateVueComponent(GenUniModulesLimeProgressComponentsLProgressLProgress::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeProgressComponentsLProgressLProgress.inheritAttrs, inject = GenUniModulesLimeProgressComponentsLProgressLProgress.inject, props = GenUniModulesLimeProgressComponentsLProgressLProgress.props, propsNeedCastKeys = GenUniModulesLimeProgressComponentsLProgressLProgress.propsNeedCastKeys, emits = GenUniModulesLimeProgressComponentsLProgressLProgress.emits, components = GenUniModulesLimeProgressComponentsLProgressLProgress.components, styles = GenUniModulesLimeProgressComponentsLProgressLProgress.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeProgressComponentsLProgressLProgress.setup(props as GenUniModulesLimeProgressComponentsLProgressLProgress)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeProgressComponentsLProgressLProgress {
    return GenUniModulesLimeProgressComponentsLProgressLProgress(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.inject, props = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.emits, components = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.components, styles = GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio {
    return GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.inject, props = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.emits, components = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.components, styles = GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell {
    return GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.inject, props = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.emits, components = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.components, styles = GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel {
    return GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.inject, props = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.emits, components = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.components, styles = GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup {
    return GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup(instance)
}
)
open class RadioItem (
    @JsonNotNull
    open var deviceTitle: String,
    @JsonNotNull
    open var iccid: String,
    @JsonNotNull
    open var cardid: String,
    @JsonNotNull
    open var cardState: String,
    @JsonNotNull
    open var currentPackage: String,
    @JsonNotNull
    open var useDate: String,
    @JsonNotNull
    open var percent: Number,
    @JsonNotNull
    open var total: String,
    open var checked: Boolean? = null,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RadioItem", "pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue", 94, 7)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return RadioItemReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class RadioItemReactiveObject : RadioItem, IUTSReactive<RadioItem> {
    override var __v_raw: RadioItem
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: RadioItem, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(deviceTitle = __v_raw.deviceTitle, iccid = __v_raw.iccid, cardid = __v_raw.cardid, cardState = __v_raw.cardState, currentPackage = __v_raw.currentPackage, useDate = __v_raw.useDate, percent = __v_raw.percent, total = __v_raw.total, checked = __v_raw.checked) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): RadioItemReactiveObject {
        return RadioItemReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var deviceTitle: String
        get() {
            return trackReactiveGet(__v_raw, "deviceTitle", __v_raw.deviceTitle, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("deviceTitle")) {
                return
            }
            val oldValue = __v_raw.deviceTitle
            __v_raw.deviceTitle = value
            triggerReactiveSet(__v_raw, "deviceTitle", oldValue, value)
        }
    override var iccid: String
        get() {
            return trackReactiveGet(__v_raw, "iccid", __v_raw.iccid, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("iccid")) {
                return
            }
            val oldValue = __v_raw.iccid
            __v_raw.iccid = value
            triggerReactiveSet(__v_raw, "iccid", oldValue, value)
        }
    override var cardid: String
        get() {
            return trackReactiveGet(__v_raw, "cardid", __v_raw.cardid, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("cardid")) {
                return
            }
            val oldValue = __v_raw.cardid
            __v_raw.cardid = value
            triggerReactiveSet(__v_raw, "cardid", oldValue, value)
        }
    override var cardState: String
        get() {
            return trackReactiveGet(__v_raw, "cardState", __v_raw.cardState, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("cardState")) {
                return
            }
            val oldValue = __v_raw.cardState
            __v_raw.cardState = value
            triggerReactiveSet(__v_raw, "cardState", oldValue, value)
        }
    override var currentPackage: String
        get() {
            return trackReactiveGet(__v_raw, "currentPackage", __v_raw.currentPackage, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("currentPackage")) {
                return
            }
            val oldValue = __v_raw.currentPackage
            __v_raw.currentPackage = value
            triggerReactiveSet(__v_raw, "currentPackage", oldValue, value)
        }
    override var useDate: String
        get() {
            return trackReactiveGet(__v_raw, "useDate", __v_raw.useDate, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("useDate")) {
                return
            }
            val oldValue = __v_raw.useDate
            __v_raw.useDate = value
            triggerReactiveSet(__v_raw, "useDate", oldValue, value)
        }
    override var percent: Number
        get() {
            return trackReactiveGet(__v_raw, "percent", __v_raw.percent, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("percent")) {
                return
            }
            val oldValue = __v_raw.percent
            __v_raw.percent = value
            triggerReactiveSet(__v_raw, "percent", oldValue, value)
        }
    override var total: String
        get() {
            return trackReactiveGet(__v_raw, "total", __v_raw.total, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("total")) {
                return
            }
            val oldValue = __v_raw.total
            __v_raw.total = value
            triggerReactiveSet(__v_raw, "total", oldValue, value)
        }
    override var checked: Boolean?
        get() {
            return trackReactiveGet(__v_raw, "checked", __v_raw.checked, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("checked")) {
                return
            }
            val oldValue = __v_raw.checked
            __v_raw.checked = value
            triggerReactiveSet(__v_raw, "checked", oldValue, value)
        }
}
val GenPagesMineRechargeDataTrafficRechargeDataTrafficClass = CreateVueComponent(GenPagesMineRechargeDataTrafficRechargeDataTraffic::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineRechargeDataTrafficRechargeDataTraffic.inheritAttrs, inject = GenPagesMineRechargeDataTrafficRechargeDataTraffic.inject, props = GenPagesMineRechargeDataTrafficRechargeDataTraffic.props, propsNeedCastKeys = GenPagesMineRechargeDataTrafficRechargeDataTraffic.propsNeedCastKeys, emits = GenPagesMineRechargeDataTrafficRechargeDataTraffic.emits, components = GenPagesMineRechargeDataTrafficRechargeDataTraffic.components, styles = GenPagesMineRechargeDataTrafficRechargeDataTraffic.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineRechargeDataTrafficRechargeDataTraffic.setup(props as GenPagesMineRechargeDataTrafficRechargeDataTraffic)
    }
    )
}
, fun(instance, renderer): GenPagesMineRechargeDataTrafficRechargeDataTraffic {
    return GenPagesMineRechargeDataTrafficRechargeDataTraffic(instance, renderer)
}
)
interface LoadingProps {
    var color: String?
    var type: String
    var size: String
    var text: String?
    var textColor: String?
    var textSize: String?
    var mode: String
    var vertical: Boolean
    var animated: Boolean
}
open class RGB (
    @JsonNotNull
    open var r: Number,
    @JsonNotNull
    open var g: Number,
    @JsonNotNull
    open var b: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RGB", "uni_modules/lime-color/utssdk/interface.uts", 1, 13)
    }
}
open class RGBA (
    @JsonNotNull
    open var r: Number,
    @JsonNotNull
    open var g: Number,
    @JsonNotNull
    open var b: Number,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RGBA", "uni_modules/lime-color/utssdk/interface.uts", 6, 13)
    }
}
open class RGBAString (
    @JsonNotNull
    open var r: String,
    @JsonNotNull
    open var g: String,
    @JsonNotNull
    open var b: String,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("RGBAString", "uni_modules/lime-color/utssdk/interface.uts", 12, 13)
    }
}
open class HSL (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var l: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSL", "uni_modules/lime-color/utssdk/interface.uts", 18, 13)
    }
}
open class HSLA (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var l: Number,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSLA", "uni_modules/lime-color/utssdk/interface.uts", 23, 13)
    }
}
open class HSV (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var v: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSV", "uni_modules/lime-color/utssdk/interface.uts", 29, 13)
    }
}
open class HSVA (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var v: Number,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSVA", "uni_modules/lime-color/utssdk/interface.uts", 34, 13)
    }
}
open class HSB (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var b: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSB", "uni_modules/lime-color/utssdk/interface.uts", 41, 13)
    }
}
open class HSBA (
    @JsonNotNull
    open var h: Number,
    @JsonNotNull
    open var s: Number,
    @JsonNotNull
    open var b: Number,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("HSBA", "uni_modules/lime-color/utssdk/interface.uts", 46, 13)
    }
}
open class LColorInfo (
    open var ok: Boolean? = null,
    open var format: LColorFormats? = null,
    @JsonNotNull
    open var r: Number,
    @JsonNotNull
    open var g: Number,
    @JsonNotNull
    open var b: Number,
    @JsonNotNull
    open var a: Number,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LColorInfo", "uni_modules/lime-color/utssdk/interface.uts", 52, 13)
    }
}
typealias LColorFormats = String
open class LColorOptions (
    open var format: LColorFormats? = null,
    open var gradientType: String? = null,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("LColorOptions", "uni_modules/lime-color/utssdk/interface.uts", 61, 13)
    }
}
typealias LColorInput = Any
fun isNumber2(value: Any?): Boolean {
    return utsArrayOf(
        "Byte",
        "UByte",
        "Short",
        "UShort",
        "Int",
        "UInt",
        "Long",
        "ULong",
        "Float",
        "Double",
        "number"
    ).includes(UTSAndroid.`typeof`(value))
}
fun isString1(value: Any?): Boolean {
    return UTSAndroid.`typeof`(value) == "string"
}
fun isNumeric1(value: Any?): Boolean {
    if (isNumber2(value)) {
        return true
    } else if (isString1(value)) {
        val regex = UTSRegExp("^(-)?\\d+(\\.\\d+)?\$")
        return regex.test(value as String)
    }
    return false
}
fun toBoolean(value: Any?): Boolean {
    if (isNumber2(value)) {
        return (value as Number) != 0
    }
    if (isString1(value)) {
        return ("" + value).length > 0
    }
    if (UTSAndroid.`typeof`(value) == "boolean") {
        return value as Boolean
    }
    return value != null
}
fun isPercentage(n: Any): Boolean {
    return isString1(n) && (n as String).indexOf("%") != -1
}
fun isOnePointZero(n: Any): Boolean {
    return isString1(n) && (n as String).indexOf(".") != -1 && parseFloat(n as String) == 1
}
fun bound01(n: String, max: Number): Number {
    return bound01(n as Any, max as Number)
}
fun bound01(n: Number, max: Number): Number {
    return bound01(n as Any, max as Number)
}
fun bound01(reassignedN: Any, max: Number): Number {
    var n = reassignedN
    if (!(isNumber2(n) || isString1(n))) {
        return 1
    }
    if (isOnePointZero(n)) {
        n = "100%"
    }
    val isPercent = isPercentage(n)
    n = if (isNumber2(n)) {
        n
    } else {
        parseFloat(n as String)
    }
     as Number
    n = if (max == 360) {
        n
    } else {
        Math.min(max, Math.max(0, n))
    }
    if (isPercent) {
        n = parseInt("" + Math.min(n, 100) * max, 10) / 100
    }
    if (Math.abs(n - max) < 0.000001) {
        return 1
    }
    if (max == 360) {
        n = (if (n < 0) {
            (n % max) + max
        } else {
            n % max
        }) / max
    } else {
        n = (n % max) / max
    }
    return n
}
fun clamp01(kVal: Number): Number {
    return Math.min(1, Math.max(0, kVal))
}
fun boundAlpha(a: Number): Number {
    return boundAlpha(a as Any?)
}
fun boundAlpha(a: String): Number {
    return boundAlpha(a as Any?)
}
fun boundAlpha(a: Any?): Number {
    var n = if (a == null) {
        1
    } else {
        if (isString1(a)) {
            parseFloat(a as String)
        } else {
            a as Number
        }
    }
    if (isNaN(n) || n < 0 || n > 1) {
        n = 1
    }
    return n
}
fun convertToPercentage(n: Number): Number {
    return convertToPercentage(n as Any) as Number
}
fun convertToPercentage(n: String): String {
    return convertToPercentage(n as Any) as String
}
fun convertToPercentage(reassignedN: Any): Any {
    var n = reassignedN
    n = if (isNumeric1(n)) {
        parseFloat(if (UTSAndroid.`typeof`(n) == "string") {
            n as String
        } else {
            BigDecimal.valueOf((n as Number).toDouble()).toPlainString()
        })
    } else {
        n
    }
    if (isNumber2(n) && (n as Number) <= 1) {
        return ("" + n * 100 + "%").replace(".0%", "%")
    }
    return n
}
fun pad2(c: String): String {
    return if (c.length == 1) {
        "0" + c
    } else {
        "" + c
    }
}
fun rgbToRgb(r: String, g: String, b: String): RGB {
    return rgbToRgb(r as Any, g as Any, b as Any)
}
fun rgbToRgb(r: Number, g: String, b: String): RGB {
    return rgbToRgb(r as Any, g as Any, b as Any)
}
fun rgbToRgb(r: Number, g: Number, b: String): RGB {
    return rgbToRgb(r as Any, g as Any, b as Any)
}
fun rgbToRgb(r: Number, g: Number, b: Number): RGB {
    return rgbToRgb(r as Any, g as Any, b as Any)
}
fun rgbToRgb(r: Any, g: Any, b: Any): RGB {
    return RGB(r = bound01(r, 255) * 255, g = bound01(g, 255) * 255, b = bound01(b, 255) * 255)
}
fun rgbToHsl(r: String, g: String, b: String): HSL {
    return rgbToHsl(r as Any, g as Any, b as Any)
}
fun rgbToHsl(r: Number, g: String, b: String): HSL {
    return rgbToHsl(r as Any, g as Any, b as Any)
}
fun rgbToHsl(r: Number, g: Number, b: String): HSL {
    return rgbToHsl(r as Any, g as Any, b as Any)
}
fun rgbToHsl(r: Number, g: Number, b: Number): HSL {
    return rgbToHsl(r as Any, g as Any, b as Any)
}
fun rgbToHsl(reassignedR: Any, reassignedG: Any, reassignedB: Any): HSL {
    var r = reassignedR
    var g = reassignedG
    var b = reassignedB
    r = bound01(r, 255)
    g = bound01(g, 255)
    b = bound01(b, 255)
    val max = Math.max(r, g, b)
    val min = Math.min(r, g, b)
    var h: Number = 0
    var s: Number
    val l = (max + min) / 2
    if (max == min) {
        s = 0
        h = 0
    } else {
        val d = max - min
        s = if (l > 0.5) {
            d / (2 - max - min)
        } else {
            d / (max + min)
        }
        when (max) {
            r -> 
                h = (g - b) / d + (if (g < b) {
                    6
                } else {
                    0
                }
                )
            g -> 
                h = (b - r) / d + 2
            b -> 
                h = (r - g) / d + 4
            else -> 
                console.log("h", " at uni_modules/lime-color/common/conversion.uts:64")
        }
        h /= 6
    }
    return HSL(h = h, s = s, l = l)
}
fun hue2rgb(p: Number, q: Number, t: Number): Number {
    var _t = t
    if (_t < 0) {
        _t += 1
    }
    if (_t > 1) {
        _t -= 1
    }
    if (_t < (1 as Number) / 6) {
        return p + (q - p) * (6 * _t)
    }
    if (_t < 0.5) {
        return q
    }
    if (_t < (2 as Number) / 3) {
        return p + (q - p) * ((2 as Number) / 3 - _t) * 6
    }
    return p
}
fun hslToRgb(h: String, s: String, l: String): RGB {
    return hslToRgb(h as Any, s as Any, l as Any)
}
fun hslToRgb(h: Number, s: String, l: String): RGB {
    return hslToRgb(h as Any, s as Any, l as Any)
}
fun hslToRgb(h: Number, s: Number, l: String): RGB {
    return hslToRgb(h as Any, s as Any, l as Any)
}
fun hslToRgb(h: Number, s: Number, l: Number): RGB {
    return hslToRgb(h as Any, s as Any, l as Any)
}
fun hslToRgb(reassignedH: Any, reassignedS: Any, reassignedL: Any): RGB {
    var h = reassignedH
    var s = reassignedS
    var l = reassignedL
    var r: Number
    var g: Number
    var b: Number
    h = bound01(h, 360)
    s = bound01(s, 100)
    l = bound01(l, 100)
    if (s == 0) {
        g = l
        b = l
        r = l
    } else {
        val q = if (l < 0.5) {
            l * (1 + s)
        } else {
            l + s - l * s
        }
        val p = 2 * l - q
        r = hue2rgb(p, q, h + (1 as Number) / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - (1 as Number) / 3)
    }
    return RGB(r = r * 255, g = g * 255, b = b * 255)
}
fun rgbToHsv(reassignedR: Number, reassignedG: Number, reassignedB: Number): HSV {
    var r = reassignedR
    var g = reassignedG
    var b = reassignedB
    r = bound01(r, 255)
    g = bound01(g, 255)
    b = bound01(b, 255)
    val max = Math.max(r, g, b)
    val min = Math.min(r, g, b)
    var h: Number = 0
    val v = max
    val d = max - min
    val s = if (max == 0) {
        0
    } else {
        d / max
    }
    if (max == min) {
        h = 0
    } else {
        when (max) {
            r -> 
                h = (g - b) / d + (if (g < b) {
                    6
                } else {
                    0
                }
                )
            g -> 
                h = (b - r) / d + 2
            b -> 
                h = (r - g) / d + 4
            else -> 
                console.log("1", " at uni_modules/lime-color/common/conversion.uts:171")
        }
        h /= 6
    }
    return HSV(h = h, s = s, v = v)
}
fun hsvToRgb(h: String, s: String, v: String): RGB {
    return hsvToRgb(h as Any, s as Any, v as Any)
}
fun hsvToRgb(h: Number, s: String, v: String): RGB {
    return hsvToRgb(h as Any, s as Any, v as Any)
}
fun hsvToRgb(h: Number, s: Number, v: String): RGB {
    return hsvToRgb(h as Any, s as Any, v as Any)
}
fun hsvToRgb(h: Number, s: Number, v: Number): RGB {
    return hsvToRgb(h as Any, s as Any, v as Any)
}
fun hsvToRgb(reassignedH: Any, reassignedS: Any, reassignedV: Any): RGB {
    var h = reassignedH
    var s = reassignedS
    var v = reassignedV
    h = bound01(h, 360) * 6
    s = bound01(s, 100)
    v = bound01(v, 100)
    val i = Math.floor(h)
    val f = h - i
    val p = v * (1 - s)
    val q = v * (1 - f * s)
    val t = v * (1 - (1 - f) * s)
    val mod = i % 6
    val r = utsArrayOf(
        v,
        q,
        p,
        p,
        t,
        v
    )[mod]
    val g = utsArrayOf(
        t,
        v,
        v,
        q,
        p,
        p
    )[mod]
    val b = utsArrayOf(
        p,
        p,
        t,
        v,
        v,
        q
    )[mod]
    return RGB(r = r * 255, g = g * 255, b = b * 255)
}
fun rgbToHex(r: Number, g: Number, b: Number, allow3Char: Boolean = false): String {
    val hex = utsArrayOf(
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16))
    )
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
    }
    return hex.join("")
}
fun rgbaToHex(r: Number, g: Number, b: Number, a: Number, allow4Char: Boolean = false): String {
    val hex = utsArrayOf(
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a))
    )
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0)
    }
    return hex.join("")
}
fun convertDecimalToHex(d: Number): String {
    return convertDecimalToHex(d as Any)
}
fun convertDecimalToHex(d: String): String {
    return convertDecimalToHex(d as Any)
}
fun convertDecimalToHex(d: Any): String {
    return Math.round(parseFloat("" + d) * 255).toString(16)
}
fun convertHexToDecimal(h: String): Number {
    return parseIntFromHex(h) / 255
}
fun parseIntFromHex(kVal: String): Number {
    return parseInt(kVal, 16)
}
fun numberInputToObject(color: Number): RGB {
    return RGB(r = color shr 16, g = (color and 0xff00) shr 8, b = color and 0xff)
}
val names: Map<String, String> = Map<String, String>(utsArrayOf(
    utsArrayOf(
        "aliceblue",
        "#f0f8ff"
    ),
    utsArrayOf(
        "antiquewhite",
        "#faebd7"
    ),
    utsArrayOf(
        "aqua",
        "#00ffff"
    ),
    utsArrayOf(
        "aquamarine",
        "#7fffd4"
    ),
    utsArrayOf(
        "azure",
        "#f0ffff"
    ),
    utsArrayOf(
        "beige",
        "#f5f5dc"
    ),
    utsArrayOf(
        "bisque",
        "#ffe4c4"
    ),
    utsArrayOf(
        "black",
        "#000000"
    ),
    utsArrayOf(
        "blanchedalmond",
        "#ffebcd"
    ),
    utsArrayOf(
        "blue",
        "#0000ff"
    ),
    utsArrayOf(
        "blueviolet",
        "#8a2be2"
    ),
    utsArrayOf(
        "brown",
        "#a52a2a"
    ),
    utsArrayOf(
        "burlywood",
        "#deb887"
    ),
    utsArrayOf(
        "cadetblue",
        "#5f9ea0"
    ),
    utsArrayOf(
        "chartreuse",
        "#7fff00"
    ),
    utsArrayOf(
        "chocolate",
        "#d2691e"
    ),
    utsArrayOf(
        "coral",
        "#ff7f50"
    ),
    utsArrayOf(
        "cornflowerblue",
        "#6495ed"
    ),
    utsArrayOf(
        "cornsilk",
        "#fff8dc"
    ),
    utsArrayOf(
        "crimson",
        "#dc143c"
    ),
    utsArrayOf(
        "cyan",
        "#00ffff"
    ),
    utsArrayOf(
        "darkblue",
        "#00008b"
    ),
    utsArrayOf(
        "darkcyan",
        "#008b8b"
    ),
    utsArrayOf(
        "darkgoldenrod",
        "#b8860b"
    ),
    utsArrayOf(
        "darkgray",
        "#a9a9a9"
    ),
    utsArrayOf(
        "darkgreen",
        "#006400"
    ),
    utsArrayOf(
        "darkgrey",
        "#a9a9a9"
    ),
    utsArrayOf(
        "darkkhaki",
        "#bdb76b"
    ),
    utsArrayOf(
        "darkmagenta",
        "#8b008b"
    ),
    utsArrayOf(
        "darkolivegreen",
        "#556b2f"
    ),
    utsArrayOf(
        "darkorange",
        "#ff8c00"
    ),
    utsArrayOf(
        "darkorchid",
        "#9932cc"
    ),
    utsArrayOf(
        "darkred",
        "#8b0000"
    ),
    utsArrayOf(
        "darksalmon",
        "#e9967a"
    ),
    utsArrayOf(
        "darkseagreen",
        "#8fbc8f"
    ),
    utsArrayOf(
        "darkslateblue",
        "#483d8b"
    ),
    utsArrayOf(
        "darkslategray",
        "#2f4f4f"
    ),
    utsArrayOf(
        "darkslategrey",
        "#2f4f4f"
    ),
    utsArrayOf(
        "darkturquoise",
        "#00ced1"
    ),
    utsArrayOf(
        "darkviolet",
        "#9400d3"
    ),
    utsArrayOf(
        "deeppink",
        "#ff1493"
    ),
    utsArrayOf(
        "deepskyblue",
        "#00bfff"
    ),
    utsArrayOf(
        "dimgray",
        "#696969"
    ),
    utsArrayOf(
        "dimgrey",
        "#696969"
    ),
    utsArrayOf(
        "dodgerblue",
        "#1e90ff"
    ),
    utsArrayOf(
        "firebrick",
        "#b22222"
    ),
    utsArrayOf(
        "floralwhite",
        "#fffaf0"
    ),
    utsArrayOf(
        "forestgreen",
        "#228b22"
    ),
    utsArrayOf(
        "fuchsia",
        "#ff00ff"
    ),
    utsArrayOf(
        "gainsboro",
        "#dcdcdc"
    ),
    utsArrayOf(
        "ghostwhite",
        "#f8f8ff"
    ),
    utsArrayOf(
        "goldenrod",
        "#daa520"
    ),
    utsArrayOf(
        "gold",
        "#ffd700"
    ),
    utsArrayOf(
        "gray",
        "#808080"
    ),
    utsArrayOf(
        "green",
        "#008000"
    ),
    utsArrayOf(
        "greenyellow",
        "#adff2f"
    ),
    utsArrayOf(
        "grey",
        "#808080"
    ),
    utsArrayOf(
        "honeydew",
        "#f0fff0"
    ),
    utsArrayOf(
        "hotpink",
        "#ff69b4"
    ),
    utsArrayOf(
        "indianred",
        "#cd5c5c"
    ),
    utsArrayOf(
        "indigo",
        "#4b0082"
    ),
    utsArrayOf(
        "ivory",
        "#fffff0"
    ),
    utsArrayOf(
        "khaki",
        "#f0e68c"
    ),
    utsArrayOf(
        "lavenderblush",
        "#fff0f5"
    ),
    utsArrayOf(
        "lavender",
        "#e6e6fa"
    ),
    utsArrayOf(
        "lawngreen",
        "#7cfc00"
    ),
    utsArrayOf(
        "lemonchiffon",
        "#fffacd"
    ),
    utsArrayOf(
        "lightblue",
        "#add8e6"
    ),
    utsArrayOf(
        "lightcoral",
        "#f08080"
    ),
    utsArrayOf(
        "lightcyan",
        "#e0ffff"
    ),
    utsArrayOf(
        "lightgoldenrodyellow",
        "#fafad2"
    ),
    utsArrayOf(
        "lightgray",
        "#d3d3d3"
    ),
    utsArrayOf(
        "lightgreen",
        "#90ee90"
    ),
    utsArrayOf(
        "lightgrey",
        "#d3d3d3"
    ),
    utsArrayOf(
        "lightpink",
        "#ffb6c1"
    ),
    utsArrayOf(
        "lightsalmon",
        "#ffa07a"
    ),
    utsArrayOf(
        "lightseagreen",
        "#20b2aa"
    ),
    utsArrayOf(
        "lightskyblue",
        "#87cefa"
    ),
    utsArrayOf(
        "lightslategray",
        "#778899"
    ),
    utsArrayOf(
        "lightslategrey",
        "#778899"
    ),
    utsArrayOf(
        "lightsteelblue",
        "#b0c4de"
    ),
    utsArrayOf(
        "lightyellow",
        "#ffffe0"
    ),
    utsArrayOf(
        "lime",
        "#00ff00"
    ),
    utsArrayOf(
        "limegreen",
        "#32cd32"
    ),
    utsArrayOf(
        "linen",
        "#faf0e6"
    ),
    utsArrayOf(
        "magenta",
        "#ff00ff"
    ),
    utsArrayOf(
        "maroon",
        "#800000"
    ),
    utsArrayOf(
        "mediumaquamarine",
        "#66cdaa"
    ),
    utsArrayOf(
        "mediumblue",
        "#0000cd"
    ),
    utsArrayOf(
        "mediumorchid",
        "#ba55d3"
    ),
    utsArrayOf(
        "mediumpurple",
        "#9370db"
    ),
    utsArrayOf(
        "mediumseagreen",
        "#3cb371"
    ),
    utsArrayOf(
        "mediumslateblue",
        "#7b68ee"
    ),
    utsArrayOf(
        "mediumspringgreen",
        "#00fa9a"
    ),
    utsArrayOf(
        "mediumturquoise",
        "#48d1cc"
    ),
    utsArrayOf(
        "mediumvioletred",
        "#c71585"
    ),
    utsArrayOf(
        "midnightblue",
        "#191970"
    ),
    utsArrayOf(
        "mintcream",
        "#f5fffa"
    ),
    utsArrayOf(
        "mistyrose",
        "#ffe4e1"
    ),
    utsArrayOf(
        "moccasin",
        "#ffe4b5"
    ),
    utsArrayOf(
        "navajowhite",
        "#ffdead"
    ),
    utsArrayOf(
        "navy",
        "#000080"
    ),
    utsArrayOf(
        "oldlace",
        "#fdf5e6"
    ),
    utsArrayOf(
        "olive",
        "#808000"
    ),
    utsArrayOf(
        "olivedrab",
        "#6b8e23"
    ),
    utsArrayOf(
        "orange",
        "#ffa500"
    ),
    utsArrayOf(
        "orangered",
        "#ff4500"
    ),
    utsArrayOf(
        "orchid",
        "#da70d6"
    ),
    utsArrayOf(
        "palegoldenrod",
        "#eee8aa"
    ),
    utsArrayOf(
        "palegreen",
        "#98fb98"
    ),
    utsArrayOf(
        "paleturquoise",
        "#afeeee"
    ),
    utsArrayOf(
        "palevioletred",
        "#db7093"
    ),
    utsArrayOf(
        "papayawhip",
        "#ffefd5"
    ),
    utsArrayOf(
        "peachpuff",
        "#ffdab9"
    ),
    utsArrayOf(
        "peru",
        "#cd853f"
    ),
    utsArrayOf(
        "pink",
        "#ffc0cb"
    ),
    utsArrayOf(
        "plum",
        "#dda0dd"
    ),
    utsArrayOf(
        "powderblue",
        "#b0e0e6"
    ),
    utsArrayOf(
        "purple",
        "#800080"
    ),
    utsArrayOf(
        "rebeccapurple",
        "#663399"
    ),
    utsArrayOf(
        "red",
        "#ff0000"
    ),
    utsArrayOf(
        "rosybrown",
        "#bc8f8f"
    ),
    utsArrayOf(
        "royalblue",
        "#4169e1"
    ),
    utsArrayOf(
        "saddlebrown",
        "#8b4513"
    ),
    utsArrayOf(
        "salmon",
        "#fa8072"
    ),
    utsArrayOf(
        "sandybrown",
        "#f4a460"
    ),
    utsArrayOf(
        "seagreen",
        "#2e8b57"
    ),
    utsArrayOf(
        "seashell",
        "#fff5ee"
    ),
    utsArrayOf(
        "sienna",
        "#a0522d"
    ),
    utsArrayOf(
        "silver",
        "#c0c0c0"
    ),
    utsArrayOf(
        "skyblue",
        "#87ceeb"
    ),
    utsArrayOf(
        "slateblue",
        "#6a5acd"
    ),
    utsArrayOf(
        "slategray",
        "#708090"
    ),
    utsArrayOf(
        "slategrey",
        "#708090"
    ),
    utsArrayOf(
        "snow",
        "#fffafa"
    ),
    utsArrayOf(
        "springgreen",
        "#00ff7f"
    ),
    utsArrayOf(
        "steelblue",
        "#4682b4"
    ),
    utsArrayOf(
        "tan",
        "#d2b48c"
    ),
    utsArrayOf(
        "teal",
        "#008080"
    ),
    utsArrayOf(
        "thistle",
        "#d8bfd8"
    ),
    utsArrayOf(
        "tomato",
        "#ff6347"
    ),
    utsArrayOf(
        "turquoise",
        "#40e0d0"
    ),
    utsArrayOf(
        "violet",
        "#ee82ee"
    ),
    utsArrayOf(
        "wheat",
        "#f5deb3"
    ),
    utsArrayOf(
        "white",
        "#ffffff"
    ),
    utsArrayOf(
        "whitesmoke",
        "#f5f5f5"
    ),
    utsArrayOf(
        "yellow",
        "#ffff00"
    ),
    utsArrayOf(
        "yellowgreen",
        "#9acd32"
    )
))
open class ColorMatchers (
    @JsonNotNull
    open var CSS_UNIT: UTSRegExp,
    @JsonNotNull
    open var rgb: UTSRegExp,
    @JsonNotNull
    open var rgba: UTSRegExp,
    @JsonNotNull
    open var hsl: UTSRegExp,
    @JsonNotNull
    open var hsla: UTSRegExp,
    @JsonNotNull
    open var hsv: UTSRegExp,
    @JsonNotNull
    open var hsva: UTSRegExp,
    @JsonNotNull
    open var hsb: UTSRegExp,
    @JsonNotNull
    open var hsba: UTSRegExp,
    @JsonNotNull
    open var hex3: UTSRegExp,
    @JsonNotNull
    open var hex6: UTSRegExp,
    @JsonNotNull
    open var hex4: UTSRegExp,
    @JsonNotNull
    open var hex8: UTSRegExp,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("ColorMatchers", "uni_modules/lime-color/common/format-input.uts", 6, 6)
    }
}
val CSS_INTEGER = "[-\\+]?\\d+%?"
val CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"
val CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"
val PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?"
val PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?"
val matchers = ColorMatchers(CSS_UNIT = UTSRegExp(CSS_UNIT), rgb = UTSRegExp("rgb" + PERMISSIVE_MATCH3), rgba = UTSRegExp("rgba" + PERMISSIVE_MATCH4), hsl = UTSRegExp("hsl" + PERMISSIVE_MATCH3), hsla = UTSRegExp("hsla" + PERMISSIVE_MATCH4), hsv = UTSRegExp("hsv" + PERMISSIVE_MATCH3), hsva = UTSRegExp("hsva" + PERMISSIVE_MATCH4), hsb = UTSRegExp("hsb" + PERMISSIVE_MATCH3), hsba = UTSRegExp("hsba" + PERMISSIVE_MATCH4), hex3 = UTSRegExp("^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})\$", ""), hex6 = UTSRegExp("^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})\$", ""), hex4 = UTSRegExp("^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})\$", ""), hex8 = UTSRegExp("^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})\$", ""))
fun isValidCSSUnit(color: String): Boolean {
    return isValidCSSUnit(color as Any?)
}
fun isValidCSSUnit(color: Number): Boolean {
    return isValidCSSUnit(color as Any?)
}
fun isValidCSSUnit(color: Any?): Boolean {
    return toBoolean(matchers.CSS_UNIT.exec("" + color))
}
fun inputToRGB(color: String): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: RGB): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: RGBA): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSL): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSLA): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSV): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSVA): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSB): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: HSBA): LColorInfo {
    return inputToRGB(color as Any)
}
fun inputToRGB(color: Any): LColorInfo {
    var _color: UTSJSONObject? = null
    var rgb = RGB(r = 0, g = 0, b = 0)
    var a: Any = 1
    var s: Any?
    var v: Any?
    var l: Any?
    var ok = false
    var format: LColorFormats? = null
    if (UTSAndroid.`typeof`(color) == "string") {
        _color = stringInputToObject(color as String)
    } else if (UTSAndroid.`typeof`(color) == "object") {
        _color = UTSAndroid.consoleDebugError(JSON.parse(JSON.stringify(color)), " at uni_modules/lime-color/common/format-input.uts:101") as UTSJSONObject
    }
    if (_color != null) {
        if (isValidCSSUnit(_color["r"]) && isValidCSSUnit(_color["g"]) && isValidCSSUnit(_color["b"])) {
            rgb = rgbToRgb(_color["r"]!!, _color["g"]!!, _color["b"]!!)
            ok = true
            format = if (("" + _color["r"]).endsWith("%")) {
                "prgb"
            } else {
                "rgb"
            }
        } else if (isValidCSSUnit(_color["h"]) && isValidCSSUnit(_color["s"]) && (isValidCSSUnit(_color["v"]) || isValidCSSUnit(_color["b"]))) {
            val isHSV = _color["v"] != null
            s = convertToPercentage(_color["s"]!!)
            v = if (isHSV) {
                convertToPercentage(_color["v"]!!)
            } else {
                convertToPercentage(_color["b"]!!)
            }
            rgb = hsvToRgb(_color["h"]!!, s, v)
            ok = true
            format = if (isHSV) {
                "hsv"
            } else {
                "hsb"
            }
        } else if (isValidCSSUnit(_color["h"]) && isValidCSSUnit(_color["s"]) && isValidCSSUnit(_color["l"])) {
            s = convertToPercentage(_color["s"]!!)
            l = convertToPercentage(_color["l"]!!)
            rgb = hslToRgb(_color["h"]!!, s, l)
            ok = true
            format = "hsl"
        }
        if (_color["a"] != null) {
            a = _color["a"]!!
        }
    }
    a = boundAlpha(a)
    return LColorInfo(ok = ok, format = _color?.get("format") as String? ?: format, r = Math.min(255, Math.max(rgb.r, 0)), g = Math.min(255, Math.max(rgb.g, 0)), b = Math.min(255, Math.max(rgb.b, 0)), a = a)
}
fun stringInputToObject(color: String): UTSJSONObject? {
    var _color = color.trim().toLowerCase()
    if (_color.length == 0) {
        return null
    }
    var named = false
    if (names.get(_color) != null) {
        _color = names.get(_color)!!
        named = true
    } else if (_color == "transparent") {
        return object : UTSJSONObject() {
            var r: Number = 0
            var g: Number = 0
            var b: Number = 0
            var a: Number = 0
            var format = "name"
        }
    }
    var match = matchers.rgb.exec(_color)
    if (match != null) {
        val r = match[1]
        val g = match[2]
        val b = match[3]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            )
        )))
    }
    match = matchers.rgba.exec(_color)
    if (match != null) {
        val r = match[1]
        val g = match[2]
        val b = match[3]
        val a = match[4]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            ),
            utsArrayOf(
                "a",
                a
            )
        )))
    }
    match = matchers.hsl.exec(_color)
    if (match != null) {
        val h = match[1]
        val s = match[2]
        val l = match[3]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "h",
                h
            ),
            utsArrayOf(
                "s",
                s
            ),
            utsArrayOf(
                "l",
                l
            )
        )))
    }
    match = matchers.hsla.exec(_color)
    if (match != null) {
        val h = match[1]
        val s = match[2]
        val l = match[3]
        val a = match[4]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "h",
                h
            ),
            utsArrayOf(
                "s",
                s
            ),
            utsArrayOf(
                "l",
                l
            ),
            utsArrayOf(
                "a",
                a
            )
        )))
    }
    match = matchers.hsv.exec(_color)
    if (match != null) {
        val h = match[1]
        val s = match[2]
        val v = match[3]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "h",
                h
            ),
            utsArrayOf(
                "s",
                s
            ),
            utsArrayOf(
                "v",
                v
            )
        )))
    }
    match = matchers.hsva.exec(_color)
    if (match != null) {
        val h = match[1]
        val s = match[2]
        val v = match[3]
        val a = match[4]
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "h",
                h
            ),
            utsArrayOf(
                "s",
                s
            ),
            utsArrayOf(
                "v",
                v
            ),
            utsArrayOf(
                "a",
                a
            )
        )))
    }
    match = matchers.hex8.exec(_color)
    if (match != null) {
        val r = parseIntFromHex(match[1]!!)
        val g = parseIntFromHex(match[2]!!)
        val b = parseIntFromHex(match[3]!!)
        val a = convertHexToDecimal(match[4]!!)
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            ),
            utsArrayOf(
                "a",
                a
            ),
            utsArrayOf(
                "format",
                if (named) {
                    "name"
                } else {
                    "hex8"
                }
            )
        )))
    }
    match = matchers.hex6.exec(_color)
    if (match != null) {
        val r = parseIntFromHex(match[1]!!)
        val g = parseIntFromHex(match[2]!!)
        val b = parseIntFromHex(match[3]!!)
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            ),
            utsArrayOf(
                "format",
                if (named) {
                    "name"
                } else {
                    "hex"
                }
            )
        )))
    }
    match = matchers.hex4.exec(_color)
    if (match != null) {
        val r = parseIntFromHex((match[1] + match[1]))
        val g = parseIntFromHex((match[2] + match[2]))
        val b = parseIntFromHex((match[3] + match[3]))
        val a = convertHexToDecimal((match[4] + match[4]))
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            ),
            utsArrayOf(
                "a",
                a
            ),
            utsArrayOf(
                "format",
                if (named) {
                    "name"
                } else {
                    "hex8"
                }
            )
        )))
    }
    match = matchers.hex3.exec(_color)
    if (match != null) {
        val r = parseIntFromHex((match[1] + match[1]))
        val g = parseIntFromHex((match[2] + match[2]))
        val b = parseIntFromHex((match[3] + match[3]))
        return UTSJSONObject(Map<String, Any?>(utsArrayOf(
            utsArrayOf(
                "r",
                r
            ),
            utsArrayOf(
                "g",
                g
            ),
            utsArrayOf(
                "b",
                b
            ),
            utsArrayOf(
                "format",
                if (named) {
                    "name"
                } else {
                    "hex"
                }
            )
        )))
    }
    return null
}
open class TinyColor : IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TinyColor", "uni_modules/lime-color/common/color.uts", 7, 14)
    }
    open var r: Number
    open var g: Number
    open var b: Number
    open var a: Number
    open var format: LColorFormats?
    open var originalInput: LColorInput
    open var isValid: Boolean
    open var gradientType: String?
    open var roundA: Number
    open var reversedNames: Map<String, String>
    constructor(color: LColorInput = "", opts: LColorOptions = LColorOptions()){
        var _color: Any = color
        if (isNumber2(color)) {
            _color = numberInputToObject(color as Number)
        }
        this.originalInput = _color
        val rgb = inputToRGB(_color)
        this.r = rgb.r
        this.g = rgb.g
        this.b = rgb.b
        this.a = rgb.a
        this.roundA = Math.round(100 * this.a) / 100
        this.format = opts.format ?: rgb.format
        this.gradientType = opts.gradientType
        if (this.r < 1) {
            this.r = Math.round(this.r)
        }
        if (this.g < 1) {
            this.g = Math.round(this.g)
        }
        if (this.b < 1) {
            this.b = Math.round(this.b)
        }
        this.isValid = rgb.ok ?: false
        this.reversedNames = Map<String, String>()
        names.forEach(fun(value: String, key: String){
            this.reversedNames.set(value, key)
        }
        )
    }
    open fun isDark(): Boolean {
        return this.getBrightness() < 128
    }
    open fun isLight(): Boolean {
        return !this.isDark()
    }
    open fun getBrightness(): Number {
        val rgb = this.toRgb()
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    }
    open fun getLuminance(): Number {
        val rgb = this.toRgb()
        var R: Number
        var G: Number
        var B: Number
        val RsRGB: Number = rgb.r / 255
        val GsRGB: Number = rgb.g / 255
        val BsRGB: Number = rgb.b / 255
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92
        } else {
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4)
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92
        } else {
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4)
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92
        } else {
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4)
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B
    }
    open fun getAlpha(): Number {
        return this.a
    }
    open fun setAlpha(alpha: String?): TinyColor {
        return this.setAlpha(alpha as Any)
    }
    open fun setAlpha(alpha: Number?): TinyColor {
        return this.setAlpha(alpha as Any)
    }
    open fun setAlpha(alpha: Any?): TinyColor {
        this.a = boundAlpha(alpha)
        this.roundA = Math.round(100 * this.a) / 100
        return this
    }
    open fun isMonochrome(): Boolean {
        val s = this.toHsl().s
        return s == 0
    }
    open fun toHsv(): HSVA {
        val hsv = rgbToHsv(this.r, this.g, this.b)
        return HSVA(h = hsv.h * 360, s = hsv.s, v = hsv.v, a = this.a)
    }
    open fun toHsvString(): String {
        val hsv = rgbToHsv(this.r, this.g, this.b)
        val h = Math.round(hsv.h * 360)
        val s = Math.round(hsv.s * 100)
        val v = Math.round(hsv.v * 100)
        return if (this.a == 1) {
            "hsv(" + h + ", " + s + "%, " + v + "%)"
        } else {
            "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")"
        }
    }
    open fun toHsb(): HSBA {
        val hsv = rgbToHsv(this.r, this.g, this.b)
        return HSBA(h = hsv.h * 360, s = hsv.s, b = hsv.v, a = this.a)
    }
    open fun toHsbString(): String {
        val hsb = this.toHsb()
        val h = Math.round(hsb.h)
        val s = Math.round(hsb.s * 100)
        val b = Math.round(hsb.b * 100)
        return if (this.a == 1) {
            "hsb(" + h + ", " + s + "%, " + b + "%)"
        } else {
            "hsva(" + h + ", " + s + "%, " + b + "%, " + this.roundA + ")"
        }
    }
    open fun toHsl(): HSLA {
        val hsl = rgbToHsl(this.r, this.g, this.b)
        return HSLA(h = hsl.h * 360, s = hsl.s, l = hsl.l, a = this.a)
    }
    open fun toHslString(): String {
        val hsl = rgbToHsl(this.r, this.g, this.b)
        val h = Math.round(hsl.h * 360)
        val s = Math.round(hsl.s * 100)
        val l = Math.round(hsl.l * 100)
        return if (this.a == 1) {
            "hsl(" + h + ", " + s + "%, " + l + "%)"
        } else {
            "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")"
        }
    }
    open fun toHex(allow3Char: Boolean = false): String {
        return rgbToHex(this.r, this.g, this.b, allow3Char)
    }
    open fun toHexString(allow3Char: Boolean = false): String {
        return "#" + this.toHex(allow3Char)
    }
    open fun toHex8(allow4Char: Boolean = false): String {
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char)
    }
    open fun toHex8String(allow4Char: Boolean = false): String {
        return "#" + this.toHex8(allow4Char)
    }
    open fun toHexShortString(allowShortChar: Boolean = false): String {
        return if (this.a == 1) {
            this.toHexString(allowShortChar)
        } else {
            this.toHex8String(allowShortChar)
        }
    }
    open fun toRgb(): RGBA {
        return RGBA(r = Math.round(this.r), g = Math.round(this.g), b = Math.round(this.b), a = this.a)
    }
    open fun toRgbString(): String {
        val r = Math.round(this.r)
        val g = Math.round(this.g)
        val b = Math.round(this.b)
        return if (this.a == 1) {
            "rgb(" + r + ", " + g + ", " + b + ")"
        } else {
            "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")"
        }
    }
    open fun toPercentageRgb(): RGBAString {
        val fmt = fun(x: Number): String {
            return "" + Math.round(bound01(x, 255) * 100) + "%"
        }
        return RGBAString(r = fmt(this.r), g = fmt(this.g), b = fmt(this.b), a = this.a)
    }
    open fun toPercentageRgbString(): String {
        val rnd = fun(x: Number): Number {
            return Math.round(bound01(x, 255) * 100)
        }
        return if (this.a == 1) {
            "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
        } else {
            "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")"
        }
    }
    open fun toName(): String? {
        if (this.a == 0) {
            return "transparent"
        }
        if (this.a < 1) {
            return null
        }
        val hex = this.toHexString()
        return this.reversedNames.get(hex)
    }
    override fun toString(): String {
        return this.toString(null)
    }
    open fun toString(format: LColorFormats?): String {
        val formatSet = toBoolean(format)
        var _format = format ?: this.format
        var formattedString: String? = null
        val hasAlpha = this.a < 1 && this.a >= 0
        val needsAlphaFormat = !formatSet && hasAlpha && (_format != null && _format.startsWith("hex") || _format == "name")
        if (needsAlphaFormat) {
            if (_format == "name" && this.a == 0) {
                return this.toName() ?: "transparent"
            }
            return this.toRgbString()
        }
        if (_format == "rgb") {
            formattedString = this.toRgbString()
        }
        if (_format == "prgb") {
            formattedString = this.toPercentageRgbString()
        }
        if (_format == "hex" || _format == "hex6") {
            formattedString = this.toHexString()
        }
        if (_format == "hex3") {
            formattedString = this.toHexString(true)
        }
        if (_format == "hex4") {
            formattedString = this.toHex8String(true)
        }
        if (_format == "hex8") {
            formattedString = this.toHex8String()
        }
        if (_format == "name") {
            formattedString = this.toName()
        }
        if (_format == "hsl") {
            formattedString = this.toHslString()
        }
        if (_format == "hsv") {
            formattedString = this.toHsvString()
        }
        if (_format == "hsb") {
            formattedString = this.toHsbString()
        }
        return formattedString ?: this.toHexString()
    }
    open fun toNumber(): Number {
        return (Math.round(this.r) shl 16) + (Math.round(this.g) shl 8) + Math.round(this.b)
    }
    open fun clone(): TinyColor {
        return TinyColor(this.toString())
    }
    open fun lighten(amount: Number = 10): TinyColor {
        val hsl = this.toHsl()
        hsl.l += amount / 100
        hsl.l = clamp01(hsl.l)
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun brighten(amount: Number = 10): TinyColor {
        val rgb = this.toRgb()
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))))
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))))
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))))
        return TinyColor(rgb, LColorOptions(format = this.format))
    }
    open fun darken(amount: Number = 10): TinyColor {
        val hsl = this.toHsl()
        hsl.l -= amount / 100
        hsl.l = clamp01(hsl.l)
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun tint(amount: Number = 10): TinyColor {
        return this.mix("white", amount)
    }
    open fun shade(amount: Number = 10): TinyColor {
        return this.mix("black", amount)
    }
    open fun desaturate(amount: Number = 10): TinyColor {
        val hsl = this.toHsl()
        hsl.s -= amount / 100
        hsl.s = clamp01(hsl.s)
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun saturate(amount: Number = 10): TinyColor {
        val hsl = this.toHsl()
        hsl.s += amount / 100
        hsl.s = clamp01(hsl.s)
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun greyscale(): TinyColor {
        return this.desaturate(100)
    }
    open fun spin(amount: Number): TinyColor {
        val hsl = this.toHsl()
        val hue = (hsl.h + amount) % 360
        hsl.h = if (hue < 0) {
            360 + hue
        } else {
            hue
        }
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun mix(color: LColorInput, amount: Number = 50): TinyColor {
        val rgb1 = this.toRgb()
        val rgb2 = TinyColor(color).toRgb()
        val p = amount / 100
        val rgba: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("rgba", "uni_modules/lime-color/common/color.uts", 461, 15)) {
            var r = (rgb2.r - rgb1.r) * p + rgb1.r
            var g = (rgb2.g - rgb1.g) * p + rgb1.g
            var b = (rgb2.b - rgb1.b) * p + rgb1.b
            var a = (rgb2.a - rgb1.a) * p + rgb1.a
        }
        return TinyColor(rgba, LColorOptions(format = this.format))
    }
    open fun analogous(results: Number = 6, slices: Number = 30): UTSArray<TinyColor> {
        val hsl = this.toHsl()
        val part = (360 as Number) / slices
        val ret = utsArrayOf(
            this
        ) as UTSArray<TinyColor>
        var _results = results
        hsl.h = (hsl.h - ((part * _results) shr 1) + 720) % 360
        while(_results > 0){
            hsl.h = (hsl.h + part) % 360
            ret.push(TinyColor(hsl))
            _results--
        }
        return ret
    }
    open fun complement(): TinyColor {
        val hsl = this.toHsl()
        hsl.h = (hsl.h + 180) % 360
        return TinyColor(hsl, LColorOptions(format = this.format))
    }
    open fun monochromatic(results: Number = 6): UTSArray<TinyColor> {
        val hsv = this.toHsv()
        val h = hsv.h
        val s = hsv.s
        var v = hsv.v
        val res: UTSArray<TinyColor> = utsArrayOf()
        val modification = (1 as Number) / results
        var _results = results
        while(_results > 0){
            res.push(TinyColor(UTSJSONObject(Map<String, Any?>(utsArrayOf(
                utsArrayOf(
                    "h",
                    h
                ),
                utsArrayOf(
                    "s",
                    s
                ),
                utsArrayOf(
                    "v",
                    v
                )
            )))))
            v = (v + modification) % 1
            _results--
        }
        return res
    }
    open fun splitcomplement(): UTSArray<TinyColor> {
        val hsl = this.toHsl()
        val h = hsl.h
        return utsArrayOf<TinyColor>(this, TinyColor(object : UTSJSONObject() {
            var h = (h + 72) % 360
            var s = hsl.s
            var l = hsl.l
        }), TinyColor(object : UTSJSONObject() {
            var h = (h + 216) % 360
            var s = hsl.s
            var l = hsl.l
        }))
    }
    open fun onBackground(background: LColorInput): TinyColor {
        val fg = this.toRgb()
        val bg = TinyColor(background).toRgb()
        val alpha = fg.a + bg.a * (1 - fg.a)
        return TinyColor(object : UTSJSONObject() {
            var r = (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha
            var g = (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha
            var b = (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha
            var a = alpha
        })
    }
    open fun triad(): UTSArray<TinyColor> {
        return this.polyad(3)
    }
    open fun tetrad(): UTSArray<TinyColor> {
        return this.polyad(4)
    }
    open fun polyad(n: Number): UTSArray<TinyColor> {
        val hsl = this.toHsl()
        val h = hsl.h
        val result = utsArrayOf(
            this
        ) as UTSArray<TinyColor>
        val increment = (360 as Number) / n
        run {
            var i: Number = 1
            while(i < n){
                result.push(TinyColor(object : UTSJSONObject() {
                    var h = (h + i * increment) % 360
                    var s = hsl.s
                    var l = hsl.l
                }))
                i++
            }
        }
        return result
    }
    override fun equals(other: LColorInput?): Boolean {
        if (other == null) {
            return false
        } else if (other is TinyColor) {
            return this.toRgbString() == (other as TinyColor).toRgbString()
        }
        return this.toRgbString() == TinyColor(other).toRgbString()
    }
}
fun tinyColor(color: LColorInput = "", opts: LColorOptions = LColorOptions()): TinyColor {
    return TinyColor(color, opts)
}
typealias TickType = String
typealias LoadingType = String
open class UseLoadingReturn (
    @JsonNotNull
    open var ratio: Number,
    @JsonNotNull
    open var type: LoadingType,
    @JsonNotNull
    open var mode: String,
    @JsonNotNull
    open var color: String,
    open var play: () -> Unit,
    open var failed: () -> Unit,
    open var clear: () -> Unit,
    open var destroy: () -> Unit,
    open var pause: () -> Unit,
) : UTSReactiveObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseLoadingReturn", "uni_modules/lime-loading/index.uts", 21, 13)
    }
    override fun __v_create(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UTSReactiveObject {
        return UseLoadingReturnReactiveObject(this, __v_isReadonly, __v_isShallow, __v_skip)
    }
}
open class UseLoadingReturnReactiveObject : UseLoadingReturn, IUTSReactive<UseLoadingReturn> {
    override var __v_raw: UseLoadingReturn
    override var __v_isReadonly: Boolean
    override var __v_isShallow: Boolean
    override var __v_skip: Boolean
    constructor(__v_raw: UseLoadingReturn, __v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean) : super(ratio = __v_raw.ratio, type = __v_raw.type, mode = __v_raw.mode, color = __v_raw.color, play = __v_raw.play, failed = __v_raw.failed, clear = __v_raw.clear, destroy = __v_raw.destroy, pause = __v_raw.pause) {
        this.__v_raw = __v_raw
        this.__v_isReadonly = __v_isReadonly
        this.__v_isShallow = __v_isShallow
        this.__v_skip = __v_skip
    }
    override fun __v_clone(__v_isReadonly: Boolean, __v_isShallow: Boolean, __v_skip: Boolean): UseLoadingReturnReactiveObject {
        return UseLoadingReturnReactiveObject(this.__v_raw, __v_isReadonly, __v_isShallow, __v_skip)
    }
    override var ratio: Number
        get() {
            return trackReactiveGet(__v_raw, "ratio", __v_raw.ratio, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("ratio")) {
                return
            }
            val oldValue = __v_raw.ratio
            __v_raw.ratio = value
            triggerReactiveSet(__v_raw, "ratio", oldValue, value)
        }
    override var type: LoadingType
        get() {
            return trackReactiveGet(__v_raw, "type", __v_raw.type, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("type")) {
                return
            }
            val oldValue = __v_raw.type
            __v_raw.type = value
            triggerReactiveSet(__v_raw, "type", oldValue, value)
        }
    override var mode: String
        get() {
            return trackReactiveGet(__v_raw, "mode", __v_raw.mode, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("mode")) {
                return
            }
            val oldValue = __v_raw.mode
            __v_raw.mode = value
            triggerReactiveSet(__v_raw, "mode", oldValue, value)
        }
    override var color: String
        get() {
            return trackReactiveGet(__v_raw, "color", __v_raw.color, this.__v_isReadonly, this.__v_isShallow)
        }
        set(value) {
            if (!this.__v_canSet("color")) {
                return
            }
            val oldValue = __v_raw.color
            __v_raw.color = value
            triggerReactiveSet(__v_raw, "color", oldValue, value)
        }
}
fun getPointOnCircle(centerX: Number, centerY: Number, radius: Number, angleDegrees: Number): UTSArray<Number> {
    val angleRadians = (angleDegrees * Math.PI) / 180
    val x = centerX + radius * Math.cos(angleRadians)
    val y = centerY + radius * Math.sin(angleRadians)
    return utsArrayOf(
        x,
        y
    )
}
fun useLoading(element: Ref<UniElement?>): UseLoadingReturn {
    val tick = ref<TickType>("pause")
    val state = reactive<UseLoadingReturn>(UseLoadingReturn(color = "#000", type = "circular", ratio = 1, mode = "raf", play = fun(){
        tick.value = "play"
    }
    , failed = fun(){
        tick.value = "failed"
    }
    , clear = fun(){
        tick.value = "clear"
    }
    , destroy = fun(){
        tick.value = "destroy"
    }
    , pause = fun(){
        tick.value = "pause"
    }
    ))
    val context = shallowRef<DrawableContext?>(null)
    var isPlaying = false
    var canvasWidth = ref(0)
    var canvasHeight = ref(0)
    var canvasSize = ref(0)
    var animationFrameId: Number = -1
    var animation: UniAnimation? = null
    var drawFrame: (() -> Unit)? = null
    val size = computed(fun(): Number {
        return if (state.ratio > 1) {
            state.ratio
        } else {
            canvasSize.value * state.ratio
        }
    }
    )
    val drawCircular = fun(){
        var startAngle: Number = 0
        var endAngle: Number = 0
        var rotate: Number = 0
        val MIN_ANGLE: Number = 5
        val ARC_LENGTH: Number = 359.5
        val PI = Math.PI / 180
        val SPEED: Number = 0.0045
        val ROTATE_INTERVAL: Number = 0.0225
        val lineWidth = size.value / 10
        val x = canvasWidth.value / 2
        val y = canvasHeight.value / 2
        val radius = size.value / 2 - lineWidth
        drawFrame = fun(){
            if (context.value == null || !isPlaying) {
                return
            }
            var ctx = context.value!!
            ctx.reset()
            ctx.beginPath()
            ctx.arc(x, y, radius, startAngle * PI + rotate, endAngle * PI + rotate)
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = state.color
            ctx.stroke()
            if (endAngle < ARC_LENGTH) {
                endAngle = Math.min(ARC_LENGTH, endAngle + (ARC_LENGTH - MIN_ANGLE) * SPEED)
            } else if (startAngle < ARC_LENGTH) {
                startAngle = Math.min(ARC_LENGTH, startAngle + (ARC_LENGTH - MIN_ANGLE) * SPEED)
            } else {
                startAngle = 0
                endAngle = MIN_ANGLE
            }
            ctx.update()
            if (state.mode == "raf") {
                rotate = (rotate + ROTATE_INTERVAL) % 360
                if (isPlaying && drawFrame != null) {
                    animationFrameId = requestAnimationFrame(drawFrame!!)
                }
            }
        }
    }
    var lastTime = Date.now()
    val drawSpinner = fun(){
        val steps: Number = 12
        val lineWidth = size.value / 10
        val x = canvasWidth.value / 2
        val y = canvasHeight.value / 2
        var step: Number = 0
        val length = size.value / 3.6 - lineWidth
        val offset = size.value / 4
        fun generateColorGradient(hex: String, steps: Number): UTSArray<String> {
            val colors: UTSArray<String> = utsArrayOf()
            val _color = tinyColor(hex)
            run {
                var i: Number = 1
                while(i <= steps){
                    _color.setAlpha(i / steps)
                    colors.push(_color.toRgbString())
                    i++
                }
            }
            return colors
        }
        var colors = computed(fun(): UTSArray<String> {
            return generateColorGradient(state.color, steps)
        }
        )
        drawFrame = fun(){
            if (context.value == null || !isPlaying) {
                return
            }
            val delta = Date.now() - lastTime
            if (delta >= 100) {
                lastTime = Date.now()
                var ctx = context.value!!
                ctx.reset()
                run {
                    var i: Number = 0
                    while(i < steps){
                        val stepAngle = (360 as Number) / steps
                        val angle = stepAngle * i
                        val index = (steps + i - step) % steps
                        val radian = angle * Math.PI / 180
                        val cos = Math.cos(radian)
                        val sin = Math.sin(radian)
                        ctx.beginPath()
                        ctx.moveTo(x + offset * cos, y + offset * sin)
                        ctx.lineTo(x + (offset + length) * cos, y + (offset + length) * sin)
                        ctx.lineWidth = lineWidth
                        ctx.lineCap = "round"
                        ctx.strokeStyle = colors.value[index]
                        ctx.stroke()
                        i++
                    }
                }
                ctx.update()
                if (state.mode == "raf") {
                    step = (step + 1) % steps
                }
            }
            if (state.mode == "raf") {
                if (isPlaying && drawFrame != null) {
                    animationFrameId = requestAnimationFrame(drawFrame!!)
                }
            }
        }
    }
    val drwaFailed = fun(){
        if (context.value == null) {
            return
        }
        var ctx = context.value!!
        val innerSize = size.value * 0.8
        val lineWidth = innerSize / 10
        val lineLength = (size.value - lineWidth) / 2
        val centerX = canvasWidth.value / 2
        val centerY = canvasHeight.value / 2
        val radius = (size.value - lineWidth) / 2
        val angleRadians1 = 45 * Math.PI / 180
        val angleRadians2 = -45 * Math.PI / 180
        ctx.reset()
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = state.color
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = state.color
        ctx.stroke()
        val _getPointOnCircle = getPointOnCircle(centerX, centerY, lineLength / 2, 225)
        val startX1 = _getPointOnCircle[0]
        val startY = _getPointOnCircle[1]
        val _getPointOnCircle1 = getPointOnCircle(centerX, centerY, lineLength / 2, 315)
        val startX2 = _getPointOnCircle1[0]
        val x2 = Math.sin(angleRadians1) * lineLength + startX1
        val y2 = Math.cos(angleRadians1) * lineLength + startY
        ctx.beginPath()
        ctx.moveTo(startX1, startY)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        val x3 = Math.sin(angleRadians2) * lineLength + startX2
        val y3 = Math.cos(angleRadians2) * lineLength + startY
        ctx.beginPath()
        ctx.moveTo(startX2, startY)
        ctx.lineTo(x3, y3)
        ctx.stroke()
        ctx.update()
    }
    var currentType: LoadingType? = null
    val useMode = fun(){
        if (state.mode != "raf") {
            val keyframes = utsArrayOf<UTSJSONObject>(object : UTSJSONObject() {
                var transform = "rotate(0)"
            }, object : UTSJSONObject() {
                var transform = "rotate(360)"
            })
            animation = element.value!!.animate(keyframes, UniAnimationOption(duration = 80000, easing = "linear", iterations = Infinity))
        }
    }
    val startAnimation = fun(type: String){
        if (context.value == null || element.value == null) {
            return
        }
        animation?.pause()
        if (currentType == type) {
            isPlaying = true
            animation?.play()
            drawFrame?.invoke()
            return
        }
        if (type == "circular") {
            currentType = "circular"
            drawCircular()
            useMode()
        }
        if (type == "spinner") {
            currentType = "spinner"
            drawSpinner()
            useMode()
        }
        isPlaying = true
        drawFrame?.invoke()
    }
    val resizeObserver: UniResizeObserver = UniResizeObserver(fun(_entries: UTSArray<UniResizeObserverEntry>){
        requestAnimationFrame(fun(_task){
            element.value?.getBoundingClientRectAsync()?.then(fun(rect){
                if (rect.width == 0 || rect.height == 0) {
                    return
                }
                context.value = element.value!!.getDrawableContext() as DrawableContext
                canvasWidth.value = rect.width
                canvasHeight.value = rect.height
                canvasSize.value = Math.min(rect.width, rect.height)
            }
            )
        }
        )
    }
    )
    watchEffect(fun(){
        if (element.value == null) {
            return
        }
        resizeObserver.observe(element.value!!)
    }
    )
    watchEffect(fun(){
        if (context.value == null) {
            return
        }
        if (tick.value == "play") {
            startAnimation(state.type)
        }
        if (tick.value == "failed") {
            clearTimeout(animationFrameId)
            animation?.pause()
            animation?.cancel()
            drwaFailed()
            return
        }
        if (tick.value == "clear") {
            clearTimeout(animationFrameId)
            animation?.pause()
            animation?.cancel()
            context.value?.reset()
            context.value?.update()
            isPlaying = false
            return
        }
        if (tick.value == "destroy") {
            clearTimeout(animationFrameId)
            animation?.pause()
            animation?.cancel()
            context.value?.reset()
            context.value?.update()
            context.value = null
            animation = null
            isPlaying = false
            return
        }
        if (tick.value == "pause") {
            clearTimeout(animationFrameId)
            isPlaying = false
            animation?.pause()
            return
        }
    }
    )
    return state
}
val GenUniModulesLimeLoadingComponentsLLoadingLLoadingClass = CreateVueComponent(GenUniModulesLimeLoadingComponentsLLoadingLLoading::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeLoadingComponentsLLoadingLLoading.inheritAttrs, inject = GenUniModulesLimeLoadingComponentsLLoadingLLoading.inject, props = GenUniModulesLimeLoadingComponentsLLoadingLLoading.props, propsNeedCastKeys = GenUniModulesLimeLoadingComponentsLLoadingLLoading.propsNeedCastKeys, emits = GenUniModulesLimeLoadingComponentsLLoadingLLoading.emits, components = GenUniModulesLimeLoadingComponentsLLoadingLLoading.components, styles = GenUniModulesLimeLoadingComponentsLLoadingLLoading.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeLoadingComponentsLLoadingLLoading.setup(props as GenUniModulesLimeLoadingComponentsLLoadingLLoading)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeLoadingComponentsLLoadingLLoading {
    return GenUniModulesLimeLoadingComponentsLLoadingLLoading(instance)
}
)
fun isDef(value: Any?): Boolean {
    return value != null
}
fun addUnit(value: String): String {
    return addUnit(value as Any?) as String
}
fun addUnit(value: Number): String {
    return addUnit(value as Any?) as String
}
fun addUnit(reassignedValue: Any?): String? {
    var value = reassignedValue
    if (!isDef(value)) {
        return null
    }
    value = "" + value
    return if (isNumeric(value)) {
        "" + value + "px"
    } else {
        value
    }
}
open class IconCollection (
    @JsonNotNull
    open var has: Boolean = false,
    @JsonNotNull
    open var icons: Map<String, Any?>,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("IconCollection", "uni_modules/lime-icon/components/l-icon/types.uts", 1, 13)
    }
}
val icons = ref<Map<String, Any?>>(Map<String, Any?>())
val runBlock4 = run {
    if (icons.value.size == 0) {
        uni_getFileSystemManager().readFile(ReadFileOptions(filePath = "/uni_modules/lime-icon/static/icons.json", encoding = "utf-8", success = fun(res){
            val obj = UTSAndroid.consoleDebugError(JSON.parseObject(res.data as String), " at uni_modules/lime-icon/components/l-icon/icons.uts:7")
            if (obj == null) {
                return
            }
            icons.value = obj.toMap()
        }
        , fail = fun(err) {
            uni_showToast(ShowToastOptions(title = "lime-icon:" + err.errMsg))
        }
        ))
    }
}
val GenUniModulesLimeIconComponentsLIconLIconClass = CreateVueComponent(GenUniModulesLimeIconComponentsLIconLIcon::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeIconComponentsLIconLIcon.inheritAttrs, inject = GenUniModulesLimeIconComponentsLIconLIcon.inject, props = GenUniModulesLimeIconComponentsLIconLIcon.props, propsNeedCastKeys = GenUniModulesLimeIconComponentsLIconLIcon.propsNeedCastKeys, emits = GenUniModulesLimeIconComponentsLIconLIcon.emits, components = GenUniModulesLimeIconComponentsLIconLIcon.components, styles = GenUniModulesLimeIconComponentsLIconLIcon.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeIconComponentsLIconLIcon.setup(props as GenUniModulesLimeIconComponentsLIconLIcon)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeIconComponentsLIconLIcon {
    return GenUniModulesLimeIconComponentsLIconLIcon(instance)
}
)
typealias SizeEnum = String
interface ButtonProps {
    var ariaLabel: String?
    var lId: String?
    var content: String?
    var block: Boolean
    var disabled: Boolean
    var ghost: Boolean
    var icon: String?
    var iconSize: String?
    var loading: Boolean
    var loadingProps: UTSJSONObject?
    var shape: String
    var size: SizeEnum
    var suffix: String?
    var type: String
    var variant: String?
    var radius: String?
    var fontSize: String?
    var textColor: String?
    var color: String?
    var lStyle: String?
    var gap: String?
    var formType: String?
    var openType: String?
    var hoverClass: String?
    var hoverStopPropagation: Boolean
    var hoverStartTime: Number
    var hoverStayTime: Number
    var lang: String
    var sessionFrom: String
    var sendMessageTitle: String
    var sendMessagePath: String
    var sendMessageImg: String
    var appParameter: String
    var showMessageCard: Boolean
}
val GenUniModulesLimeButtonComponentsLButtonLButtonClass = CreateVueComponent(GenUniModulesLimeButtonComponentsLButtonLButton::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeButtonComponentsLButtonLButton.inheritAttrs, inject = GenUniModulesLimeButtonComponentsLButtonLButton.inject, props = GenUniModulesLimeButtonComponentsLButtonLButton.props, propsNeedCastKeys = GenUniModulesLimeButtonComponentsLButtonLButton.propsNeedCastKeys, emits = GenUniModulesLimeButtonComponentsLButtonLButton.emits, components = GenUniModulesLimeButtonComponentsLButtonLButton.components, styles = GenUniModulesLimeButtonComponentsLButtonLButton.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeButtonComponentsLButtonLButton.setup(props as GenUniModulesLimeButtonComponentsLButtonLButton)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeButtonComponentsLButtonLButton {
    return GenUniModulesLimeButtonComponentsLButtonLButton(instance)
}
)
interface SearchProps {
    var action: String?
    var adjustPosition: Boolean
    var alwaysEmbed: Boolean
    var center: Boolean
    var clearable: Boolean
    var confirmHold: Boolean
    var confirmType: String
    var cursor: Number?
    var cursorSpacing: Number
    var disabled: Boolean
    var focus: Boolean
    var holdKeyboard: Boolean
    var leftIcon: String
    var maxcharacter: Number?
    var maxlength: Number
    var placeholder: String
    var placeholderClass: String?
    var placeholderStyle: String?
    var selectionEnd: Number
    var selectionStart: Number
    var shape: String
    var type: String
    var value: String?
    var lStyle: String?
    var cursorColor: String?
    var padding: String?
    var radius: String?
    var height: String?
    var bgColor: String?
    var fontSize: String?
    var textColor: String?
    var iconColor: String?
    var clearIconColor: String?
}
open class CharacterLengthResult (
    @JsonNotNull
    open var length: Number,
    @JsonNotNull
    open var characters: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("CharacterLengthResult", "uni_modules/lime-shared/characterLimit/index.uts", 8, 13)
    }
}
typealias ChartType = Any
fun characterLimit(type: String, char: ChartType, max: Number): CharacterLengthResult {
    val str = "" + char
    if (str.length == 0) {
        return CharacterLengthResult(length = 0, characters = "")
    }
    if (type == "maxcharacter") {
        var len: Number = 0
        run {
            var i: Number = 0
            while(i < str.length){
                var currentStringLength: Number
                val code = str.charCodeAt(i)!!
                if (code > 127 || code == 94) {
                    currentStringLength = 2
                } else {
                    currentStringLength = 1
                }
                if (len + currentStringLength > max) {
                    return CharacterLengthResult(length = len, characters = str.slice(0, i))
                }
                len += currentStringLength
                i += 1
            }
        }
        return CharacterLengthResult(length = len, characters = str)
    } else if (type == "maxlength") {
        val length = if (str.length > max) {
            max
        } else {
            str.length
        }
        return CharacterLengthResult(length = length, characters = str.slice(0, length))
    }
    return CharacterLengthResult(length = str.length, characters = str)
}
val GenUniModulesLimeSearchComponentsLSearchLSearchClass = CreateVueComponent(GenUniModulesLimeSearchComponentsLSearchLSearch::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeSearchComponentsLSearchLSearch.inheritAttrs, inject = GenUniModulesLimeSearchComponentsLSearchLSearch.inject, props = GenUniModulesLimeSearchComponentsLSearchLSearch.props, propsNeedCastKeys = GenUniModulesLimeSearchComponentsLSearchLSearch.propsNeedCastKeys, emits = GenUniModulesLimeSearchComponentsLSearchLSearch.emits, components = GenUniModulesLimeSearchComponentsLSearchLSearch.components, styles = GenUniModulesLimeSearchComponentsLSearchLSearch.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeSearchComponentsLSearchLSearch.setup(props as GenUniModulesLimeSearchComponentsLSearchLSearch)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeSearchComponentsLSearchLSearch {
    return GenUniModulesLimeSearchComponentsLSearchLSearch(instance)
}
)
interface TabPanelProps {
    var badge: Any?
    var offset: UTSArray<Any>?
    var dot: Boolean?
    var destroyOnHide: Boolean?
    var disabled: Boolean?
    var label: String?
    var lazy: Boolean?
    var value: Number?
}
open class TabPanel (
    open var badge: Any? = null,
    open var dot: Boolean? = null,
    open var offset: UTSArray<Any>? = null,
    open var destroyOnHide: Boolean? = null,
    @JsonNotNull
    open var disabled: Boolean = false,
    open var label: String? = null,
    open var lazy: Boolean? = null,
    open var value: Number? = null,
    open var ccs: UTSJSONObject? = null,
    @JsonNotNull
    open var node: UTSJSONObject,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("TabPanel", "uni_modules/lime-tabs/components/l-tabs/type.uts", 2, 13)
    }
}
interface TabsProps {
    var list: UTSArray<UTSJSONObject>?
    var ellipsis: Boolean
    var animated: Boolean
    var duration: Number
    var showLine: Boolean
    var size: String
    var spaceEvenly: Boolean
    var swipeable: Boolean
    var value: Number?
    var color: String?
    var activeColor: String?
    var lineColor: String?
    var lineWidth: String?
    var lineHeight: String?
    var bgColor: String?
    var fontSize: String?
    var padding: String?
    var split: Boolean
    var visible: Boolean
    var swiperProgress: Number
    var syncSwiper: Boolean
    var lStyle: Any?
}
val GenUniModulesLimeTabsComponentsLTabPanelLTabPanelClass = CreateVueComponent(GenUniModulesLimeTabsComponentsLTabPanelLTabPanel::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.inheritAttrs, inject = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.inject, props = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.props, propsNeedCastKeys = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.propsNeedCastKeys, emits = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.emits, components = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.components, styles = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.styles, setup = fun(props: ComponentPublicInstance, ctx: SetupContext): Any? {
        return GenUniModulesLimeTabsComponentsLTabPanelLTabPanel.setup(props as GenUniModulesLimeTabsComponentsLTabPanelLTabPanel, ctx)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeTabsComponentsLTabPanelLTabPanel {
    return GenUniModulesLimeTabsComponentsLTabPanelLTabPanel(instance)
}
)
typealias LTabPanelComponentPublicInstance = GenUniModulesLimeTabsComponentsLTabPanelLTabPanel
fun toBoolean1(value: Any?): Boolean {
    return value != null
}
fun getOffsetWithMinusString(kVal: String): String {
    return if (kVal.startsWith("-")) {
        kVal.replace("-", "")
    } else {
        "-" + kVal
    }
}
interface BadgeProps {
    var color: String?
    var content: Any?
    var dot: Boolean
    var max: Number
    var offset: UTSArray<Any>
    var position: String
    var shape: String?
    var showZero: Boolean
    var size: String?
}
val GenUniModulesLimeBadgeComponentsLBadgeLBadgeClass = CreateVueComponent(GenUniModulesLimeBadgeComponentsLBadgeLBadge::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeBadgeComponentsLBadgeLBadge.inheritAttrs, inject = GenUniModulesLimeBadgeComponentsLBadgeLBadge.inject, props = GenUniModulesLimeBadgeComponentsLBadgeLBadge.props, propsNeedCastKeys = GenUniModulesLimeBadgeComponentsLBadgeLBadge.propsNeedCastKeys, emits = GenUniModulesLimeBadgeComponentsLBadgeLBadge.emits, components = GenUniModulesLimeBadgeComponentsLBadgeLBadge.components, styles = GenUniModulesLimeBadgeComponentsLBadgeLBadge.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeBadgeComponentsLBadgeLBadge.setup(props as GenUniModulesLimeBadgeComponentsLBadgeLBadge)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeBadgeComponentsLBadgeLBadge {
    return GenUniModulesLimeBadgeComponentsLBadgeLBadge(instance)
}
)
fun calcScrollOffset(containerWidth: Number, targetLeft: Number, targetWidth: Number, offset: Number): Number {
    return offset + targetLeft - 0.5 * containerWidth + targetWidth / 2
}
fun ease1(moveX: Number, base: Number): Number {
    val absDistance = Math.abs(moveX)
    val max: Number = 50
    if (absDistance > max) {
        return (max + (absDistance - max) * 0.2) * base
    }
    return moveX
}
fun clamp(kVal: Number, min: Number, max: Number): Number {
    return Math.max(min, Math.min(max, kVal))
}
typealias Direction = String
fun getDirection(x: Number, y: Number): Direction {
    if (x > y) {
        return "horizontal"
    }
    if (y > x) {
        return "vertical"
    }
    return ""
}
typealias TouchEventHandler = (event: UniTouchEvent) -> Unit
typealias BooleanFunction = () -> Boolean
open class UseTouchResult (
    @JsonNotNull
    open var start: TouchEventHandler,
    @JsonNotNull
    open var move: TouchEventHandler,
    @JsonNotNull
    open var startX: Ref<Number>,
    @JsonNotNull
    open var startY: Ref<Number>,
    @JsonNotNull
    open var deltaX: Ref<Number>,
    @JsonNotNull
    open var deltaY: Ref<Number>,
    @JsonNotNull
    open var offsetX: Ref<Number>,
    @JsonNotNull
    open var offsetY: Ref<Number>,
    @JsonNotNull
    open var direction: Ref<Direction>,
    @JsonNotNull
    open var isVertical: BooleanFunction,
    @JsonNotNull
    open var isHorizontal: BooleanFunction,
    @JsonNotNull
    open var isTap: Ref<Boolean>,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("UseTouchResult", "uni_modules/lime-tabs/components/l-tabs/touch.uts", 14, 6)
    }
}
fun useTouch(): UseTouchResult {
    val startX = ref<Number>(0)
    val startY = ref<Number>(0)
    val deltaX = ref<Number>(0)
    val deltaY = ref<Number>(0)
    val offsetX = ref<Number>(0)
    val offsetY = ref<Number>(0)
    val direction = ref<Direction>("")
    val isTap = ref(true)
    val isVertical = fun(): Boolean {
        return direction.value === "vertical"
    }
    val isHorizontal = fun(): Boolean {
        return direction.value === "horizontal"
    }
    val reset = fun(){
        deltaX.value = 0
        deltaY.value = 0
        offsetX.value = 0
        offsetY.value = 0
        direction.value = ""
        isTap.value = true
    }
    val start = fun(event: UniTouchEvent){
        reset()
        startX.value = event.touches[0].clientX
        startY.value = event.touches[0].clientY
    }
    val move = fun(event: UniTouchEvent){
        val touch = event.touches[0]
        deltaX.value = (if (touch.clientX < 0) {
            0
        } else {
            touch.clientX
        }
        ) - startX.value
        deltaY.value = touch.clientY - startY.value
        offsetX.value = Math.abs(deltaX.value)
        offsetY.value = Math.abs(deltaY.value)
        val LOCK_DIRECTION_DISTANCE: Number = 10
        val TAP_OFFSET: Number = 5
        if (direction.value == "" || (offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE)) {
            direction.value = getDirection(offsetX.value, offsetY.value)
        }
        if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
            isTap.value = false
        }
    }
    return UseTouchResult(start = start, move = move, startX = startX, startY = startY, deltaX = deltaX, deltaY = deltaY, offsetX = offsetX, offsetY = offsetY, direction = direction, isVertical = isVertical, isHorizontal = isHorizontal, isTap = isTap)
}
open class GenUniModulesLimeTabsComponentsLTabsLTabsSlotDataLabel (
    @JsonNotNull
    open var item: TabPanel,
    @JsonNotNull
    open var active: Boolean = false,
    @JsonNotNull
    open var disabled: Boolean = false,
) : SlotData()
open class GenUniModulesLimeTabsComponentsLTabsLTabsSlotDataDefault : SlotData() {
}
open class GenUniModulesLimeTabsComponentsLTabsLTabsSlotDataLeft : SlotData() {
}
open class GenUniModulesLimeTabsComponentsLTabsLTabsSlotDataRight : SlotData() {
}
val GenUniModulesLimeTabsComponentsLTabsLTabsClass = CreateVueComponent(GenUniModulesLimeTabsComponentsLTabsLTabs::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenUniModulesLimeTabsComponentsLTabsLTabs.inheritAttrs, inject = GenUniModulesLimeTabsComponentsLTabsLTabs.inject, props = GenUniModulesLimeTabsComponentsLTabsLTabs.props, propsNeedCastKeys = GenUniModulesLimeTabsComponentsLTabsLTabs.propsNeedCastKeys, emits = GenUniModulesLimeTabsComponentsLTabsLTabs.emits, components = GenUniModulesLimeTabsComponentsLTabsLTabs.components, styles = GenUniModulesLimeTabsComponentsLTabsLTabs.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenUniModulesLimeTabsComponentsLTabsLTabs.setup(props as GenUniModulesLimeTabsComponentsLTabsLTabs)
    }
    )
}
, fun(instance, renderer): GenUniModulesLimeTabsComponentsLTabsLTabs {
    return GenUniModulesLimeTabsComponentsLTabsLTabs(instance)
}
)
val GenPagesMineHelpCenterHelpCenterClass = CreateVueComponent(GenPagesMineHelpCenterHelpCenter::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineHelpCenterHelpCenter.inheritAttrs, inject = GenPagesMineHelpCenterHelpCenter.inject, props = GenPagesMineHelpCenterHelpCenter.props, propsNeedCastKeys = GenPagesMineHelpCenterHelpCenter.propsNeedCastKeys, emits = GenPagesMineHelpCenterHelpCenter.emits, components = GenPagesMineHelpCenterHelpCenter.components, styles = GenPagesMineHelpCenterHelpCenter.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMineHelpCenterHelpCenter.setup(props as GenPagesMineHelpCenterHelpCenter)
    }
    )
}
, fun(instance, renderer): GenPagesMineHelpCenterHelpCenter {
    return GenPagesMineHelpCenterHelpCenter(instance, renderer)
}
)
val GenPagesMineHelpCenterQuestionDetailQuestionDetailClass = CreateVueComponent(GenPagesMineHelpCenterQuestionDetailQuestionDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineHelpCenterQuestionDetailQuestionDetail.inheritAttrs, inject = GenPagesMineHelpCenterQuestionDetailQuestionDetail.inject, props = GenPagesMineHelpCenterQuestionDetailQuestionDetail.props, propsNeedCastKeys = GenPagesMineHelpCenterQuestionDetailQuestionDetail.propsNeedCastKeys, emits = GenPagesMineHelpCenterQuestionDetailQuestionDetail.emits, components = GenPagesMineHelpCenterQuestionDetailQuestionDetail.components, styles = GenPagesMineHelpCenterQuestionDetailQuestionDetail.styles)
}
, fun(instance, renderer): GenPagesMineHelpCenterQuestionDetailQuestionDetail {
    return GenPagesMineHelpCenterQuestionDetailQuestionDetail(instance, renderer)
}
)
val GenPagesMessageMessageDetailMessageDetailClass = CreateVueComponent(GenPagesMessageMessageDetailMessageDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMessageMessageDetailMessageDetail.inheritAttrs, inject = GenPagesMessageMessageDetailMessageDetail.inject, props = GenPagesMessageMessageDetailMessageDetail.props, propsNeedCastKeys = GenPagesMessageMessageDetailMessageDetail.propsNeedCastKeys, emits = GenPagesMessageMessageDetailMessageDetail.emits, components = GenPagesMessageMessageDetailMessageDetail.components, styles = GenPagesMessageMessageDetailMessageDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMessageMessageDetailMessageDetail.setup(props as GenPagesMessageMessageDetailMessageDetail)
    }
    )
}
, fun(instance, renderer): GenPagesMessageMessageDetailMessageDetail {
    return GenPagesMessageMessageDetailMessageDetail(instance, renderer)
}
)
open class FuiCheckboxChangeParam (
    @JsonNotNull
    open var checked: Boolean = false,
    @JsonNotNull
    open var value: String,
) : UTSObject(), IUTSSourceMap {
    override fun `__$getOriginalPosition`(): UTSSourceMapPosition? {
        return UTSSourceMapPosition("FuiCheckboxChangeParam", "uni_modules/firstui-unix/components/fui-types/index.uts", 68, 13)
    }
}
val GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckboxClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.inject, props = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.emits, components = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.components, styles = GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox {
    return GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox(instance)
}
)
val GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroupClass = CreateVueComponent(GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.name, inheritAttrs = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.inheritAttrs, inject = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.inject, props = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.props, propsNeedCastKeys = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.propsNeedCastKeys, emits = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.emits, components = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.components, styles = GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup.styles)
}
, fun(instance, renderer): GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup {
    return GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup(instance)
}
)
val default6 = "/static/login_banner.png"
val GenComponentsTopNavBarClass = CreateVueComponent(GenComponentsTopNavBar::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "component", name = "", inheritAttrs = GenComponentsTopNavBar.inheritAttrs, inject = GenComponentsTopNavBar.inject, props = GenComponentsTopNavBar.props, propsNeedCastKeys = GenComponentsTopNavBar.propsNeedCastKeys, emits = GenComponentsTopNavBar.emits, components = GenComponentsTopNavBar.components, styles = GenComponentsTopNavBar.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenComponentsTopNavBar.setup(props as GenComponentsTopNavBar)
    }
    )
}
, fun(instance, renderer): GenComponentsTopNavBar {
    return GenComponentsTopNavBar(instance)
}
)
val GenPagesLoginLoginClass = CreateVueComponent(GenPagesLoginLogin::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesLoginLogin.inheritAttrs, inject = GenPagesLoginLogin.inject, props = GenPagesLoginLogin.props, propsNeedCastKeys = GenPagesLoginLogin.propsNeedCastKeys, emits = GenPagesLoginLogin.emits, components = GenPagesLoginLogin.components, styles = GenPagesLoginLogin.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesLoginLogin.setup(props as GenPagesLoginLogin)
    }
    )
}
, fun(instance, renderer): GenPagesLoginLogin {
    return GenPagesLoginLogin(instance, renderer)
}
)
val GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass = CreateVueComponent(GenPagesMessageMessageDeviceDetailMessageDeviceDetail::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.inheritAttrs, inject = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.inject, props = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.props, propsNeedCastKeys = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.propsNeedCastKeys, emits = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.emits, components = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.components, styles = GenPagesMessageMessageDeviceDetailMessageDeviceDetail.styles, setup = fun(props: ComponentPublicInstance): Any? {
        return GenPagesMessageMessageDeviceDetailMessageDeviceDetail.setup(props as GenPagesMessageMessageDeviceDetailMessageDeviceDetail)
    }
    )
}
, fun(instance, renderer): GenPagesMessageMessageDeviceDetailMessageDeviceDetail {
    return GenPagesMessageMessageDeviceDetailMessageDeviceDetail(instance, renderer)
}
)
fun createApp(): UTSJSONObject {
    val app = createSSRApp(GenAppClass)
    return UTSJSONObject(Map<String, Any?>(utsArrayOf(
        utsArrayOf(
            "app",
            app
        )
    )))
}
fun main(app: IApp) {
    definePageRoutes()
    defineAppConfig()
    (createApp()["app"] as VueApp).mount(app, GenUniApp())
}
open class UniAppConfig : io.dcloud.uniapp.appframe.AppConfig {
    override var name: String = "veepai"
    override var appid: String = "__UNI__1F0985E"
    override var versionName: String = "1.0.0"
    override var versionCode: String = "100"
    override var uniCompilerVersion: String = "4.66"
    constructor() : super() {}
}
fun definePageRoutes() {
    __uniRoutes.push(UniPageRoute(path = "pages/index/index", component = GenPagesIndexIndexClass, meta = UniPageMeta(isQuit = true), style = utsMapOf("navigationBarTitleText" to "首页")))
    __uniRoutes.push(UniPageRoute(path = "pages/message/message", component = GenPagesMessageMessageClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "消息")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/mine", component = GenPagesMineMineClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "我的")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/userInfo/userInfo", component = GenPagesMineUserInfoUserInfoClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "个人信息")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/userInfo/CancelAnAccount/CancelAnAccount", component = GenPagesMineUserInfoCancelAnAccountCancelAnAccountClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "注销账号")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/userInfo/changePhoneNumber/changePhoneNumber", component = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "修改手机号")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/userInfo/changePassword/changePassword", component = GenPagesMineUserInfoChangePasswordChangePasswordClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "修改密码")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/rechargeDataTraffic/rechargeDataTraffic", component = GenPagesMineRechargeDataTrafficRechargeDataTrafficClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "流量充值")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/helpCenter/helpCenter", component = GenPagesMineHelpCenterHelpCenterClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "帮助中心")))
    __uniRoutes.push(UniPageRoute(path = "pages/mine/helpCenter/questionDetail/questionDetail", component = GenPagesMineHelpCenterQuestionDetailQuestionDetailClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "问题详情")))
    __uniRoutes.push(UniPageRoute(path = "pages/message/messageDetail/messageDetail", component = GenPagesMessageMessageDetailMessageDetailClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "消息详情")))
    __uniRoutes.push(UniPageRoute(path = "pages/login/login", component = GenPagesLoginLoginClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationStyle" to "custom", "navigationBarTitleText" to "登陆")))
    __uniRoutes.push(UniPageRoute(path = "pages/message/messageDeviceDetail/messageDeviceDetail", component = GenPagesMessageMessageDeviceDetailMessageDeviceDetailClass, meta = UniPageMeta(isQuit = false), style = utsMapOf("navigationBarTitleText" to "设备信息")))
}
val __uniTabBar: Map<String, Any?>? = utsMapOf("list" to utsArrayOf(
    utsMapOf("pagePath" to "pages/index/index", "iconPath" to "./static/tabbar/home.png", "selectedIconPath" to "./static/tabbar/home1.png", "text" to "首页"),
    utsMapOf("pagePath" to "pages/message/message", "iconPath" to "./static/tabbar/message.png", "selectedIconPath" to "./static/tabbar/message1.png", "text" to "消息"),
    utsMapOf("pagePath" to "pages/mine/mine", "iconPath" to "./static/tabbar/userCenter.png", "selectedIconPath" to "./static/tabbar/userCenter1.png", "text" to "我的")
))
val __uniLaunchPage: Map<String, Any?> = utsMapOf("url" to "pages/index/index", "style" to utsMapOf("navigationBarTitleText" to "首页"))
fun defineAppConfig() {
    __uniConfig.entryPagePath = "/pages/index/index"
    __uniConfig.globalStyle = utsMapOf("navigationBarTextStyle" to "black", "navigationBarTitleText" to "uniappX", "navigationBarBackgroundColor" to "#F8F8F8", "backgroundColor" to "#F8F8F8")
    __uniConfig.getTabBarConfig = fun(): Map<String, Any>? {
        return utsMapOf("list" to utsArrayOf(
            utsMapOf("pagePath" to "pages/index/index", "iconPath" to "./static/tabbar/home.png", "selectedIconPath" to "./static/tabbar/home1.png", "text" to "首页"),
            utsMapOf("pagePath" to "pages/message/message", "iconPath" to "./static/tabbar/message.png", "selectedIconPath" to "./static/tabbar/message1.png", "text" to "消息"),
            utsMapOf("pagePath" to "pages/mine/mine", "iconPath" to "./static/tabbar/userCenter.png", "selectedIconPath" to "./static/tabbar/userCenter1.png", "text" to "我的")
        ))
    }
    __uniConfig.tabBar = __uniConfig.getTabBarConfig()
    __uniConfig.conditionUrl = ""
    __uniConfig.uniIdRouter = utsMapOf()
    __uniConfig.ready = true
}
open class GenUniApp : UniAppImpl() {
    open val vm: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
    open val `$vm`: GenApp?
        get() {
            return getAppVm() as GenApp?
        }
}
fun getApp(): GenUniApp {
    return getUniApp() as GenUniApp
}
