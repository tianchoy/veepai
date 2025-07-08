"use strict";
class SetClipboardDataOption extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          showToast: { type: Boolean, optional: true },
          data: { type: String, optional: false },
          complete: { type: "Unknown", optional: true },
          fail: { type: "Unknown", optional: true },
          success: { type: "Unknown", optional: true }
        };
      },
      name: "SetClipboardDataOption"
    };
  }
  constructor(options, metadata = SetClipboardDataOption.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.showToast = this.__props__.showToast;
    this.data = this.__props__.data;
    this.complete = this.__props__.complete;
    this.fail = this.__props__.fail;
    this.success = this.__props__.success;
    delete this.__props__;
  }
}
class GetClipboardDataSuccessCallbackOption extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          data: { type: String, optional: false },
          errMsg: { type: String, optional: false }
        };
      },
      name: "GetClipboardDataSuccessCallbackOption"
    };
  }
  constructor(options, metadata = GetClipboardDataSuccessCallbackOption.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.data = this.__props__.data;
    this.errMsg = this.__props__.errMsg;
    delete this.__props__;
  }
}
class GetClipboardDataOption extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          complete: { type: "Unknown", optional: true },
          fail: { type: "Unknown", optional: true },
          success: { type: "Unknown", optional: true }
        };
      },
      name: "GetClipboardDataOption"
    };
  }
  constructor(options, metadata = GetClipboardDataOption.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.complete = this.__props__.complete;
    this.fail = this.__props__.fail;
    this.success = this.__props__.success;
    delete this.__props__;
  }
}
exports.SetClipboardDataOption = SetClipboardDataOption;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/lime-clipboard/utssdk/interface.js.map
