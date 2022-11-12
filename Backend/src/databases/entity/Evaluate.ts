import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Evaluate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    productId: number;

    @Column()
    rate: number;
}
