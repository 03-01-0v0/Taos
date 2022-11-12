import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorizationId: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    password: string;
}
