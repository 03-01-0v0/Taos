import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 13
    })
    accountId: number;

    @Column()
    orderId: number;

    @Column({
        default: 2
    })
    statusId: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
