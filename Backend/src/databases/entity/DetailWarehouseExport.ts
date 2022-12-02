import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class DetailWarehouseExport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    warehouseExportId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
