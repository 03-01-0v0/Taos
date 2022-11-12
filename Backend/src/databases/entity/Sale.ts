import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startedDate: Date;

    @Column()
    endedDate: Date;

    @Column()
    discount: number;
}
