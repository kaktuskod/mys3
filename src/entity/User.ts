import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import * as bcrypt from 'bcryptjs'

@Entity()
@Unique(['nickname'])
export class User {
  @PrimaryGeneratedColumn()
  uuid?: number

  @Column()
  @Length(4, 20)
  nickname?: string

  @Column()
  @Length(4, 20)
  email?: string

  @Column()
  @Length(4, 100)
  password?: string

  @Column()
  @IsNotEmpty()
  role?: string

  @Column()
  @CreateDateColumn()
  createdAt?: Date

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}
