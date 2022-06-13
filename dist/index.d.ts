declare enum ElementTypes {
    Element = "element",
    Raw = "raw",
    Voice = "voice",
    Language = "language",
    p = "p",
    Paragraph = "paragraph",
    s = "s",
    Sentence = "sentence",
    Break = "break",
    Phoneme = "phoneme",
    Lexicon = "lexicon",
    Prosody = "prosody",
    "say-as" = "say-as",
    SayAs = "sayAs",
    Audio = "audio",
    Bookmark = "bookmark",
    Subsitute = "subsitute",
    w = "w",
    Word = "word",
    backgroundaudio = "backgroundaudio",
    BackgroundAudio = "backgroundAudio",
    "mstts:express-as" = "mstts:express-as",
    ExpressAs = "expressAs",
    "mstts:silence" = "mstts:silence",
    Silence = "silence"
}

declare enum Providers {
    Unknown = "unknown",
    Aliyun = "aliyun",
    Microsoft = "microsoft",
    Huawei = "huawei",
    Iflytek = "iflytek",
    Tencent = "tencent",
    Baidu = "baidu",
    YunXiaoWei = "yunXiaoWei",
    XiangXin3D = "xiangXin3D",
    XiangXinGAN = "xiangXinGAN"
}

declare class Element {
    #private;
    static Type: typeof ElementTypes;
    type: ElementTypes;
    value?: string;
    children: Element[];
    constructor(options: IElementOptions, type?: ElementTypes);
    find(path: string): Element;
    appendChild(node: Element): void;
    render(parent: any, provider: Providers): any;
    splitText(value: string): string[];
    parseTextDuration(text: string, provider: Providers, declaimer: string, speechRate: number): number;
    toText(): string;
    toTimeline(timeline: any[], baseTime: number | undefined, provider: Providers, declaimer: string, speechRate: number): any;
    static isInstance(value: any): boolean;
    set parent(obj: Document | Element | undefined);
    get parent(): Document | Element | undefined;
}

interface IElementOptions {
    type?: ElementTypes;
    value?: string;
    children?: (Element | IElementOptions)[];
}

interface IDocumentOptions {
    type?: string;
    provider?: string;
    version?: string;
    language?: string;
    xmlns?: string;
    effect?: string;
    effectValue?: string;
    format?: string;
    sampleRate?: string;
    children?: (Element | IElementOptions)[];
}

