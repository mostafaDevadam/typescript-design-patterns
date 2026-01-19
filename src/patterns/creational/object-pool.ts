class OPConnection {
    constructor(private id: number){}

    query(sql: string){
        console.log(`Connection ${this.id} executing: ${sql}`)
    }
}

export class ConnectionPool {
    private available: OPConnection[] = []
    private inUse: Set<OPConnection> = new Set()
    private counter = 0

    constructor(private readonly maxSize: number){}

    acquire(): OPConnection {
        if(this.available.length > 0){
            const conn = this.available.pop()!!
            this.inUse.add(conn)
            return conn
        }

        if(this.inUse.size < this.maxSize){
            const conn = new OPConnection(++this.counter)
            this.inUse.add(conn)
            return conn
        }

        throw new Error("No available connections")
    }

    release(conn: OPConnection){
        if(this.inUse.has(conn)){
            this.inUse.delete(conn)
            this.available.push(conn)
        }
    }
}
//--------------------------
class Bullet {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public active: boolean = false
    ){}

    initialize(x: number, y: number): void {
        this.x = x
        this.y = y
        this.active = true
        console.log(`Bullet initialized at (${x}, ${y})`)
    }

    update(): void {
        if(this.active){
            this.x += 5
            console.log(`Bullet moved to (${this.x}, ${this.y})`)
        }
    }

    deactivate(): void {
        this.active = false
        console.log(`Bullet deactivated and returned to pool`)
    }
}

class ObjectPool<T extends { initialize(...args: any[]): void; deactivate(): void}> {
    private pool: T[] = []
    private available : T[] = []

    constructor(private factory: () => T, private maxSize: number) {
        for (let i =0; i < maxSize; i++){
            this.pool.push(factory())
            this.available.push(this.pool[i]!!)
        }
    }

    acquire(...args: Parameters<T['initialize']>): T {
        if(this.available.length === 0) {
            throw new Error('Pool exhausted-no available objects')
        }
        const obj = this.available.shift()!
        obj.initialize(...args)
        return obj
    }

    release(obj: T): void {
        obj.deactivate()
        this.available.push(obj)
    }

    getAvailableCount(): number {
        return this.available.length
    }
}

const bulletPool = new ObjectPool<Bullet>(() => new Bullet(), 5)

export function gameLoop() {
    const bullets: Bullet[] = []
    for(let i=0; i < 3; i++){
        const bullet = bulletPool.acquire(0, 100 + i * 10)
        bullets.push(bullet)
    }

    bullets.forEach(b => b.update())

    bullets.forEach(b => {
        b.update()
        bulletPool.release(b)
    })

    console.log(`Available bullets in pool: ${bulletPool.getAvailableCount()}`)
}