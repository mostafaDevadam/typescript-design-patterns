export class ApiService {
    getData(){
        return "secret data"
    }
}

export class ApiProxy {
    constructor(private apiService: ApiService, private isAdmin: boolean){}
    getData(){
        if(!this.isAdmin) throw new Error("Forbidden")
        return this.apiService.getData()
    }
}