import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    title: string;

    @Column()
    feedbackContent: string;

    @Column()
    sendedTime: Date;

    @Column()
    replyContent: string;

    @Column()
    repliedDate: Date;
}
