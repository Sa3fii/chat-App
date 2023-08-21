import { Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Message {
    @PrimaryColumn({ generated: true })
    id: number;

    @Column()
    sender: number;

    @Column()
    receiver: number;

    @Column()
    content: string;

    @Column({ type: 'timestamp'})
    date: Date;
}