import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({generated : true})
  id: number;

  @Column({ unique: true })
  user: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  password: string;
}
