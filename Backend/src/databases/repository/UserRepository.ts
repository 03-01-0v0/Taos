import {Repository} from 'typeorm';
import {User} from '../entity/User';
import {appDataSource} from '../data-source';

class UserRepository {
    private _userRepository: Repository<User>;

    constructor() {
        this._userRepository = appDataSource.getRepository(User);
    }

    public async getAllUser(): Promise<User[]> {
        return this._userRepository.find();
    }

    public async getUserById(id: number): Promise<User> {
        return this._userRepository.findOneBy({id});
    }

    public async addUser(
        name: string,
        email: string,
        address: string,
        phoneNumber: string
    ): Promise<User> {
        const user: User = new User();
        user.name = name;
        user.email = email;
        user.address = address;
        user.phoneNumber = phoneNumber;                
        return this._userRepository.save(user);
    }

    public async updateUserById(
        id: number,
        name: string,
        email: string,
        address: string,
        phoneNumber: string
    ): Promise<User> {
        const user = await this._userRepository.findOneBy({id});
        if (!user) {
            throw new Error(`Cant find user by id: ${id}`);
        }
        user.name = name;
        user.email = email;
        user.address = address;
        user.phoneNumber = phoneNumber;
        const updatedUser = await this.saveUser(user);
        if (!updatedUser) {
            throw new Error(`Update user by id: ${id} failed`);
        }
        return updatedUser;
    }

    public async removeUser(id: number): Promise<User> {
        const user = await this._userRepository.findOneBy({id});
        if (!user) {
            throw new Error(`Cant find user by id: ${id}`);
        }
        return this._userRepository.remove(user);
    }

    public async saveUser(user: User): Promise<User | null> {
        if (user) {
            return this._userRepository.save(user);
        }
        return null;
    }

    public async findUserByEmail(email: string): Promise<User> {
        return this._userRepository.findOneBy({email});
    }
}

export const userRepositoryController = new UserRepository();
