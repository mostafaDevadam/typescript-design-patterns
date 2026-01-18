interface IFlyweight {
    render(extrinsicState: IExtrinsicState): void
}

interface IExtrinsicState {
    x: number
    y: number
}

class CharacterFlyweight implements IFlyweight {

    constructor(
        private char: string,
        private font: string,
        private size: number,
    ) {}

    render(extrinsicState: IExtrinsicState): void {
        console.log(`${this.char} (font: ${this.font}, size: ${this.size}) at position (${extrinsicState.x}, ${extrinsicState.y})`)
    }

}

class FlyweightFactory {
    private flyweights: Map<string, IFlyweight> = new Map<string, IFlyweight>()

    getFlyweight(key: string): IFlyweight {
        /*if(!this.flyweights.has(key)) {
            throw new Error ("invlaid key, Flyweight not found")
        }*/
        if(!this.flyweights.has(key)) {
            const [char, font, size] = key.split(":")
            this.flyweights.set(key, new CharacterFlyweight(char!!, font!!, parseInt(size!!)))
        }
       return this.flyweights.get(key)!!
    }

    getCount(): number {
        return this.flyweights.size
    }
} 

export class TextEditor {
    private factory: FlyweightFactory = new FlyweightFactory()

    addCharacter(char: string, font: string, size: number, x: number, y: number): void {
        const key = `${char}:${font}:${size}`
        const flyweight: IFlyweight = this.factory.getFlyweight(key)
        const extrinsic: IExtrinsicState = { x, y }
        flyweight?.render(extrinsic)!!
    }

    getCount(): number{
        return this.factory.getCount()
    }
}