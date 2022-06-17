import IPhonemeOptions from './interface/IPhonemeOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';
import util from '../util';

const vowelTones = [
    "ā", "á", "ǎ", "à",
    "ō", "ó", "ǒ", "ò",
    "ē", "é", "ě", "è",
    "ī", "í", "ǐ", "ì",
    "ū", "ú", "ǔ", "ù",
    "ǖ", "ǘ", "ǚ", "ǜ"
];
const vowels = ["a", "o", "e", "i", "u", "ü"];
const regExp = new RegExp(vowelTones.join("|"), "g");

class Phoneme extends Element {

    public alphabet = '';  //指定音标
    public ph?: string;  //指定文本读音串

    constructor(options: IPhonemeOptions = {}, type = ElementTypes.Phoneme) {
        super(options, type);
        util.optionsInject(this, options, {
            alphabet: (v: any) => util.defaultTo(v, "py")
        }, {
            alphabet: (v: any) => util.isString(v),
            ph: (v: any) => util.isString(v)
        });
    }

    render(parent: any, provider: Providers) {
        const element = super.render(parent, provider);
        let ph;
        if(this.alphabet === "py" && this.ph)
            ph = this.pinyinConvert(this.ph);
        switch(provider) {
            case Providers.Aliyun:
                element.att("alphabet", this.alphabet);
                element.att("ph", ph || this.ph);
            break;
            case Providers.Microsoft:
                element.att("alphabet", this.alphabet == "py" ? "sapi" : this.alphabet);
                element.att("ph", ph ? this.pinyin2sapi(ph) : this.ph);
            break;
            case Providers.YunXiaoWei:
                element.att("py", ph || this.pinyinConvert(this.ph));
            break;
            default:
                element.att("alphabet", this.alphabet);
                element.att("ph", this.ph);
        }
        return element;
    }

    private pinyin2sapi(value: string) {
        const regExp = new RegExp(/(([a-z]+)(\d))+/g);
        let match = null;
        let chunks = [];
        while((match = regExp.exec(value)) != null) {
            const [,, symbol, tone] = match;
            chunks.push(`${symbol} ${tone}`);
        }
        return chunks.join(" - ");
    }

    private pinyinConvert(value: string | undefined) {
        if(!value) return;
        const spaceRegExp = /\s/g;
        let temp, offset = 0;
        let ph = value.split("") as any;
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

}

export default Phoneme;