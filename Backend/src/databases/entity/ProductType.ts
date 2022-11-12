import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    description: string;

    @Column()
    isSell: boolean;
}
