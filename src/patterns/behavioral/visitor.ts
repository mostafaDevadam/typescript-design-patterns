interface IShape {
    accept(visitor: IShapeVisitor): void
}

interface IShapeVisitor {
    visitCircle(circle: Circle): void
    visitSquare(square: Square): void
    visitRectangle(rectangle: Rectangle): void
}

class Circle implements IShape {
    constructor(public radius: number) {}
    accept(visitor: IShapeVisitor): void {
        visitor.visitCircle(this)
    }
}

class Square implements IShape {
    constructor(public side: number) {}
    accept(visitor: IShapeVisitor): void {
        visitor.visitSquare(this)
    }
}

class Rectangle implements IShape {
    constructor(public width: number, public height: number) {}
    accept(visitor: IShapeVisitor): void {
        visitor.visitRectangle(this)
    }
}

class AreaCalculator implements IShapeVisitor {
    totalArea: number = 0
    visitCircle(circle: Circle): void {
        this.totalArea += Math.PI * circle.radius * circle.radius
    }
    visitSquare(square: Square): void {
        this.totalArea += square.side * square.side
    }
    visitRectangle(rectangle: Rectangle): void {
        this.totalArea += rectangle.width * rectangle.height
    }
}

class JsonExporter implements IShapeVisitor {
    json: string = ""
    visitCircle(circle: Circle): void {
       console.log(JSON.stringify({ type: "circle", radius: circle.radius }))
    }
    visitSquare(square: Square): void {
        console.log(JSON.stringify({ type: "square", side: square.side }))
    }
    visitRectangle(rectangle: Rectangle): void {
       console.log(JSON.stringify({ type: "rectangle", width: rectangle.width, height: rectangle.height }))
    }
}
export const visitorPattern = () => {
    const shapes: IShape[] = [
        new Circle(10),
        new Square(10),
        new Rectangle(5, 3)
    ]

    const visitor = new AreaCalculator()
    const json = new JsonExporter()
    shapes.forEach(shape => shape.accept(visitor))
    shapes.forEach(shape => shape.accept(json))

    console.log("Total area:", visitor.totalArea)
    
}
// 2
interface IOrderVisitor {
    visitPending(order: PendingOrder): void
    visitPaid(order: PaidOrder): void
}

interface IOrder {
    accept(visitor: IOrderVisitor): void
}

class PendingOrder implements IOrder {
    accept(visitor: IOrderVisitor): void {
        visitor.visitPending(this)
    }
}

class PaidOrder implements IOrder {
    accept(visitor: IOrderVisitor): void {
        visitor.visitPaid(this)
    }
}

class OrderValidationVisitor implements IOrderVisitor {
    isValid: boolean
    visitPending(): void {
        this.isValid = false
        console.log("Validate pending order")
    }
    visitPaid(): void {
        this.isValid = true
        console.log("Valdiate paid order")
    }
}

export const visitorPattern2 = () => {
    const orders: IOrder[] = [new PendingOrder(), new PaidOrder()]
    const visitor = new OrderValidationVisitor()
    orders.forEach(order => order.accept(visitor))
    
}
// 3
type IVisitShape = {type: "circle", r: number} | {type: "rectangle", w: number, h: number}
function visitShape<T>(shape: IVisitShape, visitor: {circle: (s: any) => T, rectangle: (s: any) => T}) {
    switch(shape.type){
        case "circle": return visitor.circle(shape)
        case "rectangle": return visitor.rectangle(shape)
    }
    
}

export const visitorPattern3 = () => {
    const v_cricle = visitShape<IVisitShape>({type: "circle", r: 10},{circle: s => s, rectangle: s => s})
    console.log("visitor circle:", v_cricle)
    const v_rect = visitShape<IVisitShape>({type: "rectangle", w: 10, h:10},{circle: s => s, rectangle: s => s})
    console.log("visitor rectangle:", v_rect)
}
// 4
