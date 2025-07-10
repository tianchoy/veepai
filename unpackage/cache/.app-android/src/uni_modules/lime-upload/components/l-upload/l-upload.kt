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
import io.dcloud.uniapp.extapi.previewImage as uni_previewImage
import io.dcloud.uniapp.extapi.uploadFile as uni_uploadFile
open class GenUniModulesLimeUploadComponentsLUploadLUpload : VueComponent, UploadProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var name: String? by `$props`
    override var modelValue: UTSArray<UTSJSONObject>? by `$props`
    override var disabled: Boolean by `$props`
    override var readonly: Boolean by `$props`
    override var multiple: Boolean by `$props`
    override var imageFit: String by `$props`
    override var gutter: String? by `$props`
    override var column: Number? by `$props`
    override var max: Number by `$props`
    override var sizeLimit: Number? by `$props`
    override var uploadIcon: String by `$props`
    override var uploadIconSize: String? by `$props`
    override var gridWidth: String? by `$props`
    override var gridHeight: String? by `$props`
    override var gridBgColor: String? by `$props`
    override var addBgColor: String? by `$props`
    override var gridBorderRadius: String? by `$props`
    override var defaultFiles: UTSArray<UTSJSONObject>? by `$props`
    override var loadingText: String by `$props`
    override var reloadText: String by `$props`
    override var failedText: String by `$props`
    override var disablePreview: Boolean by `$props`
    override var autoUpload: Boolean by `$props`
    override var mediaType: String by `$props`
    override var maxDuration: Number? by `$props`
    override var sizeType: UTSArray<String> by `$props`
    override var sourceType: UTSArray<String> by `$props`
    override var action: String? by `$props`
    override var headers: UTSJSONObject? by `$props`
    override var formData: UTSJSONObject? by `$props`
    override var mode: String by `$props`
    open var remove: (index: Number) -> Unit
        get() {
            return unref(this.`$exposed`["remove"]) as (index: Number) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "remove", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeUploadComponentsLUploadLUpload, _arg1: SetupContext) -> Any? = fun(__props, ref1): Any? {
            var __expose = ref1.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeUploadComponentsLUploadLUpload
            val _cache = __ins.renderCache
            val formDisabled = inject<Ref<Boolean?>?>("formDisabled", null)
            val formReadonly = inject<Ref<Boolean?>?>("formReadonly", null)
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val isReadonly = computed(fun(): Boolean {
                console.log("isReadonly", props.readonly, " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:150")
                if (props.readonly) {
                    return props.readonly
                }
                return formReadonly?.value ?: false
            }
            )
            val isDisabled = computed(fun(): Boolean {
                if (props.disabled) {
                    return props.disabled
                }
                return formDisabled?.value ?: false
            }
            )
            val transformFiles = fun(it: Any): UploadFile {
                if (it is UploadFile) {
                    return it
                }
                val file = UTSJSONObject.assign(UTSJSONObject(), it as UTSJSONObject)
                return UploadFile(url = file.getString("url") ?: "", path = file.getString("path"), name = file.getString("name"), thumb = file.getString("thumb"), size = file.getNumber("size"), type = file.getString("type"), percent = file.getNumber("percent"), status = file.getString("status") ?: "done")
            }
            val customFiles = ref<UTSArray<UploadFile>>((props.modelValue ?: props.defaultFiles)?.map(transformFiles) ?: utsArrayOf())
            val listWidth = ref(0)
            val uploadRef = ref<UniElement?>(null)
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                val gutter = unitConvert(props.gutter ?: 8) / 2 * -1
                style.set("margin-left", "" + gutter + "px")
                style.set("margin-right", "" + gutter + "px")
                style.set("margin-top", "" + gutter + "px")
                return style
            }
            )
            val itemStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                val gutter = unitConvert(props.gutter ?: 8) / 2
                var column = props.column ?: 4
                if (props.gridWidth != null || props.column != null) {
                    val width = listWidth.value / column - gutter * 2.0275
                    style.set("width", props.gridWidth ?: "" + width + "px")
                }
                if (props.gridHeight != null) {
                    style.set("height", props.gridHeight!!)
                }
                style.set("margin", "" + gutter + "px")
                if (props.gridBgColor != null) {
                    style.set("background", props.gridBgColor!!)
                }
                return style
            }
            )
            val onFileClick = fun(index: Number){
                val file = customFiles.value[index]
                emits("click", UTSJSONObject(Map<String, Any?>(utsArrayOf(
                    utsArrayOf(
                        "file",
                        file
                    )
                ))))
            }
            val onProofTap = fun(index: Number){
                onFileClick(index)
                if (props.disablePreview) {
                    return
                }
                uni_previewImage(PreviewImageOptions(urls = customFiles.value.filter(fun(file): Boolean {
                    return file.percent != -1
                }
                ).map(fun(file): String {
                    return file.url
                }
                ), current = index))
            }
            val onDelete = fun(index: Number){
                if (isDisabled.value || isReadonly.value) {
                    return
                }
                val delFile = customFiles.value[index]
                customFiles.value = customFiles.value.filter(fun(file, i): Boolean {
                    return index != i
                }
                )
                emits("remove", UTSJSONObject(Map<String, Any?>(utsArrayOf(
                    utsArrayOf(
                        "index",
                        index
                    ),
                    utsArrayOf(
                        "file",
                        delFile
                    )
                ))))
            }
            var last: Number
            val upload = fun(files: UTSArray<UploadFile>){
                if (!props.autoUpload || props.action == null || props.action!!.length < 5) {
                    return
                }
                if (props.action == "uniCloud") {
                    var uploadImgs: UTSArray<UTSPromise<UniCloudUploadFileResult>> = utsArrayOf()
                    files.forEach(fun(file, index){
                        val promise = UTSPromise<UniCloudUploadFileResult>(fun(resolve, reject){
                            val dotIndex = file.name!!.lastIndexOf(".")
                            val baseName = file.name!!.substring(0, dotIndex)
                            val extension = file.name!!.substring(dotIndex)
                            val timestamp = Date.now()
                            uniCloud.uploadFile(UniCloudUploadFileOptions(filePath = file.url, cloudPath = "" + baseName + "_" + timestamp + extension, onUploadProgress = fun(res){
                                file.status = "loading"
                                file.percent = Math.floor(res.loaded / res.total * 100)
                            })).then(fun(res){
                                file.path = res.fileID
                                file.status = "done"
                                uniCloud.getTempFileURL(UniCloudGetTempFileURLOptions(fileList = utsArrayOf(
                                    res.fileID
                                ))).then(fun(result){
                                    if (result.fileList.length > 0) {
                                        file.url = result.fileList[0].tempFileURL
                                    }
                                    resolve(res)
                                }).`catch`(fun(error){
                                    console.error("获取临时URL失败", error, " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:296")
                                    resolve(res)
                                })
                            }).`catch`(fun(err){
                                file.status = "failed"
                                reject(err)
                            })
                        })
                        uploadImgs.push(promise as UTSPromise<UniCloudUploadFileResult>)
                    })
                    UTSPromise.all(uploadImgs).then(fun(res){
                        emits("success", res)
                    }).`catch`(fun(err){
                        emits("fail", err)
                    })
                } else {
                    var uploadImgs: UTSArray<UTSPromise<UploadFileSuccess>> = utsArrayOf()
                    files.forEach(fun(file, index){
                        val promise = UTSPromise<UploadFileSuccess>(fun(resolve, reject){
                            val task = uni_uploadFile(UploadFileOptions(url = props.action!!, filePath = file.url, name = file.name, formData = props.formData, header = props.headers, success = fun(res){
                                file.status = "done"
                                if (res.statusCode == 200) {
                                    if (UTSAndroid.`typeof`(res.data) == "string") {
                                        try {
                                            val data = UTSAndroid.consoleDebugError(JSON.parse<UTSJSONObject>(res.data), " at uni_modules/lime-upload/components/l-upload/l-upload.uvue:328")
                                            val url = data?.getString("url")
                                            if (url != null) {
                                                file.path = url
                                            }
                                        }
                                         catch (e: Throwable) {}
                                    }
                                }
                                resolve(res)
                            }
                            , fail = fun(err) {
                                file.status = "failed"
                                reject(err)
                            }
                            ))
                            task.onProgressUpdate(fun(res){
                                file.status = "loading"
                                file.percent = res.progress
                            }
                            )
                        }
                        )
                        uploadImgs.push(promise as UTSPromise<UploadFileSuccess>)
                    }
                    )
                    UTSPromise.all(uploadImgs).then(fun(res){
                        emits("success", res)
                    }
                    ).`catch`(fun(err){
                        emits("fail", err)
                    }
                    )
                }
            }
            val customLimit = computed(fun(): Number {
                return if (props.max == 0) {
                    20
                } else {
                    props.max - customFiles.value.length
                }
            }
            )
            val onAddTap = fun(){
                if (isDisabled.value || isReadonly.value) {
                    return
                }
                chooseFiles(ChooseFileOptions1(mediaType = props.mediaType, count = customLimit.value, sourceType = props.sourceType, sizeType = props.sizeType, sizeLimit = props.sizeLimit)).then(fun(files){
                    last = customFiles.value.length
                    customFiles.value = customFiles.value.concat(files)
                    val _files = customFiles.value.filter(fun(it, i): Boolean {
                        return i > last - 1
                    }
                    )
                    upload(_files)
                    emits("add", _files)
                }
                )
            }
            val stop = watch(customFiles, fun(v: UTSArray<UploadFile>){
                emits("update:modelValue", v)
            }
            )
            val stopValue = watch(fun(): UTSArray<UTSJSONObject>? {
                return props.modelValue
            }
            , fun(v: UTSArray<UTSJSONObject>?){
                if (v != null && v.length != customFiles.value.length) {
                    customFiles.value = v.map(transformFiles)
                }
            }
            )
            __expose(utsMapOf("remove" to onDelete))
            val resizeObserver = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
                listWidth.value = entries[0].target.getBoundingClientRect().width
            }
            )
            onMounted(fun(){
                nextTick(fun(){
                    listWidth.value = uploadRef.value?.getBoundingClientRect()?.width ?: 0
                    resizeObserver.observe(uploadRef.value!!)
                }
                )
            }
            )
            onUnmounted(fun(){
                stop()
                resizeObserver.disconnect()
            }
            )
            return fun(): Any? {
                val _component_l_loading = resolveEasyComponent("l-loading", GenUniModulesLimeLoadingComponentsLLoadingLLoadingClass)
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return createElementVNode("view", utsMapOf("class" to "l-upload", "ref_key" to "uploadRef", "ref" to uploadRef, "style" to normalizeStyle(unref(styles))), utsArrayOf(
                    createElementVNode(Fragment, null, RenderHelpers.renderList(unref(customFiles), fun(file, index, __index, _cached): Any {
                        return createElementVNode("view", utsMapOf("class" to "l-upload__item", "style" to normalizeStyle(utsArrayOf(
                            unref(itemStyle)
                        )), "key" to file.url), utsArrayOf(
                            renderSlot(_ctx.`$slots`, "file", GenUniModulesLimeUploadComponentsLUploadLUploadSlotDataFile(file = file, index = index), fun(): UTSArray<Any> {
                                return utsArrayOf(
                                    if (file.type == "image") {
                                        createElementVNode("image", utsMapOf("key" to 0, "class" to "l-upload__image", "src" to file.url, "data-file" to file, "mode" to _ctx.imageFit, "onClick" to fun(){
                                            onProofTap(index)
                                        }), null, 8, utsArrayOf(
                                            "src",
                                            "data-file",
                                            "mode",
                                            "onClick"
                                        ))
                                    } else {
                                        createCommentVNode("v-if", true)
                                    }
                                    ,
                                    if (file.type == "video") {
                                        createElementVNode("video", utsMapOf("key" to 1, "class" to "l-upload__image", "src" to file.url, "data-file" to file, "autoplay" to false, "objectFit" to "contain", "onClick" to fun(){
                                            onFileClick(index)
                                        }), null, 8, utsArrayOf(
                                            "src",
                                            "data-file",
                                            "onClick"
                                        ))
                                    } else {
                                        createCommentVNode("v-if", true)
                                    }
                                    ,
                                    if (isTrue(file.status != null && file.status != "done")) {
                                        createElementVNode("view", utsMapOf("key" to 2, "class" to "l-upload__progress-mask", "data-file" to file, "onClick" to fun(){
                                            onFileClick(index)
                                        }), utsArrayOf(
                                            if (file.status == "loading") {
                                                createElementVNode(Fragment, utsMapOf("key" to 0), utsArrayOf(
                                                    createVNode(_component_l_loading, utsMapOf("class" to "l-upload__progress-loading", "size" to "24px", "color" to "white")),
                                                    if (file.percent != null) {
                                                        createElementVNode("text", utsMapOf("key" to 0, "class" to "l-upload__progress-text"), toDisplayString(file.percent) + "%", 1)
                                                    } else {
                                                        createElementVNode("text", utsMapOf("key" to 1, "class" to "l-upload__progress-text"), toDisplayString(_ctx.loadingText), 1)
                                                    }
                                                ), 64)
                                            } else {
                                                createVNode(_component_l_icon, utsMapOf("key" to 1, "class" to "l-upload__progress-icon", "name" to if (file.status == "reload") {
                                                    "refresh"
                                                } else {
                                                    "close-circle"
                                                }, "size" to "48rpx", "aria-hidden" to ""), null, 8, utsArrayOf(
                                                    "name"
                                                ))
                                            },
                                            if (isTrue(file.status == "reload" || file.status == "failed")) {
                                                createElementVNode("text", utsMapOf("key" to 2, "class" to "l-upload__progress-text"), toDisplayString(if (file.status == "reload") {
                                                    _ctx.reloadText
                                                } else {
                                                    _ctx.failedText
                                                }), 1)
                                            } else {
                                                createCommentVNode("v-if", true)
                                            }
                                        ), 8, utsArrayOf(
                                            "data-file",
                                            "onClick"
                                        ))
                                    } else {
                                        createCommentVNode("v-if", true)
                                    }
                                    ,
                                    if (isTrue(!unref(isReadonly))) {
                                        createElementVNode("view", utsMapOf("key" to 3, "class" to "l-upload__delete-btn", "aria-role" to "button", "aria-label" to "删除", "data-index" to index, "onClick" to fun(){
                                            onDelete(index)
                                        }), utsArrayOf(
                                            createVNode(_component_l_icon, utsMapOf("name" to "close", "size" to "16px", "color" to "#fff"))
                                        ), 8, utsArrayOf(
                                            "data-index",
                                            "onClick"
                                        ))
                                    } else {
                                        createCommentVNode("v-if", true)
                                    }
                                )
                            }
                            )
                        ), 4)
                    }
                    ), 128),
                    if (isTrue(!unref(isReadonly))) {
                        withDirectives(createElementVNode("view", utsMapOf("key" to 0, "class" to normalizeClass(utsArrayOf(
                            "l-upload__item l-upload__item--add",
                            utsMapOf("l-upload__item--disabled" to unref(isDisabled))
                        )), "style" to normalizeStyle(utsArrayOf(
                            unref(itemStyle),
                            if (_ctx.addBgColor != null) {
                                utsMapOf("background" to _ctx.addBgColor)
                            } else {
                                ""
                            }
                        )), "aria-label" to "上传", "onClick" to onAddTap), utsArrayOf(
                            renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                return utsArrayOf(
                                    createVNode(_component_l_icon, utsMapOf("class" to "l-upload__add-icon", "size" to _ctx.uploadIconSize, "name" to _ctx.uploadIcon), null, 8, utsArrayOf(
                                        "size",
                                        "name"
                                    ))
                                )
                            })
                        ), 6), utsArrayOf(
                            utsArrayOf(
                                vShow,
                                if (!_ctx.multiple) {
                                    unref(customFiles).length == 0
                                } else {
                                    _ctx.max == 0 || unref(customFiles).length != _ctx.max
                                }
                            )
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ), 4)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-upload" to padStyleMapOf(utsMapOf("flex" to 1, "position" to "relative", "flexDirection" to "row", "flexWrap" to "wrap")), "l-upload__item" to padStyleMapOf(utsMapOf("position" to "relative", "display" to "flex", "width" to 80, "height" to 80, "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "overflow" to "hidden", "alignItems" to "center", "justifyContent" to "center")), "l-upload__item--add" to padStyleMapOf(utsMapOf("backgroundImage" to "none", "backgroundColor" to "#f3f3f3")), "l-upload__item--disabled" to padStyleMapOf(utsMapOf("opacity" to 0.5)), "l-upload__image" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%")), "l-upload__add-icon" to padStyleMapOf(utsMapOf("fontSize" to 28, "color" to "rgba(0,0,0,0.25)")), "l-upload__delete-btn" to padStyleMapOf(utsMapOf("position" to "absolute", "top" to 0, "right" to 0, "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "width" to 20, "height" to 20, "borderTopRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "backgroundColor" to "rgba(0,0,0,0.65)")), "l-upload__progress-mask" to padStyleMapOf(utsMapOf("position" to "absolute", "left" to 0, "top" to 0, "bottom" to 0, "width" to "100%", "backgroundColor" to "rgba(0,0,0,0.45)", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "paddingTop" to 16, "paddingRight" to 0, "paddingBottom" to 16, "paddingLeft" to 0)), "l-upload__progress-text" to padStyleMapOf(utsMapOf("fontSize" to 12, "lineHeight" to "20px", "marginTop" to 4, "color" to "#FFFFFF")), "l-upload__progress-loading" to padStyleMapOf(utsMapOf("alignSelf" to "center")), "l-upload__progress-icon" to padStyleMapOf(utsMapOf("color" to "#FFFFFF", "!fontSize" to 24, "!width" to 24)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("fail" to null, "remove" to null, "success" to null, "click" to null, "add" to null, "update:modelValue" to null)
        var props = normalizePropsOptions(utsMapOf("name" to utsMapOf("type" to "String", "required" to false), "modelValue" to utsMapOf("type" to "Array", "required" to false), "disabled" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "readonly" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "multiple" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "imageFit" to utsMapOf("type" to "String", "required" to true, "default" to "aspectFill"), "gutter" to utsMapOf("type" to "String", "required" to false), "column" to utsMapOf("type" to "Number", "required" to false), "max" to utsMapOf("type" to "Number", "required" to true, "default" to 0), "sizeLimit" to utsMapOf("type" to "Number", "required" to false), "uploadIcon" to utsMapOf("type" to "String", "required" to true, "default" to "camera"), "uploadIconSize" to utsMapOf("type" to "String", "required" to false), "gridWidth" to utsMapOf("type" to "String", "required" to false), "gridHeight" to utsMapOf("type" to "String", "required" to false), "gridBgColor" to utsMapOf("type" to "String", "required" to false), "addBgColor" to utsMapOf("type" to "String", "required" to false), "gridBorderRadius" to utsMapOf("type" to "String", "required" to false), "defaultFiles" to utsMapOf("type" to "Array", "required" to false), "loadingText" to utsMapOf("type" to "String", "required" to true, "default" to "上传中..."), "reloadText" to utsMapOf("type" to "String", "required" to true, "default" to "重新上传"), "failedText" to utsMapOf("type" to "String", "required" to true, "default" to "上传失败"), "disablePreview" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "autoUpload" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "mediaType" to utsMapOf("type" to "String", "required" to true, "default" to "image"), "maxDuration" to utsMapOf("type" to "Number", "required" to false), "sizeType" to utsMapOf("type" to "Array", "required" to true, "default" to utsArrayOf(
            "original",
            "compressed"
        )), "sourceType" to utsMapOf("type" to "Array", "required" to true, "default" to utsArrayOf(
            "album",
            "camera"
        )), "action" to utsMapOf("type" to "String", "required" to false), "headers" to utsMapOf("type" to "UTSJSONObject", "required" to false), "formData" to utsMapOf("type" to "UTSJSONObject", "required" to false), "mode" to utsMapOf("type" to "String", "required" to true, "default" to "grid")))
        var propsNeedCastKeys = utsArrayOf(
            "disabled",
            "readonly",
            "multiple",
            "imageFit",
            "max",
            "uploadIcon",
            "loadingText",
            "reloadText",
            "failedText",
            "disablePreview",
            "autoUpload",
            "mediaType",
            "sizeType",
            "sourceType",
            "mode"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
