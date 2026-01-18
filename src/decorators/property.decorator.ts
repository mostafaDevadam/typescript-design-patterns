export function ReadOnly(target: any, propertyKey: string){
    Object.defineProperty(target, propertyKey, { writable: false })
}

export function DefaultValue(value: any) {
    return function(target: any, propertyKey: string){
        target[propertyKey] = value
    }
}