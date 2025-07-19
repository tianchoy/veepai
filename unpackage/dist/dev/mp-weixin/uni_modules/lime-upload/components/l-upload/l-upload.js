"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
const uni_modules_limeUpload_components_lUpload_utils = require("./utils.js");
if (!Array) {
  const _easycom_l_loading_1 = common_vendor.resolveComponent("l-loading");
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  (_easycom_l_loading_1 + _easycom_l_icon_1)();
}
const _easycom_l_loading = () => "../../../lime-loading/components/l-loading/l-loading.js";
const _easycom_l_icon = () => "../../../lime-icon/components/l-icon/l-icon.js";
if (!Math) {
  (_easycom_l_loading + _easycom_l_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-upload",
  props: {
    name: {},
    modelValue: {},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    multiple: { type: Boolean, default: true },
    imageFit: { default: "aspectFill" },
    gutter: {},
    column: {},
    max: { default: 0 },
    sizeLimit: {},
    uploadIcon: { default: "camera" },
    uploadIconSize: {},
    gridWidth: {},
    gridHeight: {},
    gridBgColor: {},
    addBgColor: {},
    gridBorderRadius: {},
    defaultFiles: {},
    loadingText: { default: "上传中..." },
    reloadText: { default: "重新上传" },
    failedText: { default: "上传失败" },
    disablePreview: { type: Boolean, default: false },
    autoUpload: { type: Boolean, default: false },
    mediaType: { default: "image" },
    maxDuration: {},
    sizeType: { default: ["original", "compressed"] },
    sourceType: { default: ["album", "camera"] },
    action: {},
    headers: {},
    formData: {},
    mode: { default: "grid" }
  },
  emits: ["fail", "remove", "success", "click", "add", "update:modelValue"],
  setup(__props, _a) {
    var _b, _c, _d;
    var __expose = _a.expose, __emit = _a.emit;
    const formDisabled = common_vendor.inject("formDisabled", null);
    const formReadonly = common_vendor.inject("formReadonly", null);
    const emits = __emit;
    const props = __props;
    const isReadonly = common_vendor.computed(() => {
      var _a2;
      common_vendor.index.__f__("log", "at uni_modules/lime-upload/components/l-upload/l-upload.uvue:150", "isReadonly", props.readonly);
      if (props.readonly)
        return props.readonly;
      return (_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : false;
    });
    const isDisabled = common_vendor.computed(() => {
      var _a2;
      if (props.disabled)
        return props.disabled;
      return (_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : false;
    });
    const transformFiles = (it = null) => {
      var _a2, _b2;
      const file = new UTSJSONObject(Object.assign({}, it));
      return {
        url: (_a2 = file.getString("url")) !== null && _a2 !== void 0 ? _a2 : "",
        path: file.getString("path"),
        name: file.getString("name"),
        thumb: file.getString("thumb"),
        size: file.getNumber("size"),
        type: file.getString("type"),
        percent: file.getNumber("percent"),
        status: (_b2 = file.getString("status")) !== null && _b2 !== void 0 ? _b2 : "done"
      };
    };
    const customFiles = common_vendor.ref((_d = (_c = (_b = props.modelValue) !== null && _b !== void 0 ? _b : props.defaultFiles) === null || _c === void 0 ? null : _c.map(transformFiles)) !== null && _d !== void 0 ? _d : []);
    common_vendor.ref(0);
    const uploadRef = common_vendor.ref(null);
    const styles = common_vendor.computed(() => {
      var _a2;
      const style = /* @__PURE__ */ new Map();
      const gutter = uni_modules_limeShared_unitConvert_index.unitConvert((_a2 = props.gutter) !== null && _a2 !== void 0 ? _a2 : 8) / 2 * -1;
      style.set("margin-left", `${gutter}px`);
      style.set("margin-right", `${gutter}px`);
      style.set("margin-top", `${gutter}px`);
      return style;
    });
    const itemStyle = common_vendor.computed(() => {
      var _a2, _b2;
      const style = /* @__PURE__ */ new Map();
      uni_modules_limeShared_unitConvert_index.unitConvert((_a2 = props.gutter) !== null && _a2 !== void 0 ? _a2 : 8) / 2;
      let column = (_b2 = props.column) !== null && _b2 !== void 0 ? _b2 : 4;
      if (props.gridWidth != null || props.column != null) {
        if (props.gridWidth) {
          style.set("--l-upload-width", props.gridWidth);
        } else {
          style.set("width", `${100 / column}%`);
        }
      }
      return style;
    });
    const innerStyle = common_vendor.computed(() => {
      var _a2;
      const style = /* @__PURE__ */ new Map();
      const gutter = uni_modules_limeShared_unitConvert_index.unitConvert((_a2 = props.gutter) !== null && _a2 !== void 0 ? _a2 : 8) / 2;
      style.set("margin", `${gutter}px`);
      if (props.gridBgColor != null) {
        style.set("background", props.gridBgColor);
      }
      if (props.gridHeight != null) {
        style.set("height", props.gridHeight);
      }
      return style;
    });
    const onFileClick = (index) => {
      const file = customFiles.value[index];
      emits("click", new UTSJSONObject({ file }));
    };
    const onProofTap = (index) => {
      onFileClick(index);
      if (props.disablePreview)
        return null;
      common_vendor.index.previewImage({
        urls: customFiles.value.filter((file) => {
          return file.percent != -1;
        }).map((file) => {
          return file.url;
        }),
        current: index
      });
    };
    const onDelete = (index) => {
      if (isDisabled.value || isReadonly.value)
        return null;
      const delFile = customFiles.value[index];
      customFiles.value = customFiles.value.filter((file, i) => {
        return index != i;
      });
      emits("remove", new UTSJSONObject({ index, file: delFile }));
    };
    let last;
    const upload = (files) => {
      if (!props.autoUpload || props.action == null || props.action.length < 5)
        return null;
      if (props.action == "uniCloud") {
        let uploadImgs = [];
        files.forEach((file, index) => {
          const promise = new Promise((resolve, reject) => {
            const dotIndex = file.name.lastIndexOf(".");
            const baseName = file.name.substring(0, dotIndex);
            const extension = file.name.substring(dotIndex);
            const timestamp = Date.now();
            common_vendor.er.uploadFile({
              filePath: file.url,
              cloudPath: `${baseName}_${timestamp}${extension}`,
              // cloudPath: file.name!.substring(file.name!.lastIndexOf('.')),
              onUploadProgress: (res) => {
                file.status = "loading";
                file.percent = Math.floor(res.loaded / res.total * 100);
              }
            }).then((res) => {
              file.path = res.fileID;
              file.status = "done";
              common_vendor.er.getTempFileURL({
                fileList: [res.fileID]
              }).then((result) => {
                if (result.fileList.length > 0) {
                  file.url = result.fileList[0].tempFileURL;
                }
                resolve(res);
              }).catch((error = null) => {
                common_vendor.index.__f__("error", "at uni_modules/lime-upload/components/l-upload/l-upload.uvue:296", "获取临时URL失败", error);
                resolve(res);
              });
            }).catch((err = null) => {
              file.status = "failed";
              reject(err);
            });
          });
          uploadImgs.push(promise);
        });
        Promise.all(uploadImgs).then((res) => {
          emits("success", res);
        }).catch((err = null) => {
          emits("fail", err);
        });
      } else {
        let uploadImgs = [];
        files.forEach((file, index) => {
          const promise = new Promise((resolve, reject) => {
            const task = common_vendor.index.uploadFile({
              url: props.action,
              filePath: file.url,
              name: file.name,
              formData: props.formData,
              header: props.headers,
              success: (res) => {
                file.status = "done";
                if (res.statusCode == 200) {
                  if (typeof res.data == "string") {
                    try {
                      const data = UTS.JSON.parse(res.data, UTSJSONObject);
                      const url = data === null || data === void 0 ? null : data.getString("url");
                      if (url != null) {
                        file.path = url;
                      }
                    } catch (e) {
                    }
                  }
                }
                resolve(res);
              },
              fail(err) {
                file.status = "failed";
                reject(err);
              }
            });
            task.onProgressUpdate((res) => {
              file.status = "loading";
              file.percent = res.progress;
            });
          });
          uploadImgs.push(promise);
        });
        Promise.all(uploadImgs).then((res) => {
          emits("success", res);
        }).catch((err = null) => {
          emits("fail", err);
        });
      }
    };
    const customLimit = common_vendor.computed(() => {
      return props.max == 0 ? 20 : props.max - customFiles.value.length;
    });
    const onAddTap = () => {
      if (isDisabled.value || isReadonly.value)
        return null;
      uni_modules_limeUpload_components_lUpload_utils.chooseFiles({
        mediaType: props.mediaType,
        count: customLimit.value,
        sourceType: props.sourceType,
        sizeType: props.sizeType,
        sizeLimit: props.sizeLimit
      }).then((files) => {
        last = customFiles.value.length;
        customFiles.value = customFiles.value.concat(files);
        const _files = customFiles.value.filter((it, i) => {
          return i > last - 1;
        });
        upload(_files);
        emits("add", _files);
      });
    };
    const stop = common_vendor.watch(customFiles, (v) => {
      emits("update:modelValue", v);
    });
    common_vendor.watch(() => {
      return props.modelValue;
    }, (v = null) => {
      if (v != null && v.length != customFiles.value.length) {
        customFiles.value = v.map(transformFiles);
      }
    });
    __expose(new UTSJSONObject({
      remove: onDelete
    }));
    common_vendor.onUnmounted(() => {
      stop();
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.f(common_vendor.unref(customFiles), (file = null, index = null, i0 = null) => {
          return common_vendor.e(new UTSJSONObject({
            a: file.type == "image"
          }), file.type == "image" ? new UTSJSONObject({
            b: file.url,
            c: file,
            d: _ctx.imageFit,
            e: common_vendor.o(($event = null) => {
              return onProofTap(index);
            }, file.url)
          }) : new UTSJSONObject({}), new UTSJSONObject({
            f: file.type == "video"
          }), file.type == "video" ? new UTSJSONObject({
            g: file.url,
            h: file,
            i: common_vendor.o(($event = null) => {
              return onFileClick(index);
            }, file.url)
          }) : new UTSJSONObject({}), new UTSJSONObject({
            j: file.status != null && file.status != "done"
          }), file.status != null && file.status != "done" ? common_vendor.e(new UTSJSONObject({
            k: file.status == "loading"
          }), file.status == "loading" ? common_vendor.e(new UTSJSONObject({
            l: "74b9d9e1-0-" + i0,
            m: common_vendor.p(new UTSJSONObject({
              size: "24px",
              color: "white"
            })),
            n: file.percent != null
          }), file.percent != null ? new UTSJSONObject({
            o: common_vendor.t(file.percent)
          }) : new UTSJSONObject({
            p: common_vendor.t(_ctx.loadingText)
          })) : new UTSJSONObject({
            q: "74b9d9e1-1-" + i0,
            r: common_vendor.p(new UTSJSONObject({
              name: file.status == "reload" ? "refresh" : "close-circle",
              size: "48rpx",
              ["aria-hidden"]: true
            }))
          }), new UTSJSONObject({
            s: file.status == "reload" || file.status == "failed"
          }), file.status == "reload" || file.status == "failed" ? new UTSJSONObject({
            t: common_vendor.t(file.status == "reload" ? _ctx.reloadText : _ctx.failedText)
          }) : new UTSJSONObject({}), new UTSJSONObject({
            v: file,
            w: common_vendor.o(($event = null) => {
              return onFileClick(index);
            }, file.url)
          })) : new UTSJSONObject({}), !common_vendor.unref(isReadonly) ? new UTSJSONObject({
            x: "74b9d9e1-2-" + i0,
            y: common_vendor.p(new UTSJSONObject({
              name: "close",
              size: "16px",
              color: "#fff"
            })),
            z: index,
            A: common_vendor.o(($event = null) => {
              return onDelete(index);
            }, file.url)
          }) : new UTSJSONObject({}), new UTSJSONObject({
            B: "file-" + i0,
            C: common_vendor.r("file", new UTSJSONObject({
              file,
              index
            }), i0),
            D: file.url
          }));
        }),
        b: !common_vendor.unref(isReadonly),
        c: common_vendor.s(common_vendor.unref(innerStyle)),
        d: common_vendor.s(common_vendor.unref(itemStyle)),
        e: !common_vendor.unref(isReadonly)
      }), !common_vendor.unref(isReadonly) ? new UTSJSONObject({
        f: common_vendor.p(new UTSJSONObject({
          size: _ctx.uploadIconSize,
          name: _ctx.uploadIcon
        })),
        g: common_vendor.s(common_vendor.unref(innerStyle)),
        h: common_vendor.s(_ctx.addBgColor != null ? new UTSJSONObject({
          background: _ctx.addBgColor
        }) : ""),
        i: common_vendor.unref(isDisabled) ? 1 : "",
        j: !_ctx.multiple ? common_vendor.unref(customFiles).length == 0 : _ctx.max == 0 || common_vendor.unref(customFiles).length != _ctx.max,
        k: common_vendor.s(common_vendor.unref(itemStyle)),
        l: common_vendor.o(onAddTap)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        m: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-74b9d9e1"), "view", uploadRef, new UTSJSONObject({
          "k": "uploadRef"
        })),
        n: common_vendor.s(common_vendor.unref(styles))
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-upload/components/l-upload/l-upload.js.map
