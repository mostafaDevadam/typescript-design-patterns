class CPU {
    public start(): void {
        console.log("Start CPU")
    }
}

class Memory {
    public load(): void {
        console.log("Load Memory")
    }
}

class HardDrive {
    public read(): void {
        console.log("Read Harddrive")
    }
}

export class ComputerFacade {
    private cpu: CPU = new CPU()
    private memory: Memory = new Memory()
    private hardDrive: HardDrive = new HardDrive()

    public startComputer(): void {
        this.cpu.start()
        this.memory.load()
        this.hardDrive.read()
    }
}