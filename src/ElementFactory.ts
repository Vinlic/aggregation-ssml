import IElementOptions from './elements/interface/IElementOptions';

import ElementTypes from './enums/ElementTypes';

import { Element, Raw, Audio, BackgroundAudio, Bookmark, Break, Language, Lexicon, Paragraph, Phoneme, Prosody, SayAs, Sentence, Subsitute, Voice, Word, ExpressAs, Silence, Action } from './elements';
import util from './util';

class ElementFactory {
    /**
     * 实例化元素
     *
     * @param {Object} data
     * @returns {Element}
     */
    public static createElement(data: IElementOptions) {
        if (!util.isObject(data)) throw new TypeError('data must be an Object');
        switch (data.type) {
            case ElementTypes.Raw:
                return new Raw(data);
            case ElementTypes.Audio: //音频元素
                return new Audio(data);
            case ElementTypes.backgroundaudio:
            case ElementTypes.BackgroundAudio:  //背景音频元素
                return new BackgroundAudio(data);
            case ElementTypes.Bookmark:
                return new Bookmark(data);
            case ElementTypes.Break:
                return new Break(data);
            case ElementTypes.Language:
                return new Language(data);
            case ElementTypes.Lexicon:
                return new Lexicon(data);
            case ElementTypes.p:
            case ElementTypes.Paragraph:
                return new Paragraph(data);
            case ElementTypes.Phoneme:
                return new Phoneme(data);
            case ElementTypes.Prosody:
                return new Prosody(data);
            case ElementTypes["say-as"]:
            case ElementTypes.SayAs:
                return new SayAs(data);
            case ElementTypes.s:
            case ElementTypes.Sentence:
                return new Sentence(data);
            case ElementTypes.Subsitute:
                return new Subsitute(data);
            case ElementTypes.Voice:
                return new Voice(data);
            case ElementTypes.w:
            case ElementTypes.Word:
                return new Word(data);
            case ElementTypes["mstts:express-as"]:
            case ElementTypes.ExpressAs:
                return new ExpressAs(data);
            case ElementTypes["mstts:silence"]:
            case ElementTypes.Silence:
                return new Silence(data);
            case ElementTypes["insert-action"]:
            case ElementTypes.Action:
                return new Action(data);
        }
        return new Element(data);
    }
}

export default ElementFactory;