declare class Raw extends Element {
    constructor(options: IElementOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
    toText(): string;
}

interface IAudioOptions extends IElementOptions {
    src?: string;
}

declare class Audio extends Element {
    src: string;
    constructor(options: IAudioOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IBackgroundAudioOptions extends IElementOptions {
    src?: string;
    volume?: number | string;
    fadeIn?: number | string;
    fadeOut?: number | string;
}

declare class BackgroundAudio extends Element {
    src: string;
    volume: number;
    fadeIn?: number;
    fadeOut?: number;
    constructor(options: IBackgroundAudioOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IBookmarkOptions extends IElementOptions {
    mark?: string;
}

declare class Bookmark extends Element {
    mark: string;
    constructor(options: IBookmarkOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IBreakOptions extends IElementOptions {
    strength?: number | string;
    time?: number | string;
}

declare class Break extends Element {
    strength?: string;
    time: string;
    constructor(options: IBreakOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
    get duration(): number;
}

interface ILanguageOptions$1 extends IElementOptions {
    language?: string;
}

declare class Language extends Element {
    language: string;
    constructor(options: ILanguageOptions$1, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ILexiconOptions extends IElementOptions {
    uri?: string;
}

declare class Lexicon extends Element {
    uri: string;
    constructor(options: ILexiconOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IParagraphOptions extends IElementOptions {
}

declare class Paragraph extends Element {
    constructor(options: IParagraphOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ILanguageOptions extends IElementOptions {
    alphabet?: string;
    ph?: string;
}

declare class Phoneme extends Element {
    alphabet: string;
    ph?: string;
    constructor(options: ILanguageOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
    private pinyin2sapi;
    private pinyinConvert;
}

interface IProsodyOptions extends IElementOptions {
    pitch?: number | string;
    contour?: string;
    range?: string;
    rate?: number | string;
    duration?: string;
    volume?: number | string;
}

declare class Prosody extends Element {
    pitch?: number;
    contour?: string;
    range?: string;
    rate?: number;
    duration?: string;
    volume?: number;
    constructor(options: IProsodyOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ISayAsOptions extends IElementOptions {
    "interpret-as"?: string;
    interpretAs?: string;
    format?: string;
    detail?: string;
}

declare class SayAs extends Element {
    interpretAs: string;
    format?: string;
    detail?: string;
    constructor(options: ISayAsOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ISentenceOptions extends IElementOptions {
}

declare class Sentence extends Element {
    constructor(options: ISentenceOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ISubsituteOptions extends IElementOptions {
    alias?: string;
}

declare class Subsitute extends Element {
    alias: string;
    constructor(options: ISubsituteOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IVoiceOptions extends IElementOptions {
    name?: string;
    gender?: string;
    "xml:gender"?: string;
    language?: string;
    "xml:lang"?: string;
    age?: number | string;
    variant?: string;
}

declare class Voice extends Element {
    name: string;
    gender?: string;
    age?: number;
    variant?: string;
    language?: string;
    constructor(options: IVoiceOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IWordOptions extends IElementOptions {
}

declare class Word extends Element {
    constructor(options: IWordOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface IExpressAsOptions extends IElementOptions {
    style?: string;
    styledegree?: number | string;
    role?: string;
}

declare class ExpressAs extends Element {
    style: string;
    styledegree?: number;
    role?: string;
    constructor(options: IExpressAsOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

interface ISilenceOptions {
    _type?: string;
    _value?: string;
    type?: ElementTypes;
    value?: string;
    children?: (Element | IElementOptions)[];
}

declare class Silence extends Element {
    _type: string;
    _value: string;
    constructor(options: ISilenceOptions, type?: ElementTypes);
    render(parent: any, provider: Providers): any;
}

type index_Element = Element;
declare const index_Element: typeof Element;
type index_Raw = Raw;
declare const index_Raw: typeof Raw;
type index_Audio = Audio;
declare const index_Audio: typeof Audio;
type index_BackgroundAudio = BackgroundAudio;
declare const index_BackgroundAudio: typeof BackgroundAudio;
type index_Bookmark = Bookmark;
declare const index_Bookmark: typeof Bookmark;
type index_Break = Break;
declare const index_Break: typeof Break;
type index_Language = Language;
declare const index_Language: typeof Language;
type index_Lexicon = Lexicon;
declare const index_Lexicon: typeof Lexicon;
type index_Paragraph = Paragraph;
declare const index_Paragraph: typeof Paragraph;
type index_Phoneme = Phoneme;
declare const index_Phoneme: typeof Phoneme;
type index_Prosody = Prosody;
declare const index_Prosody: typeof Prosody;
type index_SayAs = SayAs;
declare const index_SayAs: typeof SayAs;
type index_Sentence = Sentence;
declare const index_Sentence: typeof Sentence;
type index_Subsitute = Subsitute;
declare const index_Subsitute: typeof Subsitute;
type index_Voice = Voice;
declare const index_Voice: typeof Voice;
type index_Word = Word;
declare const index_Word: typeof Word;
type index_ExpressAs = ExpressAs;
declare const index_ExpressAs: typeof ExpressAs;
type index_Silence = Silence;
declare const index_Silence: typeof Silence;
declare namespace index {
  export {
    index_Element as Element,
    index_Raw as Raw,
    index_Audio as Audio,
    index_BackgroundAudio as BackgroundAudio,
    index_Bookmark as Bookmark,
    index_Break as Break,
    index_Language as Language,
    index_Lexicon as Lexicon,
    index_Paragraph as Paragraph,
    index_Phoneme as Phoneme,
    index_Prosody as Prosody,
    index_SayAs as SayAs,
    index_Sentence as Sentence,
    index_Subsitute as Subsitute,
    index_Voice as Voice,
    index_Word as Word,
    index_ExpressAs as ExpressAs,
    index_Silence as Silence,
  };
}

declare class Document {
    static Provider: typeof Providers;
    static readonly type = "document";
    type: string;
    provider: Providers;
    version: string;
    language: string;
    xmlns: string;
    effect?: string;
    effectValue?: string;
    format: string;
    sampleRate?: string;
    children: Element[];
    constructor(options: IDocumentOptions);
    find(path: string): Document | Element | undefined;
    appendChild(node: Element): void;
    toText(): string;
    toTimeline(baseTime?: number): any[];
    toSSML(pretty?: boolean): string;
    static parse(content: any): Document;
    get declaimer(): string;
    get speechRate(): number;
}

export { Document, index as elements };
