import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class WareHouseReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    createdDate: Date;

    @Column()
    note: string;
}
