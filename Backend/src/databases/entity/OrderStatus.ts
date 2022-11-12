import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    orderId: number;

    @Column()
    statusId: number;

    @Column()
    startedDate: Date;
}
