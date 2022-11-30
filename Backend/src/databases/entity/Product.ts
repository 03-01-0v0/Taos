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

    @Column('character varying',{
        array: true,
        default: []
    })
    img: string[];

    @Column({
        default: 1
    })
    quantity: number;

    @Column({
        default: ''
    })
    color: string;

    @Column({
        default: '64GB'
    })
    capacity: string;

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

    @Column({
        default: new Date()
    })
    createdDate: Date;

    @Column({
        default: new Date()
    })
    updatedDate: Date;
}
