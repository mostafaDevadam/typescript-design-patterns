

export class OldPrinter {
    printOld(text: string){
        console.log("Old printer printing:",text)
    }
}

interface INewPrinter {
    print(text: string): void
}

export class PrinterAdapter implements INewPrinter {
    private oldPrinter: OldPrinter
    constructor(printer: OldPrinter){
        this.oldPrinter = printer
    }
    print(text: string): void {
        this.oldPrinter.printOld(text)
    }
}