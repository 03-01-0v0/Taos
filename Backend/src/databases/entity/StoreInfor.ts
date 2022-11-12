import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class StoreInfor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    slogan: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    linkFb: string;

    @Column()
    linkYoutube: string;
}
