import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productTypeId: number;

    @Column()
    unitId: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({
        array: true
    })
    img: string;

    @Column({
        default: 1
    })
    quantity: number;

    @Column()
    purchasePrice: number;

    @Column()
    price: number;

    @Column()
    shortDescription: string;

    @Column()
    description: string;

    @Column({
        default: false
    })
    isSell: boolean;
}
