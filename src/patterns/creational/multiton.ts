

export class Color{
    private static instances: Map<string, Color> = new Map()
    private static readonly validColors = new Set(["red", "green", "blue"])

    constructor(private readonly name: string, public readonly hex: string){}


    public static getInstance(key: string): Color {
        if(!Color.validColors.has(key)){
            throw new Error(`Invalid color key: ${key}`)
        }

        if(!Color.instances.has(key)){
            const hexMap: Record<string, string> = {
                red: "#ff0000", 
                green: "#00ff00", 
                blue: "#0000ff"
            }
            Color.instances.set(key, new Color(key, hexMap[key]!!))
        }
        return Color.instances.get(key)!!
    }

    public toString(): string {
        return `Color [name=${this.name}, (hex=${this.hex})]`
    }

    public static getAll(): Color[] {
        return Array.from(Color.instances.values())
    }
}