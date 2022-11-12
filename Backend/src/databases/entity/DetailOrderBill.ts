import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class DetailOrderBill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column({
        type: 'float'
    })
    price: number

    @Column()
    quantity: number;
}
