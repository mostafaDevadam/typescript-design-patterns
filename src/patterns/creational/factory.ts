interface IShape {
    draw(): void
}

export class Circle implements IShape {
    draw(): void {
        console.log("Draw Circle")
    }
} 

export class Square implements IShape {
    draw(): void {
        console.log("Draw Square")
    }
}

export class ShapeFactory {
    static createShape(type: "circle" | "square"): IShape {
        if (type === "circle") return new Circle()
        else return new Square()
    }
}