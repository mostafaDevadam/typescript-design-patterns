interface IPrototype<T> {
    clone(): T;
}

export class Document implements IPrototype<Document> {
    constructor(public title: string, public content: string) {}
    clone(): Document {
        return new Document(this.title, this.content);
    }
}