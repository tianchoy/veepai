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
            val customFiles = ref<UTSArray<UploadFile>>((props.modelValue ?: props.defaultFiles)?.map(transformFiles) ?: _uA())
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
                emits("click", _uO("file" to file))
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
                emits("remove", _uO("index" to index, "file" to delFile))
            }
            var last: Number
            val upload = fun(files: UTSArray<UploadFile>){
                if (!props.autoUpload || props.action == null || props.action!!.length < 5) {
                    return
                }
                if (props.action == "uniCloud") {
                    var uploadImgs: UTSArray<UTSPromise<UniCloudUploadFileResult>> = _uA()
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
                                uniCloud.getTempFileURL(UniCloudGetTempFileURLOptions(fileList = _uA(
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
                    var uploadImgs: UTSArray<UTSPromise<UploadFileSuccess>> = _uA()
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
            __expose(_uM("remove" to onDelete))
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
                return _cE("view", _uM("class" to "l-upload", "ref_key" to "uploadRef", "ref" to uploadRef, "style" to _nS(unref(styles))), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(unref(customFiles), fun(file, index, __index, _cached): Any {
                        return _cE("view", _uM("class" to "l-upload__item", "style" to _nS(_uA(
                            unref(itemStyle)
                        )), "key" to file.url), _uA(
                            renderSlot(_ctx.`$slots`, "file", GenUniModulesLimeUploadComponentsLUploadLUploadSlotDataFile(file = file, index = index), fun(): UTSArray<Any> {
                                return _uA(
                                    if (file.type == "image") {
                                        _cE("image", _uM("key" to 0, "class" to "l-upload__image", "src" to file.url, "data-file" to file, "mode" to _ctx.imageFit, "onClick" to fun(){
                                            onProofTap(index)
                                        }), null, 8, _uA(
                                            "src",
                                            "data-file",
                                            "mode",
                                            "onClick"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                    ,
                                    if (file.type == "video") {
                                        _cE("video", _uM("key" to 1, "class" to "l-upload__image", "src" to file.url, "data-file" to file, "autoplay" to false, "objectFit" to "contain", "onClick" to fun(){
                                            onFileClick(index)
                                        }), null, 8, _uA(
                                            "src",
                                            "data-file",
                                            "onClick"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                    ,
                                    if (isTrue(file.status != null && file.status != "done")) {
                                        _cE("view", _uM("key" to 2, "class" to "l-upload__progress-mask", "data-file" to file, "onClick" to fun(){
                                            onFileClick(index)
                                        }), _uA(
                                            if (file.status == "loading") {
                                                _cE(Fragment, _uM("key" to 0), _uA(
                                                    _cV(_component_l_loading, _uM("class" to "l-upload__progress-loading", "size" to "24px", "color" to "white")),
                                                    if (file.percent != null) {
                                                        _cE("text", _uM("key" to 0, "class" to "l-upload__progress-text"), _tD(file.percent) + "%", 1)
                                                    } else {
                                                        _cE("text", _uM("key" to 1, "class" to "l-upload__progress-text"), _tD(_ctx.loadingText), 1)
                                                    }
                                                ), 64)
                                            } else {
                                                _cV(_component_l_icon, _uM("key" to 1, "class" to "l-upload__progress-icon", "name" to if (file.status == "reload") {
                                                    "refresh"
                                                } else {
                                                    "close-circle"
                                                }, "size" to "48rpx", "aria-hidden" to ""), null, 8, _uA(
                                                    "name"
                                                ))
                                            },
                                            if (isTrue(file.status == "reload" || file.status == "failed")) {
                                                _cE("text", _uM("key" to 2, "class" to "l-upload__progress-text"), _tD(if (file.status == "reload") {
                                                    _ctx.reloadText
                                                } else {
                                                    _ctx.failedText
                                                }), 1)
                                            } else {
                                                _cC("v-if", true)
                                            }
                                        ), 8, _uA(
                                            "data-file",
                                            "onClick"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                    ,
                                    if (isTrue(!unref(isReadonly))) {
                                        _cE("view", _uM("key" to 3, "class" to "l-upload__delete-btn", "aria-role" to "button", "aria-label" to "删除", "data-index" to index, "onClick" to fun(){
                                            onDelete(index)
                                        }), _uA(
                                            _cV(_component_l_icon, _uM("name" to "close", "size" to "16px", "color" to "#fff"))
                                        ), 8, _uA(
                                            "data-index",
                                            "onClick"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                )
                            }
                            )
                        ), 4)
                    }
                    ), 128),
                    if (isTrue(!unref(isReadonly))) {
                        withDirectives(_cE("view", _uM("key" to 0, "class" to _nC(_uA(
                            "l-upload__item l-upload__item--add",
                            _uM("l-upload__item--disabled" to unref(isDisabled))
                        )), "style" to _nS(_uA(
                            unref(itemStyle),
                            if (_ctx.addBgColor != null) {
                                _uM("background" to _ctx.addBgColor)
                            } else {
                                ""
                            }
                        )), "aria-label" to "上传", "onClick" to onAddTap), _uA(
                            renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    _cV(_component_l_icon, _uM("class" to "l-upload__add-icon", "size" to _ctx.uploadIconSize, "name" to _ctx.uploadIcon), null, 8, _uA(
                                        "size",
                                        "name"
                                    ))
                                )
                            })
                        ), 6), _uA(
                            _uA(
                                vShow,
                                if (!_ctx.multiple) {
                                    unref(customFiles).length == 0
                                } else {
                                    _ctx.max == 0 || unref(customFiles).length != _ctx.max
                                }
                            )
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 4)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-upload" to _pS(_uM("flex" to 1, "position" to "relative", "flexDirection" to "row", "flexWrap" to "wrap")), "l-upload__item" to _pS(_uM("position" to "relative", "display" to "flex", "width" to 80, "height" to 80, "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "overflow" to "hidden", "alignItems" to "center", "justifyContent" to "center")), "l-upload__item--add" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "#f3f3f3")), "l-upload__item--disabled" to _pS(_uM("opacity" to 0.5)), "l-upload__image" to _pS(_uM("width" to "100%", "height" to "100%")), "l-upload__add-icon" to _pS(_uM("fontSize" to 28, "color" to "rgba(0,0,0,0.25)")), "l-upload__delete-btn" to _pS(_uM("position" to "absolute", "top" to 0, "right" to 0, "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "width" to 20, "height" to 20, "borderTopRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "backgroundColor" to "rgba(0,0,0,0.65)")), "l-upload__progress-mask" to _pS(_uM("position" to "absolute", "left" to 0, "top" to 0, "bottom" to 0, "width" to "100%", "backgroundColor" to "rgba(0,0,0,0.45)", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "paddingTop" to 16, "paddingRight" to 0, "paddingBottom" to 16, "paddingLeft" to 0)), "l-upload__progress-text" to _pS(_uM("fontSize" to 12, "lineHeight" to "20px", "marginTop" to 4, "color" to "#FFFFFF")), "l-upload__progress-loading" to _pS(_uM("alignSelf" to "center")), "l-upload__progress-icon" to _pS(_uM("color" to "#FFFFFF", "!fontSize" to 24, "!width" to 24)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("fail" to null, "remove" to null, "success" to null, "click" to null, "add" to null, "update:modelValue" to null)
        var props = _nP(_uM("name" to _uM("type" to "String", "required" to false), "modelValue" to _uM("type" to "Array", "required" to false), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "readonly" to _uM("type" to "Boolean", "required" to true, "default" to false), "multiple" to _uM("type" to "Boolean", "required" to true, "default" to true), "imageFit" to _uM("type" to "String", "required" to true, "default" to "aspectFill"), "gutter" to _uM("type" to "String", "required" to false), "column" to _uM("type" to "Number", "required" to false), "max" to _uM("type" to "Number", "required" to true, "default" to 0), "sizeLimit" to _uM("type" to "Number", "required" to false), "uploadIcon" to _uM("type" to "String", "required" to true, "default" to "camera"), "uploadIconSize" to _uM("type" to "String", "required" to false), "gridWidth" to _uM("type" to "String", "required" to false), "gridHeight" to _uM("type" to "String", "required" to false), "gridBgColor" to _uM("type" to "String", "required" to false), "addBgColor" to _uM("type" to "String", "required" to false), "gridBorderRadius" to _uM("type" to "String", "required" to false), "defaultFiles" to _uM("type" to "Array", "required" to false), "loadingText" to _uM("type" to "String", "required" to true, "default" to "上传中..."), "reloadText" to _uM("type" to "String", "required" to true, "default" to "重新上传"), "failedText" to _uM("type" to "String", "required" to true, "default" to "上传失败"), "disablePreview" to _uM("type" to "Boolean", "required" to true, "default" to false), "autoUpload" to _uM("type" to "Boolean", "required" to true, "default" to false), "mediaType" to _uM("type" to "String", "required" to true, "default" to "image"), "maxDuration" to _uM("type" to "Number", "required" to false), "sizeType" to _uM("type" to "Array", "required" to true, "default" to _uA(
            "original",
            "compressed"
        )), "sourceType" to _uM("type" to "Array", "required" to true, "default" to _uA(
            "album",
            "camera"
        )), "action" to _uM("type" to "String", "required" to false), "headers" to _uM("type" to "UTSJSONObject", "required" to false), "formData" to _uM("type" to "UTSJSONObject", "required" to false), "mode" to _uM("type" to "String", "required" to true, "default" to "grid")))
        var propsNeedCastKeys = _uA(
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
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
