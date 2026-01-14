export interface ICommand {
    execute(): void
    undo?():void
}

export class Light {
    turnOn(): void {
        console.log("Light is on")
    }
    turnOff(): void {
        console.log("Light is off")
    }
}

export class TurnOnCommand implements ICommand {
    constructor(private light: Light) {
        this.light = light
    }
    execute(): void {
        this.light.turnOn()
    }
    undo(): void {
        this.light.turnOff()
    }
}

export class TurnOffCommand implements ICommand {
    constructor(private light: Light) {
        this.light = light
    }
    execute(): void {
        this.light.turnOff()
    }
    undo(): void {
        this.light.turnOn()
    }
}

export class RemoteControl {
    private command?: ICommand

    
    setCommand(command: ICommand): void {
        this.command = command
    }
    pressButton(): void {
       if(this.command) this.command.execute()
    }

    pressUndo() {
        if(this.command && this.command.undo) this.command.undo()
    }
}