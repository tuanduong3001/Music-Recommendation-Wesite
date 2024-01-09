import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MusicEntity } from "./music.entity";


@Entity({
  name: 'categories',
})
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @OneToOne(() => MusicEntity, music => music.category)
    musics: MusicEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
  @Column({
    name: 'updated_at',
    default: () => 'UTC_TIMESTAMP',
    onUpdate: 'UTC_TIMESTAMP',
  })
  updatedAt: Date;

}