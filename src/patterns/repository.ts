interface IUser {
    id: string;
    name: string;
}

interface UserRepository {
    findById(id: string): Promise<IUser>;
    save(user: IUser): Promise<void>;
}

export class DBUserRepository implements UserRepository {
    async findById(id: string): Promise<IUser> {
        return {id, name: "John Doe"}
    }
    async save(user: IUser): Promise<void> {
        console.log("saved...")
    }
}