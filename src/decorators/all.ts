

function Logger(constructor: Function){
    console.log("Class created:", constructor.name)
}

@Logger
export class Person {
    constructor(public name: string){}
}
//----------------------
function LogParam(target: any, methodName: string, paramIndex: number){
    console.log(methodName,"Param at index", paramIndex ," decorated")
}

export class Greeter {
    greet(@LogParam name: string){
        console.log("Hello", name)
    }
}
//----------------------
function LoggerPrefix(prefix: string){
    return function(constructor: Function){
        console.log(prefix, "Class created: ",constructor.name)
    }
}

@LoggerPrefix("LOG: ")
export class Person2 {
    constructor(public name: string){}
}
//---------------------
function First(): Function { return (): void => console.log("First")}
function Second(): Function { return ()=> console.log("Second")}

@First()
@Second()
export class Demo {}