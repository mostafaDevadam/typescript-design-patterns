interface IFileSystemComponent {
    name: string
    display(): string
    getSize(): number
    add(child: IFileSystemComponent): void
    remove(child: IFileSystemComponent): void

}

export class CFile implements IFileSystemComponent {
    constructor(public name: string, public size: number){}
    display(): string {
        return `File: ${this.name} (${this.size} bytes)`
    }
    getSize(): number {
        return this.size
    }
    add(child: IFileSystemComponent): void {
        throw new Error("Method not implemented.")
    }
    remove(child: IFileSystemComponent): void {
        throw new Error("Method not implemented.")
    }

    
}

export class Directory implements IFileSystemComponent {
    public name: string
    protected children: IFileSystemComponent[] = []

    constructor(name: string){
        this.name = name
    }
    display(): string {
        let output = `Directory: ${this.name}`
        for(const child of this.children){
            output += ` ${child.display()}`
        }
        return output
    }
    getSize(): number {
        return this.children.reduce((total, child) => total + child.getSize(), 0)
    }
    add(child: IFileSystemComponent): void {
        this.children.push(child)
    }
    remove(child: IFileSystemComponent): void {
        const index = this.children.indexOf(child)
        if(index > -1){
            this.children.splice(index, 1)
        }
    }
}