abstract class DataProcessor {

    protected abstract loadData(): void
    protected abstract transform(): void

    process(): void {
        this.loadData()
        this.transform()
        this.validate()
        this.save()
    }

    protected validate(): void {
        console.log("validate data")
    }

    protected save(): void {
        console.log("save data")
    }

}

class CsvProcessor extends DataProcessor {
    protected loadData(): void {
        console.log("load csv data")
    }

    protected transform(): void {
        console.log("transform csv data")
    }
}

class JsonProcessor extends DataProcessor {
    protected loadData(): void {
        console.log("load json data")
    }

    protected transform(): void {
        console.log("transform json data")
    }
}

export const templateMethodPattern = () => {
    const csvProcessor = new CsvProcessor()
    csvProcessor.process()

    const jsonProcessor = new JsonProcessor()
    jsonProcessor.process()
}
// 2
function processOrder(steps: {
    validate: () => void,
    pay: () => void,
    notify: () => void,
}) {
    steps.validate()
    steps.pay()
    steps.notify()

}


export const templateMethodPattern2 = () => {
    processOrder({
        validate: () => console.log("validate order"),
        pay: () => console.log("pay order"),
        notify: () => console.log("notify customer")
    })
}