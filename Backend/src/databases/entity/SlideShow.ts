import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class SlideShow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    slideTitle: string;

    @Column()
    slideImg: string;
}
