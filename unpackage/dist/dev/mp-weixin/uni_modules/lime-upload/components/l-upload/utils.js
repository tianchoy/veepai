"use strict";
const common_vendor = require("../../../../common/vendor.js");
function getFileType(tempFilePath, fileType) {
  if (fileType != null)
    return fileType.replace(/\/.+/, "");
  const videoType = ["avi", "wmv", "mkv", "mp4", "mov", "rm", "3gp", "flv", "mpg", "rmvb"];
  const temp = tempFilePath.split(".");
  const postfix = temp[temp.length - 1];
  if (videoType.includes(postfix.toLocaleLowerCase())) {
    return "video";
  }
  return "image";
}
function getFileName(filePath) {
  return filePath.substring(filePath.lastIndexOf("/") + 1);
}
const isOverSize = (size, sizeLimit) => {
  if (sizeLimit == null)
    return false;
  const base = 1e3;
  const computedSize = sizeLimit * base;
  return size > computedSize;
};
function chooseImage(opts) {
  common_vendor.index.chooseMedia(Object.assign(Object.assign({}, opts), { mediaType: ["image"] }));
}
function chooseVideo(opts) {
  var _a;
  common_vendor.index.chooseMedia(Object.assign(Object.assign({}, opts), { mediaType: ["video"], maxDuration: (_a = opts.maxDuration) !== null && _a !== void 0 ? _a : 10 }));
}
function chooseMedia(opts) {
  try {
    common_vendor.index.chooseMedia(Object.assign(Object.assign({}, opts), { mediaType: ["image", "video"] }));
  } catch (error) {
    common_vendor.index.__f__("error", "at uni_modules/lime-upload/components/l-upload/utils.ts:131", "error", error);
    common_vendor.index.chooseImage(opts);
  }
}
function chooseAll(opts) {
  common_vendor.index.chooseMessageFile(Object.assign(Object.assign({}, opts), { type: "all" }));
}
function normalizeChooseFiles(type, tempFiles, tempFilePaths, sizeLimit, oversize) {
  const files = [];
  tempFiles.forEach((temp, index) => {
    var _a, _b, _c, _d;
    const tempFilePath = (_a = temp["tempFilePath"]) !== null && _a !== void 0 ? _a : tempFilePaths[index];
    const name = (_b = temp["name"]) !== null && _b !== void 0 ? _b : getFileName(tempFilePath);
    const size = (_c = temp["size"]) !== null && _c !== void 0 ? _c : 0;
    const width = temp["width"];
    const height = temp["height"];
    const duration = temp["duration"];
    const path = (_d = temp["path"]) !== null && _d !== void 0 ? _d : tempFilePath;
    const thumb = temp["thumbTempFilePath"];
    const _type = type == "all" ? getFileType(tempFilePath, temp["type"]) : type;
    if (isOverSize(size, sizeLimit)) {
      oversize === null || oversize === void 0 ? void 0 : oversize(temp);
      return;
    }
    files.push({
      name,
      type: _type,
      url: path,
      path,
      size,
      width,
      height,
      duration,
      thumb,
      percent: 0
      // status: 'done'
    });
  });
  return files;
}
function chooseFiles(opts) {
  return new Promise((resolve, reject) => {
    var _a, _b;
    if (opts.mediaType == "image") {
      chooseImage({
        count: opts.count,
        mediaType: opts.mediaType,
        sizeType: opts.sizeType,
        sourceType: opts.sourceType,
        success(result) {
          var _a2;
          const res = result;
          const tempFiles = res.tempFiles;
          const tempFilePaths = (_a2 = res.tempFilePaths) !== null && _a2 !== void 0 ? _a2 : [];
          const files = normalizeChooseFiles("image", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
          resolve(files);
        }
      });
    } else if (opts.mediaType == "video") {
      chooseVideo({
        count: opts.count,
        mediaType: opts.mediaType,
        sourceType: opts.sourceType,
        sizeType: opts.sizeType,
        maxDuration: opts.maxDuration,
        success(result) {
          var _a2, _b2;
          const res = result;
          const tempFilePaths = (_a2 = res.tempFilePaths) !== null && _a2 !== void 0 ? _a2 : [res.tempFilePath];
          const tempFiles = (_b2 = res.tempFiles) !== null && _b2 !== void 0 ? _b2 : [res.tempFile];
          const files = normalizeChooseFiles("video", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
          resolve(files);
        }
      });
    } else if (opts.mediaType == "media") {
      chooseMedia({
        count: opts.count,
        mediaType: "media",
        sourceType: opts.sourceType,
        maxDuration: (_a = opts.maxDuration) !== null && _a !== void 0 ? _a : 10,
        camera: (_b = opts.camera) !== null && _b !== void 0 ? _b : "back",
        sizeType: opts.sizeType,
        success(result) {
          const res = result;
          const tempFilePaths = res.tempFilePaths ? res.tempFilePaths : res.tempFiles.map((it) => {
            return it.tempFilePath;
          });
          const tempFiles = res.tempFiles;
          const files = normalizeChooseFiles("all", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
          resolve(files);
        }
      });
    } else {
      chooseAll({
        count: opts.count,
        mediaType: opts.mediaType,
        sourceType: opts.sourceType,
        sizeType: opts.sizeType,
        success(result) {
          const res = result;
          const tempFilePaths = res.tempFiles;
          const tempFiles = res.tempFiles;
          const files = normalizeChooseFiles("all", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
          resolve(files);
        }
      });
    }
  });
}
exports.chooseFiles = chooseFiles;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-upload/components/l-upload/utils.js.map
