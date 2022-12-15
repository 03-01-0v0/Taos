import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class OrderBill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({
        default: 1,
    })
    paymentId: number;

    @Column({
        default: 1,
    })
    saleId: number;

    @Column()
    note: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
