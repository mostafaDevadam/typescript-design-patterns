export interface ICoffee {
    cost(): number
    description(): string
}

export class SimpleCoffee implements ICoffee {
    cost(): number {
        return 10
    }
    description(): string {
        return "Simple Coffee"
    }
}

export class MilkDecorator implements ICoffee {
    constructor(private coffee: ICoffee) {}
    cost(): number {
        return this.coffee.cost() + 2
    }
    description(): string {
        return this.coffee.description() + " , Milk"
    }
}