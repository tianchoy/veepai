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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import io.dcloud.uniapp.extapi.connectSocket as uni_connectSocket
import io.dcloud.uniapp.extapi.exit as uni_exit
import io.dcloud.uniapp.extapi.getDeviceInfo as uni_getDeviceInfo
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
    val id: String = "app-android_L-Af8E"
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
val `default` = DayutsLocale(name = "en", weekdays = utsArrayOf(
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
    localeState.locales.set("en", `default`)
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
val default1 = "/static/mine/right.png"
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
val default2 = "/static/error_big.png"
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
val GenPagesMineUserInfoChangePhoneNumberChangePhoneNumberClass = CreateVueComponent(GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber::class.java, fun(): VueComponentOptions {
    return VueComponentOptions(type = "page", name = "", inheritAttrs = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.inheritAttrs, inject = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.inject, props = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.props, propsNeedCastKeys = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.propsNeedCastKeys, emits = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.emits, components = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.components, styles = GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber.styles)
}
, fun(instance, renderer): GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber {
    return GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber(instance, renderer)
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
