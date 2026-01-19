class EditorMemento {
    constructor(public readonly content: string){}
}

class TextEditor {
    private content = ""

    type(text: string){
        this.content += text
    }

    getContent(){
        return this.content
    }

    save(): EditorMemento {
        return new EditorMemento(this.content)
    }

    restore(memento: EditorMemento){
        this.content = memento.content
    }
}

class History {
    private stack: EditorMemento[] = []

    push(memento: EditorMemento){
        this.stack.push(memento)
    }

    pop(): EditorMemento | undefined {
        return this.stack.pop()
    }
}

export const mementoPattern = () => {
    const editor = new TextEditor()
    const history = new History()

    editor.type("Hello ")
    history.push(editor.save())

    editor.type("World")
    history.push(editor.save())

    console.log("editor content:", editor.getContent())

    editor.restore(history.pop()!!)
    console.log("editor content:", editor.getContent())
}