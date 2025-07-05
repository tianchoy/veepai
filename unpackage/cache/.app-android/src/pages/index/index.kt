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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexIndex) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexIndex
            val _cache = __ins.renderCache
            val deviceTitle = ref("设备名称")
            val forward = "/static/video/forward.png"
            val errIcon = "/static/video/error.png"
            val transfer = "/static/video/transfer.png"
            val replayIcon = "/static/video/replay.png"
            val pauseIcon = "/static/video/pause.png"
            val videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
            val replay = fun(){
                uni_showToast(ShowToastOptions(title = "重播", icon = "none"))
            }
            val transferClick = fun(){
                uni_showToast(ShowToastOptions(title = "传输", icon = "none"))
            }
            val errClick = fun(){
                uni_showToast(ShowToastOptions(title = "警报", icon = "none"))
            }
            val toDeviceDetail = fun(){
                uni_showToast(ShowToastOptions(title = "设备详情", icon = "none"))
            }
            val pauseClick = fun(){
                uni_showToast(ShowToastOptions(title = "暂停", icon = "none"))
            }
            val vedioClick = fun(){
                uni_showToast(ShowToastOptions(title = "播放", icon = "none"))
            }
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "video-container", "style" to normalizeStyle(utsMapOf("border-radius" to "15rpx", "overflow" to "hidden"))), utsArrayOf(
                            createElementVNode("video", utsMapOf("class" to "video", "title" to deviceTitle.value, "src" to videoSrc, "controls" to false, "onClick" to vedioClick), null, 8, utsArrayOf(
                                "title"
                            ))
                        ), 4),
                        createElementVNode("view", utsMapOf("class" to "video-right-control"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "vedio-control"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "vedio-control-icon", "src" to forward, "onClick" to toDeviceDetail))
                            )),
                            createElementVNode("view", utsMapOf("class" to "vedio-control"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "vedio-control-icon", "src" to errIcon, "onClick" to errClick))
                            )),
                            createElementVNode("view", utsMapOf("class" to "vedio-control"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "vedio-control-icon", "src" to transfer, "onClick" to transferClick))
                            )),
                            createElementVNode("view", utsMapOf("class" to "vedio-control"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "vedio-control-icon", "src" to replayIcon, "onClick" to replay))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "video-bottom-control"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "vedio-control"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "vedio-control-icon", "onClick" to pauseClick, "src" to pauseIcon))
                            ))
                        ))
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column")), "content" to utsMapOf(".container " to utsMapOf("position" to "relative", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "width" to "100%", "height" to "400rpx", "overflow" to "hidden")), "video-container" to utsMapOf(".container .content " to utsMapOf("width" to "100%", "height" to "100%")), "video" to utsMapOf(".container .content " to utsMapOf("width" to "100%", "height" to "100%", "objectFit" to "cover", "marginBottom" to 0)), "video-top-title" to utsMapOf(".container .content " to utsMapOf("position" to "absolute", "top" to 0, "height" to "60rpx", "width" to "80%", "paddingTop" to "15rpx", "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to "20rpx", "backgroundImage" to "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor" to "rgba(0,0,0,0)", "zIndex" to 3)), "video-right-control" to utsMapOf(".container .content " to utsMapOf("position" to "absolute", "top" to 0, "right" to "10rpx", "display" to "flex", "flexDirection" to "column", "justifyContent" to "space-around", "height" to "100%", "alignItems" to "center", "zIndex" to 2)), "vedio-control" to utsMapOf(".container .content .video-right-control " to utsMapOf("width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)"), ".container .content .video-bottom-control " to utsMapOf("marginTop" to 0, "marginRight" to "auto", "marginBottom" to 0, "marginLeft" to "auto", "width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)")), "vedio-control-icon" to utsMapOf(".container .content .video-right-control .vedio-control " to utsMapOf("width" to "100%", "height" to "100%"), ".container .content .video-bottom-control .vedio-control " to utsMapOf("width" to "100%", "height" to "100%")), "video-bottom-control" to utsMapOf(".container .content " to utsMapOf("position" to "absolute", "bottom" to "10rpx", "left" to 0, "width" to "100%", "height" to "50rpx", "zIndex" to 1)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
