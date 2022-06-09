import IElementOptions from './elements/interface/IElementOptions';

import ElementTypes from './enums/ElementTypes';

import { Element, Audio, BackgroundAudio, Bookmark, Break, Language, Lexicon, Paragraph, Phoneme, Prosody, SayAs, Sentence, Subsitute, Voice, Word } from './elements';
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
            case ElementTypes.Audio: //音频元素
                return new Audio(data);
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
            case ElementTypes.Paragraph:
                return new Paragraph(data);
            case ElementTypes.Phoneme:
                return new Phoneme(data);
            case ElementTypes.Prosody:
                return new Prosody(data);
            case ElementTypes.SayAs:
                return new SayAs(data);
            case ElementTypes.Sentence:
                return new Sentence(data);
            case ElementTypes.Subsitute:
                return new Subsitute(data);
            case ElementTypes.Voice:
                return new Voice(data);
            case ElementTypes.Word:
                return new Word(data);
        }
        return new Element(data);
    }
}

export default ElementFactory;
