import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MusicEntity } from "./music.entity";
import { Blob } from "buffer";


@Entity({
    name: 'music_embedding',
  })
  export class EmbeddingEntity{
      @PrimaryGeneratedColumn()
      id:number
  
      @Column({name: 'music_id'})
      musicId:number;

      @Column({ nullable: true })
      embedding: string;
  
      @CreateDateColumn({ name: 'created_at' })
      createdAt: Date;
      
    @Column({
      name: 'updated_at',
      default: () => 'UTC_TIMESTAMP',
      onUpdate: 'UTC_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToOne(()=>MusicEntity)
    @JoinColumn({ name: 'music_id' })
    music: MusicEntity
  
  }