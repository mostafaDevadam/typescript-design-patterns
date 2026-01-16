class User {
    constructor(
        public readonly name: string,
        public readonly age?: number,
        public readonly address?: string,
        public readonly email?: string

    ) { }
}

export class UserBuilder {
    private name: string = ""
    private age?: number
    private email?: string
    private address?: string

    public setName(name: string): this {
        this.name = name
        return this
    }

    public setAge(age: number): this {
        this.age = age
        return this
    }

    public setEmail(email: string): this {
        this.email = email
        return this
    }

    public setAddress(address: string): this {
        this.address = address
        return this
    }

    public build(): User {
        if (!this.name) {
            throw new Error("Name is required")
        }
        return new User(
            this.name,
            this.age,
            this.address,
            this.email
        )
    }
}

export class UserDirector {
    static createAdmin(builder: UserBuilder) {
        return builder
            .setName("Admin")
            .setAddress("Admin address")
            .setEmail("admin@example.com")
            .setAge(45)
            .build()
    }
}

export class Builder<T> {
    protected data: Partial<T> = {}

    set<K extends keyof T>(key: K, value: T[K]): this {
        this.data[key] = value
        return this
    }

    build(create: (data: Partial<T>) => T): T {
        return create(this.data)
    }
}

export interface ICar {
    brand: string
    model: string
    year: number
}