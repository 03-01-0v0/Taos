import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}
