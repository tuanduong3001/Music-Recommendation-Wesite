import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserGender, UserRole } from "../modules/users/enum";
import { MusicEntity } from "./music.entity";

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column({ default: "https://static.netpop.app/img/avatar-logout.png" })
    avatar:string;

    @Column({ default: () => 'UTC_TIMESTAMP' })
    dateOfBirth:Date;

    @Column({ nullable: true })
     email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ default: UserGender.MALE })
    gender: UserGender;

    @Column({ default: UserRole.USER })
    role: UserRole;

    @Column({nullable:true})
    resetPasswordToken:string;

    @Column({nullable:true})
    resetPasswordExpires:Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'UTC_TIMESTAMP',
    onUpdate: 'UTC_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => MusicEntity, (music) => music.users)
  history: MusicEntity[];

  @ManyToMany(() => MusicEntity, (music) => music.liked)
  liked: MusicEntity[];
}