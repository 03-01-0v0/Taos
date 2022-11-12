import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}
