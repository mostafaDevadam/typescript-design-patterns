// 1
interface ILogger {
    log(message: string): void
}

export class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(message)
    }
}

class NullLogger implements ILogger {
    log(_: string): void {
        
    }
}

export function process(logger: ILogger = new NullLogger()) {
    logger.log("Processing started")
}
// 2
interface IDiscountPolicy {
    apply(price: number): number
}

export class SeasonalDiscount implements IDiscountPolicy {
    apply(price: number): number {
        return price * 0.9
    }
}

export class NoDiscount implements IDiscountPolicy {
    apply(price: number): number {
        return price
    }
}

export function doDiscount(isPermium: boolean) {
    const discount : IDiscountPolicy = isPermium ? new SeasonalDiscount() : new NoDiscount()
    const finalPrice = discount.apply(100)
    console.log("finalPrice: ", finalPrice)
}
// 3
interface Iuser {
    id: string
    name: string
}
interface IUserRepository {
    findById(id: string): Promise<Iuser>

}

class DBUserRepository implements IUserRepository {
    async findById(id: string): Promise<Iuser> {
        return {id, name: "John Doe"}
    }

}

class NullUserRepository implements IUserRepository {
    async findById(id: string): Promise<Iuser> {
        return {id: "0", name: "Guest"}
    }
}

export function doUserDB(isUser: boolean) {
    const db : IUserRepository = isUser ? new DBUserRepository() : new NullUserRepository()
    const doc = db.findById("1")
    console.log("user doc: ", doc)
}
// 4
interface IEventHandler {
    handle(event: any): void
}

class EmailHandler implements IEventHandler {
    handle(event: any): void {
        console.log("Sending email")
    }

}

class NullEventHandler implements IEventHandler {
    handle(event: any): void {
        console.log("No event")
    }
}

export function callEvent(isEvent: boolean) {
    const e : IEventHandler = isEvent ? new EmailHandler() : new NullEventHandler()
    const doc = e.handle("click")
   
}
// 5
interface IPaymentGateway {
    charge(amount: number): void
}

class StripeGateway implements IPaymentGateway {
    charge(amount: number) {
        console.log(`Charging ${amount} using Stripe`);
    }
}

class NullPaymentGateway implements IPaymentGateway {
    charge(amount: number) {
        console.log(`No Charging`);
    }
}

export function doPayment(isPayment: boolean) {
    const payment : IPaymentGateway = isPayment ? new StripeGateway() : new NullPaymentGateway()
    const doc = payment.charge(100)
   
}