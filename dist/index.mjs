var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/Document.ts
import { create } from "xmlbuilder2";

// src/enums/Providers.ts
var Providers = /* @__PURE__ */ ((Providers2) => {
  Providers2["Aliyun"] = "aliyun";
  Providers2["Microsoft"] = "microsoft";
  Providers2["Huawei"] = "huawei";
  Providers2["Iflytek"] = "iflytek";
  Providers2["Tencent"] = "tencent";
  Providers2["Baidu"] = "baidu";
  Providers2["YunXiaoWei"] = "yunXiaoWei";
  Providers2["XiangXin3D"] = "xiangXin3D";
  Providers2["XiangXinGAN"] = "xiangXinGAN";
  return Providers2;
})(Providers || {});
var Providers_default = Providers;

// src/util.ts
import lodash from "lodash";
import { v1 as uuid } from "uuid";
var util_default = __spreadProps(__spreadValues({}, lodash), {
  uuid: (separator = true) => separator ? uuid() : uuid().replace(/\-/g, ""),
  optionsInject(that, options, initializers = {}, checkers = {}) {
    Object.keys(that).forEach((key) => {
      if (/^\_/.test(key))
        return;
      let value = options[key];
      if (this.isFunction(initializers[key]))
        value = initializers[key](value);
      if (this.isFunction(checkers[key]) && !checkers[key](value))
        throw new Error(`parameter ${key} invalid`);
      if (!this.isFunction(initializers[key]) && !this.isFunction(checkers[key]) || this.isUndefined(value))
        return;
      if (this.isSymbol(that[key]) && !this.isSymbol(value))
        return;
      that[key] = value;
    });
  },
  isURL(value) {
    return !this.isUndefined(value) && /^(http|https)/.test(value);
  },
  isBASE64(value) {
    return !this.isUndefined(value) && /^[a-zA-Z0-9\/\+]+(=?)+$/.test(value);
  },
  isStringNumber(value) {
    return this.isFinite(Number(value));
  },
  isUnixTimestamp(value) {
    return /^[0-9]{10}$/.test(`${value}`);
  },
  isTimestamp(value) {
    return /^[0-9]{13}$/.test(`${value}`);
  },
  unixTimestamp() {
    return Math.floor(Date.now() / 1e3);
  },
  timestamp() {
    return Date.now();
  },
  urlJoin(...values) {
    let url = values[0];
    for (let i = 1; i < values.length; i++)
      url += `/${values[i].replace(/^\/*/, "")}`;
    return url;
  },
  millisecondsToHmss(milliseconds) {
    if (this.isString(milliseconds))
      return milliseconds;
    const sec = Math.floor(milliseconds / 1e3);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - hours * 3600 - minutes * 60;
    const ms = milliseconds % 6e4 - seconds * 1e3;
    return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}.${ms}`;
  },
  millisecondsToSenconds(milliseconds, precision = 3) {
    return parseFloat((milliseconds / 1e3).toFixed(precision));
  },
  arrayParse(value) {
    return this.isArray(value) ? value : [value];
  },
  encodeBASE64(value) {
    value = this.isString(value) ? value : JSON.stringify(value);
    return typeof Buffer !== "undefined" ? Buffer.from(value).toString("base64") : btoa(unescape(encodeURIComponent(value)));
  },
  decodeBASE64(value) {
    if (!this.isString(value))
      throw new TypeError("value must be an string");
    return typeof Buffer !== "undefined" ? Buffer.from(value, "base64").toString() : decodeURIComponent(escape(atob(value)));
  },
  booleanParse(value) {
    switch (Object.prototype.toString.call(value)) {
      case "[object String]":
        return ["true", "t", "yes", "y", "on", "1"].indexOf(value.trim().toLowerCase()) !== -1;
      case "[object Number]":
        return value.valueOf() === 1;
      case "[object Boolean]":
        return value.valueOf();
      default:
        return false;
    }
  }
});

// src/Document.ts
var Document = class {
  type = "";
  provider = "";
  version = "";
  language = "";
  xmlns = "";
  effect;
  effectValue;
  format;
  sampleRate;
  children = [];
  constructor(options = {}) {
    if (!util_default.isObject(options))
      throw new TypeError("options must be an object");
    util_default.optionsInject(this, options, {
      type: () => "document",
      version: (v) => util_default.defaultTo(v, "1.0"),
      language: (v) => util_default.defaultTo(v, "zh-cn"),
      xmlns: (v) => util_default.defaultTo(v, "http://www.w3.org/2001/10/synthesis"),
      format: (v) => util_default.defaultTo(v, "mp3")
    }, {
      provider: (v) => Object.values(Providers_default).includes(v),
      version: (v) => util_default.isString(v),
      language: (v) => util_default.isString(v),
      xmlns: (v) => util_default.isString(v),
      format: (v) => util_default.isString(v),
      effect: (v) => util_default.isUndefined(v) || util_default.isString(v),
      sampleRate: (v) => util_default.isUndefined(v) || util_default.isString(v)
    });
  }
  toSSML(pretty = false) {
    const root = create();
    const speak = root.ele("speak");
    speak.att("version", this.version);
    speak.att("xml:lang", this.language);
    speak.att("xmlns", this.xmlns);
    return speak.end({ prettyPrint: pretty, headless: true });
  }
};
__publicField(Document, "type", "document");
var Document_default = Document;
export {
  Document_default as Document
};
