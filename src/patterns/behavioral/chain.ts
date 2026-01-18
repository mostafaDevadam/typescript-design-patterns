abstract class Handler {
    next?: Handler

    setNext(handler: Handler){
       this.next = handler
       return handler
    }

    handle(request: string): string{
        return this.next?.handle(request) ?? request
    }
}

export class AuthHandler extends Handler {
    handle(request: string) {
        return super.handle(request + "-> Auth")
    }
}

export class LogHandler extends Handler {
    handle(request: string) {
        return super.handle(request + "-> Log")
    }
}