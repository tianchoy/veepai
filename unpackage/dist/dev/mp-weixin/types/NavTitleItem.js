"use strict";
class NavTitleItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          isCurrent: { type: Boolean, optional: false },
          url: { type: String, optional: false }
        };
      },
      name: "NavTitleItem"
    };
  }
  constructor(options, metadata = NavTitleItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.isCurrent = this.__props__.isCurrent;
    this.url = this.__props__.url;
    delete this.__props__;
  }
}
exports.NavTitleItem = NavTitleItem;
//# sourceMappingURL=../../.sourcemap/mp-weixin/types/NavTitleItem.js.map
