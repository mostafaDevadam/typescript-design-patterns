export interface IChatMediator {
    sendMessage(message: string, colleague: Colleague): void
    register(colleague: Colleague): void

}

export abstract class Colleague {
   constructor(protected mediator: IChatMediator){}

   abstract receive(message: string): void  
}

export class ChatRoom implements IChatMediator {
    private colleagues: Colleague[] = []

    register(colleague: Colleague): void {
        this.colleagues.push(colleague)
    }

    sendMessage(message: string, sender: Colleague): void {
        this.colleagues.filter( c => c!==sender).forEach(c => c.receive(message))
    }

}

export class User extends Colleague {
    constructor(mediator: IChatMediator, private name: string){
        super(mediator)
    }
    receive(message: string): void {
        console.log(`${this.name} received message: ${message}`)
    }

    send(message: string): void {
        console.log(`${this.name} sends message: ${message}`)
        this.mediator.sendMessage(message, this)
    }}