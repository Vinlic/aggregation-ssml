import lodash from "lodash"

export default {
  ...lodash,

  optionsInject(that: any, options: any, initializers: any = {}, checkers: any = {}) {
    Object.keys(that).forEach((key) => {
      if (/^_/.test(key) && !/^__/.test(key)) return;
      let value = options[key];
      if (this.isFunction(initializers[key])) value = initializers[key](value);
      if (this.isFunction(checkers[key]) && !checkers[key](value)) throw new Error(`parameter ${key} invalid`);
      if ((!this.isFunction(initializers[key]) && !this.isFunction(checkers[key])) || this.isUndefined(value)) return;
      if (this.isSymbol(that[key]) && !this.isSymbol(value)) return;
      that[key] = value;
    });
  },

  isURL(value: any): boolean {
    return !this.isUndefined(value) && /^(http|https)/.test(value);
  },

  isBASE64(value: any): boolean {
    return !this.isUndefined(value) && /^[a-zA-Z0-9\/\+]+(=?)+$/.test(value);
  },

  isStringNumber(value: any): boolean {
    return this.isFinite(Number(value));
  },

  isUnixTimestamp(value: any): boolean {
    return /^[0-9]{10}$/.test(`${value}`);
  },

  isTimestamp(value: any): boolean {
    return /^[0-9]{13}$/.test(`${value}`);
  },

  unixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  },

  timestamp(): number {
    return Date.now();
  },

  urlJoin(...values: string[]): string {
    let url = values[0];
    for (let i = 1; i < values.length; i++) url += `/${values[i].replace(/^\/*/, '')}`;
    return url;
  },

  millisecondsToHmss(milliseconds: string | number): string {
    if (this.isString(milliseconds)) return milliseconds as string;
    const sec = Math.floor((milliseconds as number) / 1000);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - hours * 3600 - minutes * 60;
    const ms = ((milliseconds as number) % 60000) - seconds * 1000;
    return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds
      }.${ms}`;
  },

  millisecondsToSenconds(milliseconds: number, precision: number = 3): number {
    return parseFloat((milliseconds / 1000).toFixed(precision));
  },

  timeStringToMilliseconds(timeString: string) {
    switch (true) {
      case /ms$/.test(timeString):
        return parseInt(timeString);
      case /s$/.test(timeString):
        return parseInt(timeString) * 1000;
      default:
        return parseInt(timeString) || 0
    }
  },

  arrayParse(value: string | string[]): string[] {
    return this.isArray(value) ? value as string[] : [value as string];
  },

  encodeBASE64(value: any) {
    value = this.isString(value) ? value : JSON.stringify(value);
    return typeof Buffer !== "undefined" ? Buffer.from(value).toString("base64") : btoa(unescape(encodeURIComponent(value)));
  },

  decodeBASE64(value: any) {
    if (!this.isString(value))
      throw new TypeError("value must be an string");
    return typeof Buffer !== "undefined" ? Buffer.from(value, "base64").toString() : decodeURIComponent(escape(atob(value)));
  },

  booleanParse(value: any) {
    switch (Object.prototype.toString.call(value)) {
      case '[object String]':
        return ['true', 't', 'yes', 'y', 'on', '1'].indexOf(value.trim().toLowerCase()) !== -1;
      case '[object Number]':
        return value.valueOf() === 1;
      case '[object Boolean]':
        return value.valueOf();
      default:
        return false;
    }
  },

  convertXMLObject(obj: any, target: any = {}) {
    const type = Object.keys(obj)[0];
    target.type = type;
    for (let key in obj[':@']) {
      const targetKey = {
        type: "__type",
        value: "__value"
      }[key] || key;
      target[targetKey] = obj[':@'][key];
    }
    target.children = [];
    obj[type].forEach((v: any) => {
      if (v['#text']) return target.children.push({ type: "raw", value: v['#text'] });
      const result = this.convertXMLObject(v, {});
      result && target.children.push(result);
    });
    return target;
  }
};
