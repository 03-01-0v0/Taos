import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Authorization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    permissions: string;
}
