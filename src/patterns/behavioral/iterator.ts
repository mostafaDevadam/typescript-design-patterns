// 1
interface IIterator<T> {
    hasNext(): boolean
    next(): T | null
}

interface IAggregate<T> {
    createIterator(): IIterator<T>
    createReverseIterator(): IIterator<T>
}

class WordsCollection implements IAggregate<string> {
    private words: string[] = []
    addWord(word: string) {
        this.words.push(word)
    }
    getWords(): string[] {
        return [...this.words]
    }
    createIterator(): IIterator<string> {
        return new AlphabeticalIterator(this)
    }
    createReverseIterator(): IIterator<string> {
        return new ReverseIterator(this)
    }
}

class AlphabeticalIterator implements IIterator<string> {

    private collection : WordsCollection
    private current = 0
    private sortedWords: string[]

    constructor(collection: WordsCollection){
        this.collection = collection
        this.sortedWords = this.collection.getWords().sort()
    }
    hasNext(): boolean {
       return this.current < this.sortedWords.length
    }
    next(): string | null {
        if(this.hasNext()){
            return this.sortedWords[this.current++]!!
        }
        return null
    }
}

class ReverseIterator implements IIterator<string> { 
    private collection: WordsCollection
    private current = 0
    private reversedWords: string[] = []
    constructor(collection: WordsCollection){
        this.collection = collection
        this.reversedWords = this.collection.getWords().reverse()
    }
    hasNext(): boolean {
       return this.current < this.reversedWords.length
    }
    next(): string | null {
        if(this.hasNext()){
            return this.reversedWords[this.current++]!!
        }
        return null
    }
}

export function iteratorPattern(){
    const words = new WordsCollection()
    words.addWord("Book")
    words.addWord("Apple")
    words.addWord("Car")

    const iterator = words.createIterator()
    console.log("Forward:")
    while(iterator.hasNext()){
        console.log(iterator.next())
    }

    const reverseIterator = words.createReverseIterator()
    console.log("Reverse:")
    while(reverseIterator.hasNext()){
        console.log(reverseIterator.next())
    }


}
// 2
interface IIterator2<T> {
    next(): {value: T | null, done: boolean}
}

interface IIterableCollection<T> {
    createIterator(): IIterator2<T>
}

class NumberCollection implements IIterableCollection<number> {
    constructor(private numbers: number[]){}

    createIterator(): IIterator2<number> {
        let index = 0
        const nums = this.numbers

        return {
            next(): { value: number | null, done: boolean} {
                if(index < nums.length){
                    return {value: nums[index++]!!, done: false}
                }
                return {value: null, done: true}
            }
        }
    }
}

export function iteratorPattern2(){
    const collection = new NumberCollection([1,2,3,4,5,6,7,8,9,10])
    const iterator = collection.createIterator()
    let result = iterator.next()
    while(!result.done){
        console.log(result.value)
        result = iterator.next()
    }
}
// 3
class UserCollection implements Iterable<string> {
   
    constructor(private users: string[]){}
    [Symbol.iterator](): Iterator<string> {
        let index = 0
        const users = this.users
        return {
            next(): IteratorResult<string> {
                if(index < users.length){
                    return {value: users[index++]!!, done: false}
                }
                return {value: undefined as any, done: true}
            }
        }
    }

    

}

export function iteratorPattern3(){
    const collection = new UserCollection(["User1", "User2", "User3", "User4", "User5"])
    for(const user of collection){
        console.log(user)
    }
}
// 4
class EventNumbers implements Iterable<number> {
    constructor(private numbers: number[]){}
    *[Symbol.iterator]() {
        for (const n of this.numbers){
            if(n % 2 === 0){
                yield n
            }
        }
    }
}

export function iteratorPattern4(){
    for(const n of new EventNumbers([1,2,3,4,5,6,7,8,9,10])){
        console.log(n)
    }
}
// 5
class OrderIerator implements Iterable<number> {
    constructor(private pages: number[][]){}
    *[Symbol.iterator](){
      for (const page of this.pages){
        for(const order of page){
            yield order
        }
      }
    }
}

export function iteratorPattern5() {
    const pages = [
        [1,2,3,4,5],
        [6,7,8,9,10],
        [11,12,13,14,15]
    ]
    for(const order of new OrderIerator(pages)){
        console.log(order)
    }
}
// 6
class LogStream {
    async *[Symbol.asyncIterator](){
        yield "LogStream: log 1 #"
        yield "LogStream: log 2 #"
       
    }
}

export async function iteratorPattern6(){
    for await (const log of new LogStream()){
        console.log(log)
    }
}