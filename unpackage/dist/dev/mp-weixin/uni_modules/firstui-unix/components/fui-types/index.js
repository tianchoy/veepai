"use strict";
/*!
* type：组件内props属性参数、事件回调参数、方法参数类型
* fui-types - v1.0.0 (2023/11/11, 11:07:14 AM)
*
* 注意：当页面使用时，Object、Array等类型使用any接收，暂时需要转化为UTSJSONObject使用，不可直接使用“.”访问属性
* @example：const param  = JSON.parse(JSON.stringify(e)) as UTSJSONObject
* 在 uts 中，只适合转 type，不适合使用 interface。[interface 中使用? 编译报错，需要使用 type]
*
* 官网地址：https://firstui.cn/
* 文档地址：https://unix.firstui.cn/
*/
class FuiTextClickParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          param: { type: String, optional: false }
        };
      },
      name: "FuiTextClickParam"
    };
  }
  constructor(options, metadata = FuiTextClickParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.param = this.__props__.param;
    delete this.__props__;
  }
}
class FuiNumberClickParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          param: { type: String, optional: false }
        };
      },
      name: "FuiNumberClickParam"
    };
  }
  constructor(options, metadata = FuiNumberClickParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.param = this.__props__.param;
    delete this.__props__;
  }
}
class FuiFooterNavigateParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          url: { type: String, optional: true },
          openType: { type: String, optional: true },
          delta: { type: Number, optional: true },
          color: { type: String, optional: true },
          size: { type: Number, optional: true }
        };
      },
      name: "FuiFooterNavigateParam"
    };
  }
  constructor(options, metadata = FuiFooterNavigateParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.url = this.__props__.url;
    this.openType = this.__props__.openType;
    this.delta = this.__props__.delta;
    this.color = this.__props__.color;
    this.size = this.__props__.size;
    delete this.__props__;
  }
}
class FuiInputNumberChangeParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          value: { type: Number, optional: false },
          index: { type: Number, optional: false },
          param: { type: String, optional: false }
        };
      },
      name: "FuiInputNumberChangeParam"
    };
  }
  constructor(options, metadata = FuiInputNumberChangeParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.value = this.__props__.value;
    this.index = this.__props__.index;
    this.param = this.__props__.param;
    delete this.__props__;
  }
}
class FuiCheckboxChangeParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          checked: { type: Boolean, optional: false },
          value: { type: String, optional: false }
        };
      },
      name: "FuiCheckboxChangeParam"
    };
  }
  constructor(options, metadata = FuiCheckboxChangeParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.checked = this.__props__.checked;
    this.value = this.__props__.value;
    delete this.__props__;
  }
}
class FuiActionSheetItemParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          color: { type: String, optional: true },
          darkColor: { type: String, optional: true },
          param: { type: String, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiActionSheetItemParam"
    };
  }
  constructor(options, metadata = FuiActionSheetItemParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.color = this.__props__.color;
    this.darkColor = this.__props__.darkColor;
    this.param = this.__props__.param;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiToastShowParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          duration: { type: Number, optional: true },
          src: { type: String, optional: true },
          text: { type: String, optional: true }
        };
      },
      name: "FuiToastShowParam"
    };
  }
  constructor(options, metadata = FuiToastShowParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.duration = this.__props__.duration;
    this.src = this.__props__.src;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
class FuiDialogButtonsParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          color: { type: String, optional: true },
          primary: { type: Boolean, optional: true },
          param: { type: String, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiDialogButtonsParam"
    };
  }
  constructor(options, metadata = FuiDialogButtonsParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.color = this.__props__.color;
    this.primary = this.__props__.primary;
    this.param = this.__props__.param;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiDropdownMenuOptionParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          value: { type: String, optional: true },
          src: { type: String, optional: true },
          checked: { type: Boolean, optional: true },
          disabled: { type: Boolean, optional: true },
          param: { type: String, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiDropdownMenuOptionParam"
    };
  }
  constructor(options, metadata = FuiDropdownMenuOptionParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.value = this.__props__.value;
    this.src = this.__props__.src;
    this.checked = this.__props__.checked;
    this.disabled = this.__props__.disabled;
    this.param = this.__props__.param;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiSwipeActionButtonParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          text: { type: String, optional: false },
          background: { type: String, optional: true },
          size: { type: Number, optional: true },
          color: { type: String, optional: true },
          param: { type: Number, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiSwipeActionButtonParam"
    };
  }
  constructor(options, metadata = FuiSwipeActionButtonParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.text = this.__props__.text;
    this.background = this.__props__.background;
    this.size = this.__props__.size;
    this.color = this.__props__.color;
    this.param = this.__props__.param;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiPaginationChangeParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          type: { type: String, optional: false },
          current: { type: Number, optional: false }
        };
      },
      name: "FuiPaginationChangeParam"
    };
  }
  constructor(options, metadata = FuiPaginationChangeParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.type = this.__props__.type;
    this.current = this.__props__.current;
    delete this.__props__;
  }
}
class FuiSegmentedControlValueParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          disabled: { type: Boolean, optional: true },
          value: { type: Number, optional: true },
          param: { type: String, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiSegmentedControlValueParam"
    };
  }
  constructor(options, metadata = FuiSegmentedControlValueParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.disabled = this.__props__.disabled;
    this.value = this.__props__.value;
    this.param = this.__props__.param;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiTabsItemParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          icon: { type: String, optional: true },
          selectedIcon: { type: String, optional: true },
          badge: { type: Number, optional: true },
          isDot: { type: Boolean, optional: true },
          disabled: { type: Boolean, optional: true },
          index: { type: Number, optional: true }
        };
      },
      name: "FuiTabsItemParam"
    };
  }
  constructor(options, metadata = FuiTabsItemParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.icon = this.__props__.icon;
    this.selectedIcon = this.__props__.selectedIcon;
    this.badge = this.__props__.badge;
    this.isDot = this.__props__.isDot;
    this.disabled = this.__props__.disabled;
    this.index = this.__props__.index;
    delete this.__props__;
  }
}
class FuiCollapseChangeParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          index: { type: Number, optional: false },
          isOpen: { type: Boolean, optional: false }
        };
      },
      name: "FuiCollapseChangeParam"
    };
  }
  constructor(options, metadata = FuiCollapseChangeParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.index = this.__props__.index;
    this.isOpen = this.__props__.isOpen;
    delete this.__props__;
  }
}
class FuiFormRulesValidatorParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          msg: { type: String, optional: false },
          method: { type: "Unknown", optional: false }
        };
      },
      name: "FuiFormRulesValidatorParam"
    };
  }
  constructor(options, metadata = FuiFormRulesValidatorParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.msg = this.__props__.msg;
    this.method = this.__props__.method;
    delete this.__props__;
  }
}
class FuiFormRulesParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          rule: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
          msg: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
          validator: { type: UTS.UTSType.withGenerics(Array, [FuiFormRulesValidatorParam]), optional: true }
        };
      },
      name: "FuiFormRulesParam"
    };
  }
  constructor(options, metadata = FuiFormRulesParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.rule = this.__props__.rule;
    this.msg = this.__props__.msg;
    this.validator = this.__props__.validator;
    delete this.__props__;
  }
}
class FuiFormErrorMsgParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          msg: { type: String, optional: false }
        };
      },
      name: "FuiFormErrorMsgParam"
    };
  }
  constructor(options, metadata = FuiFormErrorMsgParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.msg = this.__props__.msg;
    delete this.__props__;
  }
}
class FuiFormValidatorResParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          isPassed: { type: Boolean, optional: false },
          errorMsg: { type: UTS.UTSType.withGenerics(Array, [FuiFormErrorMsgParam]), optional: false }
        };
      },
      name: "FuiFormValidatorResParam"
    };
  }
  constructor(options, metadata = FuiFormValidatorResParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.isPassed = this.__props__.isPassed;
    this.errorMsg = this.__props__.errorMsg;
    delete this.__props__;
  }
}
exports.FuiCheckboxChangeParam = FuiCheckboxChangeParam;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-types/index.js.map
