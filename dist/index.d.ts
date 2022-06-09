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

interface IElementOptions {
    type?: ElementTypes;
    value?: string;
    children?: (Element | IElementOptions)[];
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
    static isInstance(value: any): boolean;
    set parent(obj: Document | Element | undefined);
    get parent(): Document | Element | undefined;
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
    format?: string;
    sampleRate?: string;
    children: Element[];
    constructor(options?: {});
    find(path: string): Document | Element | undefined;
    appendChild(node: Element): void;
    toSSML(pretty?: boolean): string;
    static parse(content: any): Document;
}

export { Document };
