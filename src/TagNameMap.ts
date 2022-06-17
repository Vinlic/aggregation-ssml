import Providers from './enums/Providers';
import ElementTypes from './enums/ElementTypes';

export default {
    [Providers.Aggregation]: {
        [ElementTypes.Voice]: 'voice',
        [ElementTypes.Language]: 'lang',
        [ElementTypes.Paragraph]: 'p',
        [ElementTypes.Word]: 'w',
        [ElementTypes.Sentence]: 's',
        [ElementTypes.Break]: 'break',
        [ElementTypes.Phoneme]: 'phoneme',
        [ElementTypes.Lexicon]: 'lexicon',
        [ElementTypes.Prosody]: 'prosody',
        [ElementTypes.SayAs]: "say-as",
        [ElementTypes.Subsitute]: "sub",
        [ElementTypes.Bookmark]: "bookmark",
        [ElementTypes.ExpressAs]: "express-as",
        [ElementTypes.Silence]: "silence",
        [ElementTypes.BackgroundAudio]: "backgroundAudio",
        [ElementTypes.Audio]: "audio",
    },
    [Providers.Aliyun]: {
        [ElementTypes.Word]: 'w',
        [ElementTypes.Sentence]: 's',
        [ElementTypes.Break]: 'break',
        [ElementTypes.Phoneme]: 'phoneme',
        [ElementTypes.SayAs]: "say-as",
        [ElementTypes.Subsitute]: "sub",
        [ElementTypes.Audio]: "soundEvent",
    },
    [Providers.Microsoft]: {
        [ElementTypes.Voice]: 'voice',
        [ElementTypes.Language]: 'lang',
        [ElementTypes.Paragraph]: 'p',
        [ElementTypes.Sentence]: 's',
        [ElementTypes.Break]: 'break',
        [ElementTypes.Phoneme]: 'phoneme',
        [ElementTypes.Lexicon]: 'lexicon',
        [ElementTypes.Prosody]: 'prosody',
        [ElementTypes.SayAs]: "say-as",
        [ElementTypes.Subsitute]: "sub",
        [ElementTypes.Bookmark]: "bookmark",
        [ElementTypes.ExpressAs]: "mstts:express-as",
        [ElementTypes.Silence]: "mstts:silence",
        [ElementTypes.BackgroundAudio]: "backgroundaudio",
        [ElementTypes.Audio]: "audio",
    },
    [Providers.YunXiaoWei]: {
        [ElementTypes.Word]: 'w',
        [ElementTypes.Break]: "break",
        [ElementTypes.Phoneme]: 'phoneme',
        [ElementTypes.SayAs]: "say-as",
        [ElementTypes.Prosody]: 'prosody'
    }
} as any;