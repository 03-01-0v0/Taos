import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class WarehouseExport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    userId: number;

    @Column()
    createdDate: Date;

    @Column()
    note: string;
}
