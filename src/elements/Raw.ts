import IElementOptions from './interface/IElementOptions';

import ElementTypes from '../enums/ElementTypes';
import Providers from '../enums/Providers';

import Element from './Element';

const splitSymbols = [",", "，", "。", "!", "！", ";", "；", ":", "："];

class Raw extends Element {

    constructor(options: IElementOptions, type = ElementTypes.Raw) {
        super(options, type);
    }

    render(parent: any, provider: Providers) {
        return super.render(parent, provider);
    }

    splitText(value: string) {
        const texts = [];
        let searchIndex = 0;
        let foundIndex = 0;
        while(foundIndex !== Infinity) {
            foundIndex = Math.min(...(splitSymbols.map(symbol => {
                const index = value.indexOf(symbol, searchIndex);
                if (index === -1) return Infinity;
                return index;
            })));  //寻找距离最近的切分符号
            texts.push(value.substring(searchIndex, foundIndex));  //切分文本内容
            searchIndex = foundIndex + 1;
        }
        return texts;
    }

    toText() {
        return this.value || "";
    }

    toTimeline(baseTime = 0, provider: Providers, declaimer: string, speechRate: number) {
        if(!this.value) return null;
        const texts = this.splitText(this.value.replace(/\n/g, ""));
        const timeline: any = [];
        const factor = 2 - speechRate;
        let currentTime = baseTime;
        texts.forEach(text => {
            let textDuration = 0;
            const chars = text.split("");
            chars.forEach(char => {
                switch(provider) {
                    case Providers.Aliyun:
                        if(char === "%" || char === "。")
                            textDuration += 660;
                        else if(splitSymbols.indexOf(char) === -1)
                            textDuration += 100;
                        else
                            textDuration += 220;
                    break;
                    case Providers.Microsoft:
                        if(char === "%" || char === "。")
                            textDuration += 540;
                        else if(splitSymbols.indexOf(char) === -1)
                            textDuration += 80;
                        else
                            textDuration += 180;
                    break;
                    default:
                        textDuration += 200;
                }
            });
            textDuration = textDuration * factor;
            timeline.push({
                startTime: currentTime,
                endTime: currentTime + textDuration
            });
            currentTime += textDuration;
        });
        return { timeline, duration: currentTime - baseTime };
    }

}

export default Raw;