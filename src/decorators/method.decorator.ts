function LogMethod(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
){
    const original = descriptor.value
    descriptor.value = function(...args: any[]){
        console.log(`Method ${propertyName} called with ${args}`)
        return original.apply(this, args)
    }
}

export class Calculator {
    @LogMethod
    add(a: number, b: number){
        return a + b
    }
}