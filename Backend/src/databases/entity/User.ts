import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;
}

/* From dang nhap se gom cac thong tin o user cung voi do la ten dang nhap va mat khau */
