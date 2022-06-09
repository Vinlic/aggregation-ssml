declare enum ElementTypes {
    Element = "element",
    Voice = "voice",
    Language = "language",
    Paragraph = "paragraph",
    Sentence = "sentence",
    Break = "break",
    Phoneme = "phoneme",
    Lexicon = "lexicon",
    Prosody = "prosody",
    SayAs = "sayAs",
    Audio = "audio",
    Bookmark = "bookmark",
    Subsitute = "subsitute",
    Word = "word",
    BackgroundAudio = "backgroundAudio",
    ExpressAs = "expressAs",
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
    static Type: typeof ElementTypes;
    type: ElementTypes;
    tagName: string;
    value?: string;
    parent?: Document | Element;
    children: Element[];
    constructor(options: IElementOptions, type?: ElementTypes);
    find(path: string): Element;
    appendChild(node: Element): void;
    render(parent: any, provider: Providers): any;
    static isInstance(value: any): boolean;
}

declare class Document {
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
    find(path: string): Document;
    appendChild(node: Element): void;
    toSSML(pretty?: boolean): string;
}

export { Document };
