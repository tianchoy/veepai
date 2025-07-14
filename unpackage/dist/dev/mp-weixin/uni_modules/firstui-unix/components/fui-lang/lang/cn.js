"use strict";
const cn = new UTSJSONObject({
  /* ActionSheet 上拉菜单组件*/
  actionsheet: new UTSJSONObject({
    cancel: "取消"
  }),
  /* Dialog 对话框组件 */
  dialog: new UTSJSONObject({
    /* 标题 */
    title: "提示",
    /* 取消按钮文本 */
    cancel: "取消",
    /* 确定按钮文本 */
    confirm: "确定"
  }),
  /* SwipeAction 滑动菜单 */
  swipeaction: new UTSJSONObject({
    /* 默认数据删除按钮文本 */
    delete: "删除"
  }),
  /* Loading 加载 */
  loading: new UTSJSONObject({
    /* 默认数据删除按钮文本 */
    text: "加载中"
  }),
  /* Pagination 分页器 */
  pagination: new UTSJSONObject({
    /* 上一页按钮显示文本 */
    prevText: "上一页",
    /* 下一页按钮显示文本 */
    nextText: "下一页"
  }),
  /* LoadMore 加载更多 */
  loadmore: new UTSJSONObject({
    /* 状态1提示文字 */
    initText: "上拉加载",
    /* 状态2提示文字 */
    text: "正在加载...",
    /* 状态3提示文字 */
    noneText: "没有更多了"
  })
});
exports.cn = cn;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-lang/lang/cn.js.map
