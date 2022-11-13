import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class WareHouseReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creatorId: number;

    @Column()
    receiverId: number;

    @Column()
    createdDate: Date;

    @Column()
    note: string;
}
