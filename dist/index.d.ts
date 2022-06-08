declare class Element {
}

declare class Document {
    static readonly type = "document";
    type: string;
    provider: string;
    version: string;
    language: string;
    xmlns: string;
    effect?: string;
    effectValue?: string;
    format?: string;
    sampleRate?: string;
    children?: Element;
    constructor(options?: {});
    toSSML(pretty?: boolean): string;
}

export { Document };
