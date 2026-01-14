export class Singleton {
    private static instance: Singleton


    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public getState(){
        console.log("Singleton state")
    }
}