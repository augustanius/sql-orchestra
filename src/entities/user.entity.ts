import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ name: 'Uid', primary: true })
  id?: Uuid;

  @Column({ type: 'varchar', name: 'Username', length: 255 })
  username: string;

  @Column({ type: 'varchar', name: 'City', length: 255 })
  city: string;

  @Column({ type: 'integer', name: 'Friend', nullable: true })
  friend?: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
