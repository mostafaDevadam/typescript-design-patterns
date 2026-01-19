// 1
interface IOrderState {
    pay(): void
    ship(): void
    cancel(): void
}

export class OrderContext {
    private state: IOrderState

    constructor(){
        this.state = new PendingState(this)
    }

    setState(state: IOrderState){
        this.state = state
    }

    pay() {
        this.state.pay()
    }

    ship(){
        this.state.ship()
    }

    cancel(){
        this.state.cancel()
    }


}

class PendingState implements IOrderState {
    constructor(private context: OrderContext){}
    pay(): void {
        console.log("Order paid")
        this.context.setState(new PaidState(this.context))
    }
    ship(): void {
        console.log("Cannot ship unpaid order")
    }
    cancel(): void {
        console.log("Order cancelled")
        this.context.setState(new CancelledState(this.context))
    }

}

class PaidState implements IOrderState {
    constructor(private context: OrderContext){}
    pay(): void {
        console.log("Order already paid")
    }
    ship(): void {
        console.log("Order shipped")
        this.context.setState(new ShippedState(this.context))
    }
    cancel(): void {
        console.log("Refund order")
        this.context.setState(new CancelledState(this.context))
    }

}

class ShippedState implements IOrderState {
    constructor(private context: OrderContext){}
    pay(): void {
        console.log(" already shipped")
    }
    ship(): void {
        console.log(" already shipped")
    }
    cancel(): void {
        console.log("Cannot cancel shipped order")
    }

 }

 class CancelledState implements IOrderState {
    constructor(private context: OrderContext){}
     pay(): void {
         console.log("Order cancelled")
     }
     ship(): void {
        console.log("Order cancelled")
     }
     cancel(): void {
         console.log("Order already cancelled")
     } 

 }



// 2
type TState = {
    pay: () => TState
    ship: () => TState
}

const pending: TState = {
    pay: () => paid,
    ship: () => pending
}

const paid: TState = {
    pay: () => paid,
    ship: () => shipped
}

const shipped: TState = {
    pay: () => shipped,
    ship: () => shipped
}

let state= pending
state = state.pay()
state = state.ship()
// 3
enum EOrderStatus {
    Pending,
    Paid,
    Shipped
}

export class SOrder {
    private state = EOrderStatus.Pending

    pay(){
        if(this.state === EOrderStatus.Pending){
            this.state = EOrderStatus.Paid
            console.log("Paid")
        }
    }

    ship(){
        if(this.state === EOrderStatus.Paid){
            this.state = EOrderStatus.Shipped
            console.log("Shipped")
        }
    }
}