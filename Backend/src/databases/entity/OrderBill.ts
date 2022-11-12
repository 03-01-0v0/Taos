import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class OrderBill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    paymentId: number;

    @Column()
    saleId: number;

    @Column()
    createdDate: Date;

    @Column()
    note: string;
}
