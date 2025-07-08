"use strict";
function characterLimit(type, char, max) {
  const str = `${char}`;
  if (str.length == 0) {
    return {
      length: 0,
      characters: ""
    };
  }
  if (type == "maxcharacter") {
    let len = 0;
    for (let i = 0; i < str.length; i += 1) {
      let currentStringLength;
      const code = str.charCodeAt(i);
      if (code > 127 || code == 94) {
        currentStringLength = 2;
      } else {
        currentStringLength = 1;
      }
      if (len + currentStringLength > max) {
        return {
          length: len,
          characters: str.slice(0, i)
        };
      }
      len += currentStringLength;
    }
    return {
      length: len,
      characters: str
    };
  } else if (type == "maxlength") {
    const length_1 = str.length > max ? max : str.length;
    return {
      length: length_1,
      characters: str.slice(0, length_1)
    };
  }
  return {
    length: str.length,
    characters: str
  };
}
exports.characterLimit = characterLimit;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/lime-shared/characterLimit/index.js.map
