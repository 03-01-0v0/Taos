import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0,
    })
    authorizationId: number;

    @Column()
    userId: number;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    password: string;

    @Column({
        default: ''
    })
    token: string;
}
