var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Document: () => Document_default,
  elements: () => elements_exports
});
module.exports = __toCommonJS(src_exports);

// src/Document.ts
var import_xmlbuilder2 = require("xmlbuilder2");
var import_fast_xml_parser = require("fast-xml-parser");

// src/enums/ElementTypes.ts
var ElementTypes = /* @__PURE__ */ ((ElementTypes2) => {
  ElementTypes2["Element"] = "element";
  ElementTypes2["Raw"] = "raw";
  ElementTypes2["Voice"] = "voice";
  ElementTypes2["Language"] = "language";
  ElementTypes2["p"] = "p";
  ElementTypes2["Paragraph"] = "paragraph";
  ElementTypes2["s"] = "s";
  ElementTypes2["Sentence"] = "sentence";
  ElementTypes2["Break"] = "break";
  ElementTypes2["Phoneme"] = "phoneme";
  ElementTypes2["Lexicon"] = "lexicon";
  ElementTypes2["Prosody"] = "prosody";
  ElementTypes2["say-as"] = "say-as";
  ElementTypes2["SayAs"] = "sayAs";
  ElementTypes2["Audio"] = "audio";
  ElementTypes2["Bookmark"] = "bookmark";
  ElementTypes2["Subsitute"] = "subsitute";
  ElementTypes2["w"] = "w";
  ElementTypes2["Word"] = "word";
  ElementTypes2["backgroundaudio"] = "backgroundaudio";
  ElementTypes2["BackgroundAudio"] = "backgroundAudio";
  ElementTypes2["mstts:express-as"] = "mstts:express-as";
  ElementTypes2["ExpressAs"] = "expressAs";
  ElementTypes2["mstts:silence"] = "mstts:silence";
  ElementTypes2["Silence"] = "silence";
  return ElementTypes2;
})(ElementTypes || {});
var ElementTypes_default = ElementTypes;

// src/elements/index.ts
var elements_exports = {};
__export(elements_exports, {
  Audio: () => Audio_default,
  BackgroundAudio: () => BackgroundAudio_default,
  Bookmark: () => Bookmark_default,
  Break: () => Break_default,
  Element: () => Element_default,
  ExpressAs: () => ExpressAs_default,
  Language: () => Language_default,
  Lexicon: () => Lexicon_default,
  Paragraph: () => Paragraph_default,
  Phoneme: () => Phoneme_default,
  Prosody: () => Prosody_default,
  Raw: () => Raw_default,
  SayAs: () => SayAs_default,
  Sentence: () => Sentence_default,
  Silence: () => Silence_default,
  Subsitute: () => Subsitute_default,
  Voice: () => Voice_default,
  Word: () => Word_default
});

