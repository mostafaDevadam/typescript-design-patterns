interface IPaymentStrategy {
    pay(amount: number): void
}

export class CreditCardPayment implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid ${amount} using CreditCard.`)
    }
}

export class PaypalPayment implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Paypal.`)
    }
}

export class ShoppingCart {
    constructor(private paymentStrategy: IPaymentStrategy) {}

    checkout(amount: number): void {
        this.paymentStrategy.pay(amount)
    }
}