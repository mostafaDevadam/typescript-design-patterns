interface IRenderer {
    renderCircle(radius: number): string
}

export class VectorRenderer implements IRenderer {
    renderCircle(radius: number): string {
        return `<circle r="${radius}"/>`
    }
}

export class RasterRenderer implements IRenderer {
    renderCircle(radius: number): string {
        return `<pixelated circle of radius ${radius}/>`
    }
}

abstract class Shape {
   protected constructor(protected renderer: IRenderer){}

   abstract draw(): string
}

export class BCircle extends Shape {

    constructor(renderer: IRenderer, public radius: number){
        super(renderer)
    }
    draw(): string {
        return this.renderer.renderCircle(this.radius)
    }
}

export class BSquare extends Shape {
    constructor(renderer: IRenderer, public side: number){
        super(renderer)
    }
    draw(): string {
        return this.renderer.renderCircle(this.side)
    }
}