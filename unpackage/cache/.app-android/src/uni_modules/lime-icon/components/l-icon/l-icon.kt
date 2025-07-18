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
import io.dcloud.uniapp.extapi.getStorageSync as uni_getStorageSync
open class GenUniModulesLimeIconComponentsLIconLIcon : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var name: String by `$props`
    open var color: String? by `$props`
    open var size: Any? by `$props`
    open var prefix: String by `$props`
    open var lClass: String by `$props`
    open var inherit: Boolean by `$props`
    open var web: Boolean by `$props`
    open var lStyle: Any by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeIconComponentsLIconLIcon) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeIconComponentsLIconLIcon
            val _cache = __ins.renderCache
            val name = "l-icon"
            val IconifyURL: String = "https://api.iconify.design/"
            val `$iconsHost`: String? = uni_getStorageSync("\$limeIconsHost") as String?
            val props = __props
            val `$iconCollection` = inject<IconCollection>("\$iconCollection", IconCollection(has = false, icons = Map<String, Any?>()))
            val innerName = computed(fun(): String {
                return props.name
            }
            )
            val collectionIcon = computed(fun(): String? {
                return `$iconCollection`.icons.get(innerName.value) as String?
            }
            )
            val webviewRef = ref<UniWebViewElement?>(null)
            val hasHost = computed<Boolean>(fun(): Boolean {
                return innerName.value.indexOf("/") != -1
            }
            )
            val isIconify = computed<Boolean>(fun(): Boolean {
                return !hasHost.value && innerName.value.includes(":")
            }
            )
            val isImage = computed<Boolean>(fun(): Boolean {
                return UTSRegExp("\\.(jpe?g|png|gif|bmp|webp|tiff?)\$", "i").test(innerName.value) || UTSRegExp("^data:image\\/(jpeg|png|gif|bmp|webp|tiff);base64,", "").test(innerName.value)
            }
            )
            val isSVG = computed<Boolean>(fun(): Boolean {
                return UTSRegExp("\\.svg\$", "i").test(innerName.value) || innerName.value.startsWith("data:image/svg+xml") || innerName.value.startsWith("<svg")
            }
            )
            val classes = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("" + name + "--font", !isImage.value && !isIconify.value && !isSVG.value)
                cls.set("" + name + "--image", isImage.value || isIconify.value || isSVG.value)
                cls.set(props.prefix, props.prefix.length > 0)
                cls.set(props.lClass, props.lClass.length > 0)
                return cls
            }
            )
            val styles = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if ((props.color != "" && props.color != null) && !isImage.value && !isIconify.value) {
                    style.set("color", props.color!!)
                }
                val size = addUnit(props.size) ?: (if ((isImage.value || isIconify.value)) {
                    "32px"
                } else {
                    null
                }
                )
                if (size != null) {
                    if (isImage.value || isIconify.value || isSVG.value) {
                        style.set("height", size)
                        style.set("width", size)
                    } else {
                        style.set("font-size", size)
                    }
                }
                return style
            }
            )
            val iconCode = computed<String>(fun(): String {
                return icons.value.get(innerName.value) as String? ?: (if (UTSRegExp("[^\\x00-\\x7F]", "").test(innerName.value)) {
                    innerName.value
                } else {
                    ""
                }
                )
            }
            )
            val isError = ref(false)
            val cacheMap = Map<String, String>()
            val iconUrl = computed(fun(): String {
                val hasIconsHost = `$iconsHost` != null && `$iconsHost` != ""
                if (isImage.value) {
                    return if (hasHost.value) {
                        innerName.value
                    } else {
                        (`$iconsHost` ?: "") + innerName.value
                    }
                } else if (isIconify.value) {
                    if (cacheMap.has(innerName.value) && !isError.value) {
                        return cacheMap.get(innerName.value)!!
                    }
                    val _host = "" + (if (hasIconsHost) {
                        `$iconsHost`
                    } else {
                        IconifyURL
                    })
                    val _icon = collectionIcon.value ?: _host + ("" + innerName.value + ".svg").replace(UTSRegExp(":", "g"), "/")
                    cacheMap.set(innerName.value, _icon)
                    return _icon
                } else if (isSVG.value) {
                    return (if (UTSRegExp("\\.svg\$", "i").test(innerName.value) && `$iconsHost` != null && !hasHost.value) {
                        `$iconsHost`
                    } else {
                        ""
                    }) + innerName.value.replace(UTSRegExp("'", "g"), "\"")
                } else {
                    return ""
                }
            }
            )
            return fun(): Any? {
                return if (isTrue(!unref(isImage) && !unref(isIconify) && !unref(isSVG))) {
                    _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                        "l-icon",
                        _uA(
                            unref(classes),
                            _ctx.lClass
                        )
                    )), "style" to _nS(_uA(
                        unref(styles),
                        _ctx.lStyle
                    )), "onClick" to fun(){
                        _ctx.`$emit`("click")
                    }), _tD(unref(iconCode)), 15, _uA(
                        "onClick"
                    ))
                } else {
                    if (isTrue((!unref(isSVG) && !unref(isIconify)) && unref(isImage))) {
                        _cE("image", _uM("key" to 1, "class" to _nC(_uA(
                            "l-icon",
                            _uA(
                                unref(classes),
                                _ctx.lClass
                            )
                        )), "style" to _nS(_uA(
                            unref(styles),
                            _ctx.lStyle
                        )), "src" to unref(iconUrl), "onClick" to fun(){
                            _ctx.`$emit`("click")
                        }), null, 14, _uA(
                            "src",
                            "onClick"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                }
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-icon--font" to _pS(_uM("fontFamily" to "l", "textAlign" to "center")), "@FONT-FACE" to _uM("0" to _uM("fontFamily" to "l", "src" to "url(\"/assets/t3.9658ea31.ttf\")")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null)
        var props = _nP(_uM("name" to _uM("type" to "String", "default" to "", "required" to true), "color" to _uM("type" to "String"), "size" to _uM("type" to _uA(
            "String",
            "Number"
        )), "prefix" to _uM("type" to "String", "default" to ""), "lClass" to _uM("type" to "String", "default" to ""), "inherit" to _uM("type" to "Boolean", "default" to true), "web" to _uM("type" to "Boolean", "default" to false), "lStyle" to _uM("type" to _uA(
            "String",
            "Object",
            "Array"
        ), "default" to "")))
        var propsNeedCastKeys = _uA(
            "name",
            "prefix",
            "lClass",
            "inherit",
            "web",
            "lStyle"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
