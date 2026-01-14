import { ConcreteObserver, Subject } from "./src/patterns/behavioral/observer.js"
import { CreditCardPayment, PaypalPayment, ShoppingCart } from "./src/patterns/behavioral/strategy.js"
import { ShapeFactory } from "./src/patterns/creational/factory.js"
import { Singleton } from "./src/patterns/creational/singleton.js"
import { OldPrinter, PrinterAdapter } from "./src/patterns/structural/adapter.js"
import { MilkDecorator, SimpleCoffee, type ICoffee } from "./src/patterns/structural/decorator.js"

console.log("start")
console.log("start")

const obj1 = Singleton.getInstance()
obj1.getState()
const obj2 = Singleton.getInstance()
obj2.getState()
console.log(obj1 === obj2)
console.log("end")
//----------------
const shape1 = ShapeFactory.createShape("circle")
const shape2 = ShapeFactory.createShape("square")
shape1.draw()
shape2.draw()
//-----------------
const oldPrinter = new OldPrinter()
const printerAdapter = new PrinterAdapter(oldPrinter)
printerAdapter.print("Hello")
//-----------------
let myCoffee: ICoffee = new SimpleCoffee()
myCoffee = new MilkDecorator(myCoffee)
console.log(myCoffee.cost())
console.log(myCoffee.description())
//----------------
const ob1 = new ConcreteObserver("Observer 1")
const ob2 = new ConcreteObserver("Observer 2")
const subject = new Subject()
subject.addObserver(ob1)
subject.addObserver(ob2)
subject.notify("Hello")
//----------------
const cart1 = new ShoppingCart(new CreditCardPayment())
cart1.checkout(100)
const cart2 = new ShoppingCart(new PaypalPayment())
cart2.checkout(100)

