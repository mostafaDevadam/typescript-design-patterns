import { Demo, Greeter, Person, Person2 } from "./src/decorators/all.js"
import { Calculator } from "./src/decorators/method.decorator.js"
import { DefaultValue, ReadOnly } from "./src/decorators/property.decorator.js"
import { AuthHandler, LogHandler } from "./src/patterns/behavioral/chain.js"
import { Light, RemoteControl, TurnOffCommand, TurnOnCommand } from "./src/patterns/behavioral/command.js"
import { ChatRoom, User } from "./src/patterns/behavioral/mediator.js"
import { ConcreteObserver, Subject } from "./src/patterns/behavioral/observer.js"
import { CreditCardPayment, PaypalPayment, ShoppingCart } from "./src/patterns/behavioral/strategy.js"
import { Builder, MargheritaPizzaBuilder, PizzaDirector, UserBuilder, UserDirector, type ICar } from "./src/patterns/creational/builder.js"
import { ShapeFactory } from "./src/patterns/creational/factory.js"
import { Color } from "./src/patterns/creational/multiton.js"
import { Document } from "./src/patterns/creational/prototype.js"
import { Singleton } from "./src/patterns/creational/singleton.js"
import { DBUserRepository } from "./src/patterns/repository.js"
import { OldPrinter, PrinterAdapter } from "./src/patterns/structural/adapter.js"
import { BCircle, BSquare, RasterRenderer, VectorRenderer } from "./src/patterns/structural/bridge.js"
import { MilkDecorator, SimpleCoffee, type ICoffee } from "./src/patterns/structural/decorator.js"
import { ComputerFacade } from "./src/patterns/structural/facade.js"
import { TextEditor } from "./src/patterns/structural/flyweight.js"
import { ApiProxy, ApiService } from "./src/patterns/structural/proxy.js"

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
//----------------
const pc = new ComputerFacade()
pc.startComputer()
//----------------
const light = new Light()
const remote = new RemoteControl()

const turnOn = new TurnOnCommand(light)
const turnOff = new TurnOffCommand(light)

remote.setCommand(turnOn)
remote.pressButton()
remote.pressUndo()
remote.setCommand(turnOff)
remote.pressButton()
remote.pressUndo()

const user = new UserBuilder()
.setName("John")
.setAge(30)
.setEmail("g2xkM@example.com")
.setAddress("123 Main St")
.build();

console.log(user)

const car = new Builder<ICar>()
.set("brand", "Toyota")
.set("model", "Camry")
.set("year", 2022)
.build((car) => car as ICar);

console.log(car)

const admin = UserDirector.createAdmin(new UserBuilder())
console.log(admin)


const builder = new MargheritaPizzaBuilder()
const director = new PizzaDirector(builder)
const pizza = director.makePizza()
pizza.describe()
//----------------
const chatRoom = new ChatRoom()
const user1 = new User(chatRoom, "John")
const user2 = new User(chatRoom, "Jane")
const user3 = new User(chatRoom, "Bob")
chatRoom.register(user1)
chatRoom.register(user2)
chatRoom.register(user3)
user1.send("Hello everyone!")
user2.send("Hi, John!")
user3.send("Hi, Jane!")
//----------------
const doc1 = new Document("Document 1", "Content 1")
const doc2 = doc1.clone()
console.log("doc objs:", doc1 === doc2)
console.log(doc1)
console.log(doc2)
//----------------
const proxy = new ApiProxy(new ApiService(), true)
console.log("proxy", proxy.getData() )
//----------------
const chain = new AuthHandler()
chain.setNext(new LogHandler())
console.log("chain", chain.handle("John"))
//----------------
const repo = new DBUserRepository()
console.log("repo", repo.findById("1"))
repo.save({id: "1", name: "John Doe"})
//----------------
const red1 = Color.getInstance("red")
const red2 = Color.getInstance("red")
console.log("red1 === red2", red1 === red2)
const green = Color.getInstance("green")
console.log("green", green.toString())
try {
    Color.getInstance("purple")
    
} catch (error: Error | any) {
    console.log("color error:", error.message)
}
//----------------
const editor = new TextEditor()
editor.addCharacter("a", "Arial", 12, 10, 20)
editor.addCharacter("a", "Arial", 12, 30, 20)
editor.addCharacter("a", "Arial", 12, 50, 20)
editor.addCharacter("b", "Times", 12, 70, 20)
console.log(`Total unique flyweights: ${editor.getCount()}`)
//----------------
const vector = new VectorRenderer()
const raster = new RasterRenderer()
const vectorCircle =new BCircle(vector, 10)
const rasterCircle = new BCircle(raster, 15)
const vectorSquare = new BSquare(vector, 5)
console.log("vectorCircle", vectorCircle.draw())
console.log("rasterCircle", rasterCircle.draw())
console.log("vectorSquare", vectorSquare.draw())
//----------------


// Decoration
console.log("Decoration--------------------")
const person = new Person("John")
const calc = new Calculator()
console.log(calc.add(1, 2))
const g = new Greeter()
g.greet("John")
const p = new Person2("John")
const d = new Demo()

class Car {
    @ReadOnly brand: string  = "BMW"
    @DefaultValue(2022)
    year: number
}

const c = new Car()
console.log(c.brand)
console.log(c.year)
c.brand = "asd"