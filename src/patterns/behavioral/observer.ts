interface IObserver {
    update(message: string): void
}

export class ConcreteObserver implements IObserver {
    constructor(private name: string){}
    update(message: string): void {
        console.log(`${this.name} received message: ${message}`)
    }
}

export class Subject {
    private observers: IObserver[] = [];

    addObserver(observer: IObserver): void {
        this.observers.push(observer)
    }

    notify(message: string): void {
        this.observers.forEach(observer => observer.update(message))
    }
}