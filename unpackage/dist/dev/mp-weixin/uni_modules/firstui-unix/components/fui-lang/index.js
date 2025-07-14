"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_cn = require("./lang/cn.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_tc = require("./lang/tc.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_en = require("./lang/en.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_th = require("./lang/th.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_ru = require("./lang/ru.js");
const uni_modules_firstuiUnix_components_fuiLang_lang_ar = require("./lang/ar.js");
class FuiLocaleLangParam extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          locale: { type: String, optional: false },
          messages: { type: "Unknown", optional: false }
        };
      },
      name: "FuiLocaleLangParam"
    };
  }
  constructor(options, metadata = FuiLocaleLangParam.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.locale = this.__props__.locale;
    this.messages = this.__props__.messages;
    delete this.__props__;
  }
}
const fuiLang = common_vendor.reactive(new FuiLocaleLangParam({
  // 指定语言类型：cn、tc、en、th、ru、ar ...
  locale: "",
  // 将语言包加入到globalData数据里
  messages: new UTSJSONObject({
    // 简体中文
    cn: uni_modules_firstuiUnix_components_fuiLang_lang_cn.cn,
    // 繁体中文（Traditional Chinese 传统中文)
    tc: uni_modules_firstuiUnix_components_fuiLang_lang_tc.tc,
    // 美国英语
    en: uni_modules_firstuiUnix_components_fuiLang_lang_en.en,
    //泰语
    th: uni_modules_firstuiUnix_components_fuiLang_lang_th.th,
    //俄语
    ru: uni_modules_firstuiUnix_components_fuiLang_lang_ru.ru,
    // 阿拉伯语
    ar: uni_modules_firstuiUnix_components_fuiLang_lang_ar.ar
  })
}));
const getFuiLocaleLang = (locale = null) => {
  let initLangData;
  if (locale != null && locale != "") {
    initLangData = fuiLang.messages[locale];
  } else {
    let key = common_vendor.index.getStorageSync("fui_locale_lang");
    if (key == null || key == "") {
      key = fuiLang.locale == "" ? "cn" : fuiLang.locale;
    }
    initLangData = fuiLang.messages[key];
  }
  return initLangData;
};
exports.fuiLang = fuiLang;
exports.getFuiLocaleLang = getFuiLocaleLang;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-lang/index.js.map
