import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Payments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
