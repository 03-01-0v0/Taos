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

    @Column()
    img: string;

    @Column()
    quantity: number;

    @Column()
    purchasePrice: number;

    @Column()
    price: number;

    @Column()
    shortDescription: string;

    @Column()
    description: string;

    @Column()
    isSell: boolean;
}