// src/enums/Providers.ts
var Providers = /* @__PURE__ */ ((Providers2) => {
  Providers2["Unknown"] = "unknown";
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

// src/TagNameMap.ts
var TagNameMap_default = {
  [Providers_default.Aliyun]: {
    [ElementTypes_default.Word]: "w",
    [ElementTypes_default.Sentence]: "s",
    [ElementTypes_default.Break]: "break",
    [ElementTypes_default.Phoneme]: "phoneme",
    [ElementTypes_default.SayAs]: "say-as",
    [ElementTypes_default.Subsitute]: "sub",
    [ElementTypes_default.Audio]: "soundEvent"
  },
  [Providers_default.Microsoft]: {
    [ElementTypes_default.Voice]: "voice",
    [ElementTypes_default.Language]: "lang",
    [ElementTypes_default.Paragraph]: "p",
    [ElementTypes_default.Sentence]: "s",
    [ElementTypes_default.Break]: "break",
    [ElementTypes_default.Phoneme]: "phoneme",
    [ElementTypes_default.Lexicon]: "lexicon",
    [ElementTypes_default.Prosody]: "prosody",
    [ElementTypes_default.SayAs]: "say-as",
    [ElementTypes_default.Subsitute]: "sub",
    [ElementTypes_default.Bookmark]: "bookmark",
    [ElementTypes_default.ExpressAs]: "mstts:express-as",
    [ElementTypes_default.Silence]: "mstts:silence",
    [ElementTypes_default.BackgroundAudio]: "backgroundaudio",
    [ElementTypes_default.Audio]: "audio"
  }
};

// src/util.ts
var import_lodash = __toESM(require("lodash"));
var util_default = __spreadProps(__spreadValues({}, import_lodash.default), {
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

// src/elements/Element.ts
var _parent;
var _Element = class {
  constructor(options, type = ElementTypes_default.Element) {
    __publicField(this, "type", ElementTypes_default.Element);
    __publicField(this, "value");
    __publicField(this, "children", []);
    __publicField(this, "disableValue", false);
    __privateAdd(this, _parent, void 0);
    if (!util_default.isObject(options))
      throw new TypeError("options must be an object");
    this.type = type;
    util_default.optionsInject(this, options, {
      children: (datas) => util_default.isArray(datas) ? datas.map((options2) => {
        const node = _Element.isInstance(options2) ? options2 : ElementFactory_default.createElement(options2);
        node.parent = this;
        return node;
      }) : []
    }, {
      value: (v) => util_default.isUndefined(v) || util_default.isString(v),
      children: (v) => util_default.isArray(v)
    });
  }
  find(path) {
    const keys = path.split(".");
    let that = this;
    keys.forEach((key) => {
      if (!util_default.isObject(that)) {
        that = void 0;
        return;
      }
      that = that.children.find((v) => v.type == key);
    });
    return that;
  }
  appendChild(node) {
    if (!_Element.isInstance(node))
      throw new TypeError("node must be an Element instance");
    node.parent = this;
    this.children.push(node);
  }
  render(parent, provider) {
    const tagName = TagNameMap_default[provider] ? TagNameMap_default[provider][this.type] : null;
    const element = tagName ? parent.ele(tagName) : parent;
    this.value && !this.disableValue && element.txt(this.value);
    this.children.forEach((node) => node.render(element, provider));
    return element;
  }
  static isInstance(value) {
    return value instanceof _Element;
  }
  set parent(obj) {
    __privateSet(this, _parent, obj);
  }
  get parent() {
    return __privateGet(this, _parent);
  }
};
var Element = _Element;
_parent = new WeakMap();
__publicField(Element, "Type", ElementTypes_default);
var Element_default = Element;

// src/elements/Raw.ts
var Raw = class extends Element_default {
  constructor(options, type = ElementTypes_default.Raw) {
    super(options, type);
  }
  render(parent, provider) {
    return super.render(parent, provider);
  }
};
var Raw_default = Raw;

// src/elements/Audio.ts
var Audio = class extends Element_default {
  src = "";
  constructor(options, type = ElementTypes_default.Audio) {
    super(options, type);
    util_default.optionsInject(this, options, {}, {
      src: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("src", this.src);
    return element;
  }
};
var Audio_default = Audio;

// src/elements/BackgroundAudio.ts
var BackgroundAudio = class extends Element_default {
  src = "";
  volume = 1;
  fadeIn;
  fadeOut;
  constructor(options, type = ElementTypes_default.BackgroundAudio) {
    super(options, type);
    util_default.optionsInject(this, options, {
      volume: (v) => Number(util_default.defaultTo(v, 1)),
      fadeIn: (v) => !util_default.isUndefined(v) ? Number(v) : v,
      fadeOut: (v) => !util_default.isUndefined(v) ? Number(v) : v
    }, {
      src: (v) => util_default.isString(v),
      volume: (v) => util_default.isFinite(v),
      fadeIn: (v) => util_default.isUndefined(v) || util_default.isFinite(v),
      fadeOut: (v) => util_default.isUndefined(v) || util_default.isFinite(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("src", this.src);
    element.att("volume", this.volume);
    element.att("fadeIn", this.fadeIn);
    element.att("fadeOut", this.fadeOut);
    switch (provider) {
      case Providers_default.Microsoft:
        element.txt(" ");
        break;
    }
    return element;
  }
};
var BackgroundAudio_default = BackgroundAudio;

// src/elements/Bookmark.ts
var Bookmark = class extends Element_default {
  mark = "";
  constructor(options, type = ElementTypes_default.Bookmark) {
    super(options, type);
    util_default.optionsInject(this, options, {}, {
      mark: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("mark", this.mark);
    return element;
  }
};
var Bookmark_default = Bookmark;

// src/elements/Break.ts
var Break = class extends Element_default {
  strength;
  time = "";
  constructor(options, type = ElementTypes_default.Break) {
    super(options, type);
    this.disableValue = true;
    util_default.optionsInject(this, options, {
      strength: (v) => !util_default.isUndefined(v) ? v.toString() : v,
      time: (v) => !util_default.isUndefined(v) ? v.toString() : v
    }, {
      strength: (v) => util_default.isUndefined(v) || util_default.isString(v),
      time: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("time", this.time);
    switch (provider) {
      case Providers_default.Aliyun:
        element.att("strength", this.strength);
        break;
    }
    return element;
  }
};
var Break_default = Break;

// src/elements/Language.ts
var Language = class extends Element_default {
  language = "";
  constructor(options, type = ElementTypes_default.Language) {
    super(options, type);
    util_default.optionsInject(this, options, {}, {
      language: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("xml:lang", this.language);
    return element;
  }
};
var Language_default = Language;

// src/elements/Lexicon.ts
var Lexicon = class extends Element_default {
  uri = "";
  constructor(options, type = ElementTypes_default.Lexicon) {
    super(options, type);
    util_default.optionsInject(this, options, {}, {
      uri: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("uri", this.uri);
    return element;
  }
};
var Lexicon_default = Lexicon;

// src/elements/Paragraph.ts
var Paragraph = class extends Element_default {
  constructor(options, type = ElementTypes_default.Paragraph) {
    super(options, type);
  }
  render(parent, provider) {
    return super.render(parent, provider);
  }
};
var Paragraph_default = Paragraph;

// src/elements/Phoneme.ts
var vowelTones = [
  "\u0101",
  "\xE1",
  "\u01CE",
  "\xE0",
  "\u014D",
  "\xF3",
  "\u01D2",
  "\xF2",
  "\u0113",
  "\xE9",
  "\u011B",
  "\xE8",
  "\u012B",
  "\xED",
  "\u01D0",
  "\xEC",
  "\u016B",
  "\xFA",
  "\u01D4",
  "\xF9",
  "\u01D6",
  "\u01D8",
  "\u01DA",
  "\u01DC"
];
var vowels = ["a", "o", "e", "i", "u", "\xFC"];
var regExp = new RegExp(vowelTones.join("|"), "g");
var Phoneme = class extends Element_default {
  alphabet = "";
  ph;
  constructor(options, type = ElementTypes_default.Phoneme) {
    super(options, type);
    util_default.optionsInject(this, options, {
      alphabet: (v) => util_default.defaultTo(v, "py")
    }, {
      alphabet: (v) => util_default.isString(v),
      ph: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    let ph;
    if (this.alphabet === "py" && this.ph)
      ph = this.pinyinConvert(this.ph);
    switch (provider) {
      case Providers_default.Aliyun:
        element.att("alphabet", this.alphabet);
        element.att("ph", ph || this.ph);
        break;
      case Providers_default.Microsoft:
        element.att("alphabet", this.alphabet == "py" ? "sapi" : this.alphabet);
        element.att("ph", ph ? this.pinyin2sapi(ph) : this.ph);
        break;
      default:
        element.att("alphabet", this.alphabet);
        element.att("ph", this.ph);
    }
    return element;
  }
  pinyin2sapi(value) {
    const regExp2 = new RegExp(/(([a-z]+)(\d))+/g);
    let match = null;
    let chunks = [];
    while ((match = regExp2.exec(value)) != null) {
      const [, , symbol, tone] = match;
      chunks.push(`${symbol} ${tone}`);
    }
    return chunks.join(" - ");
  }
  pinyinConvert(value) {
    const spaceRegExp = /\s/g;
    let temp, offset = 0;
    let ph = value.split("");
    while ((temp = regExp.exec(value)) != null) {
      const toneIndex = vowelTones.indexOf(temp[0]);
      const vowelIndex = Math.floor(toneIndex / 4);
      const spaceMatch = spaceRegExp.exec(value);
      ph[temp.index + offset] = vowels[vowelIndex];
      if (spaceMatch)
        ph.splice(spaceMatch.index + offset, 0, toneIndex % 4 + 1);
      else
        ph.push(toneIndex % 4 + 1);
      offset++;
    }
    return ph.join("");
  }
};
var Phoneme_default = Phoneme;

// src/elements/Prosody.ts
var Prosody = class extends Element_default {
  pitch;
  contour;
  range;
  rate;
  duration;
  volume;
  constructor(options, type = ElementTypes_default.Prosody) {
    super(options, type);
    util_default.optionsInject(this, options, {
      pitch: (v) => util_default.isUndefined(v) ? v : Number(v),
      rate: (v) => util_default.isUndefined(v) ? v : Number(v),
      volume: (v) => util_default.isUndefined(v) ? v : Number(v)
    }, {
      pitch: (v) => util_default.isUndefined(v) || util_default.isFinite(v),
      contour: (v) => util_default.isUndefined(v) || util_default.isString(v),
      range: (v) => util_default.isUndefined(v) || util_default.isString(v),
      rate: (v) => util_default.isUndefined(v) || util_default.isFinite(v),
      duration: (v) => util_default.isUndefined(v) || util_default.isString(v),
      volume: (v) => util_default.isUndefined(v) || util_default.isFinite(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("pitch", this.pitch ? `${parseInt((this.pitch * 50 - 50).toString())}%` : void 0);
    element.att("contour", this.contour);
    element.att("range", this.range);
    element.att("rate", this.rate);
    element.att("duration", this.duration);
    element.att("volume", this.volume ? this.volume > 100 ? 100 : this.volume : void 0);
    return element;
  }
};
var Prosody_default = Prosody;

// src/elements/SayAs.ts
var SayAs = class extends Element_default {
  interpretAs = "";
  format;
  detail;
  constructor(options, type = ElementTypes_default.SayAs) {
    super(options, type);
    options.interpretAs = options.interpretAs || options["interpret-as"];
    util_default.optionsInject(this, options, {}, {
      interpretAs: (v) => util_default.isString(v),
      format: (v) => util_default.isUndefined(v) || util_default.isString(v),
      detail: (v) => util_default.isUndefined(v) || util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    switch (provider) {
      case Providers_default.Aliyun:
        element.att("interpret-as", this.interpretAs);
      case Providers_default.Microsoft:
        element.att("interpret-as", {
          digits: "number_digit"
        }[this.interpretAs] || this.interpretAs);
        element.att("format", this.format);
        element.att("detail", this.detail);
        break;
      default:
        element.att("interpret-as", this.interpretAs);
    }
    return element;
  }
};
var SayAs_default = SayAs;

// src/elements/Sentence.ts
var Sentence = class extends Element_default {
  constructor(options, type = ElementTypes_default.Sentence) {
    super(options, type);
  }
  render(parent, provider) {
    return super.render(parent, provider);
  }
};
var Sentence_default = Sentence;

// src/elements/Subsitute.ts
var Subsitute = class extends Element_default {
  alias = "";
  constructor(options, type = ElementTypes_default.Subsitute) {
    super(options, type);
    util_default.optionsInject(this, options, {}, {
      alias: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("alias", this.alias);
    return element;
  }
};
var Subsitute_default = Subsitute;

// src/elements/Voice.ts
var Voice = class extends Element_default {
  name = "";
  gender;
  age;
  variant;
  language;
  constructor(options, type = ElementTypes_default.Voice) {
    super(options, type);
    options.gender = options.gender || options["xml:gender"];
    options.language = options.language || options["xml:lang"];
    util_default.optionsInject(this, options, {
      age: (v) => !util_default.isUndefined(v) ? Number(v) : v
    }, {
      name: (v) => util_default.isString(v),
      gender: (v) => util_default.isUndefined(v) || util_default.isString(v),
      age: (v) => util_default.isUndefined(v) || util_default.isFinite(v),
      variant: (v) => util_default.isUndefined(v) || util_default.isString(v),
      language: (v) => util_default.isUndefined(v) || util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("name", this.name);
    element.att("age", this.age);
    element.att("variant", this.variant);
    element.att("xml:gender", this.gender);
    element.att("xml:lang", this.language);
    return element;
  }
};
var Voice_default = Voice;

// src/elements/Word.ts
var Word = class extends Element_default {
  constructor(options, type = ElementTypes_default.Word) {
    super(options, type);
  }
  render(parent, provider) {
    return super.render(parent, provider);
  }
};
var Word_default = Word;

// src/elements/ExpressAs.ts
var ExpressAs = class extends Element_default {
  style = "";
  styledegree;
  role;
  constructor(options, type = ElementTypes_default.ExpressAs) {
    super(options, type);
    util_default.optionsInject(this, options, {
      styledegree: (v) => !util_default.isUndefined(v) ? Number(v) : v
    }, {
      style: (v) => util_default.isString(v),
      styledegree: (v) => util_default.isUndefined(v) || util_default.isFinite(v),
      role: (v) => util_default.isUndefined(v) || util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("style", this.style);
    element.att("styledegree", this.styledegree);
    element.att("role", this.role);
    return element;
  }
};
var ExpressAs_default = ExpressAs;

// src/elements/Silence.ts
var Silence = class extends Element_default {
  _type = "";
  _value = "";
  constructor(options, type = ElementTypes_default.Silence) {
    super(options, type);
    options._type = options.type;
    options._value = options.value;
    util_default.optionsInject(this, options, {}, {
      _type: (v) => util_default.isString(v),
      _value: (v) => util_default.isString(v)
    });
  }
  render(parent, provider) {
    const element = super.render(parent, provider);
    element.att("type", this._type);
    element.att("value", this._value);
    return element;
  }
};
var Silence_default = Silence;

// src/ElementFactory.ts
var ElementFactory = class {
  static createElement(data) {
    if (!util_default.isObject(data))
      throw new TypeError("data must be an Object");
    switch (data.type) {
      case ElementTypes_default.Raw:
        return new Raw_default(data);
      case ElementTypes_default.Audio:
        return new Audio_default(data);
      case ElementTypes_default.backgroundaudio:
      case ElementTypes_default.BackgroundAudio:
        return new BackgroundAudio_default(data);
      case ElementTypes_default.Bookmark:
        return new Bookmark_default(data);
      case ElementTypes_default.Break:
        return new Break_default(data);
      case ElementTypes_default.Language:
        return new Language_default(data);
      case ElementTypes_default.Lexicon:
        return new Lexicon_default(data);
      case ElementTypes_default.p:
      case ElementTypes_default.Paragraph:
        return new Paragraph_default(data);
      case ElementTypes_default.Phoneme:
        return new Phoneme_default(data);
      case ElementTypes_default.Prosody:
        return new Prosody_default(data);
      case ElementTypes_default["say-as"]:
      case ElementTypes_default.SayAs:
        return new SayAs_default(data);
      case ElementTypes_default.s:
      case ElementTypes_default.Sentence:
        return new Sentence_default(data);
      case ElementTypes_default.Subsitute:
        return new Subsitute_default(data);
      case ElementTypes_default.Voice:
        return new Voice_default(data);
      case ElementTypes_default.w:
      case ElementTypes_default.Word:
        return new Word_default(data);
      case ElementTypes_default["mstts:express-as"]:
      case ElementTypes_default.ExpressAs:
        return new ExpressAs_default(data);
      case ElementTypes_default["mstts:silence"]:
      case ElementTypes_default.Silence:
        return new Silence_default(data);
    }
    return new Element_default(data);
  }
};
var ElementFactory_default = ElementFactory;

// src/Document.ts
var xmlParser = new import_fast_xml_parser.XMLParser({
  allowBooleanAttributes: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  preserveOrder: true,
  parseTagValue: false
});
var _Document = class {
  type = "";
  provider = Providers_default.Unknown;
  version = "";
  language = "";
  xmlns = "";
  effect;
  effectValue;
  format = "";
  sampleRate;
  children = [];
  constructor(options = {}) {
    if (!util_default.isObject(options))
      throw new TypeError("options must be an object");
    util_default.optionsInject(this, options, {
      type: () => "document",
      provider: (v) => !util_default.isUndefined(v) ? v : v,
      version: (v) => util_default.defaultTo(v, "1.0"),
      language: (v) => util_default.defaultTo(v, "zh-cn"),
      xmlns: (v) => util_default.defaultTo(v, "http://www.w3.org/2001/10/synthesis"),
      format: (v) => util_default.defaultTo(v, "mp3"),
      children: (datas) => util_default.isArray(datas) ? datas.map((options2) => {
        const node = Element_default.isInstance(options2) ? options2 : ElementFactory_default.createElement(options2);
        node.parent = this;
        return node;
      }) : []
    }, {
      provider: (v) => Object.values(Providers_default).includes(v),
      version: (v) => util_default.isString(v),
      language: (v) => util_default.isString(v),
      xmlns: (v) => util_default.isString(v),
      format: (v) => util_default.isString(v),
      effect: (v) => util_default.isUndefined(v) || util_default.isString(v),
      sampleRate: (v) => util_default.isUndefined(v) || util_default.isString(v),
      children: (v) => util_default.isArray(v)
    });
  }
  find(path) {
    const keys = path.split(".");
    let that = this;
    keys.forEach((key) => {
      if (!util_default.isObject(that)) {
        that = void 0;
        return;
      }
      that = that.children.find((v) => v.type == key);
    });
    return that;
  }
  appendChild(node) {
    if (!Element_default.isInstance(node))
      throw new TypeError("node must be an Element instance");
    node.parent = this;
    this.children.push(node);
  }
  toSSML(pretty = false) {
    const root = (0, import_xmlbuilder2.create)();
    const speak = root.ele("speak");
    speak.att("version", this.version);
    speak.att("xml:lang", this.language);
    speak.att("xmlns", this.xmlns);
    switch (this.provider) {
      case Providers_default.Aliyun:
        const voice = this.find("voice");
        let prosody, backgroundAudio;
        if (voice) {
          prosody = voice.find("prosody") || this.find("prosody");
          backgroundAudio = voice.find("backgroundaudio") || this.find("backgroundaudio");
          speak.att("voice", voice.name);
        }
        speak.att("encodeType", this.format);
        this.sampleRate && speak.att("sampleRate", this.sampleRate);
        this.effect && speak.att("effect", this.effect);
        this.effectValue && speak.att("effectValue", this.effectValue);
        if (prosody) {
          if (prosody.rate) {
            const rate = prosody.rate * 500 - 500;
            speak.att("rate", (rate > 500 ? 500 : rate).toString());
          }
          if (prosody.pitch) {
            const pitch = prosody.pitch * 500 - 500;
            speak.att("pitch", (pitch > 500 ? 500 : pitch).toString());
          }
          prosody.volume && speak.att("volume", parseInt((prosody.volume / 2).toString()).toString());
        }
        if (backgroundAudio) {
          speak.att("bgm", backgroundAudio.src);
          backgroundAudio.volume && speak.att("volume", parseInt((backgroundAudio.volume * 100 / 2).toString()).toString());
        }
        break;
      case Providers_default.Microsoft:
        speak.att("xmlns:mstts", "https://www.w3.org/2001/mstts");
        break;
    }
    this.children.forEach((node) => node.render(speak, this.provider));
    return speak.end({ prettyPrint: pretty, headless: true });
  }
  static parse(content) {
    if (!util_default.isString(content) && !util_default.isObject(content))
      throw new TypeError("content must be an string or object");
    if (util_default.isObject(content))
      return new _Document(content);
    if (!/\<speak/.test(content))
      return new _Document(JSON.parse(content));
    let xmlObject;
    xmlParser.parse(content).forEach((o) => {
      if (o.speak)
        xmlObject = o;
    });
    if (!xmlObject)
      throw new Error("document ssml invalid");
    function parse(obj, target = {}) {
      const type = Object.keys(obj)[0];
      target.type = type;
      for (let key in obj[":@"])
        target[key] = obj[":@"][key];
      target.children = [];
      obj[type].forEach((v) => {
        if (v["#text"])
          return target.children.push({ type: "raw", value: v["#text"] });
        const result = parse(v, {});
        result && target.children.push(result);
      });
      return target;
    }
    return new _Document(parse(xmlObject));
  }
};
var Document = _Document;
__publicField(Document, "Provider", Providers_default);
__publicField(Document, "type", "document");
var Document_default = Document;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Document,
  elements
});
