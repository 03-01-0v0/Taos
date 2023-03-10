import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class DetailWareHouseReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    warehouseReceiptId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    color: string;

    @Column()
    capacity: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
