import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";
import { ArtistEntity } from "./artist.entity";
import { EmbeddingEntity } from "./embedding.entity";

@Entity({
    name: 'musics',
  })
  export class MusicEntity{
      @PrimaryGeneratedColumn()
      id:number
  
       @Column()
       name:string;
       
       @Column({name: 'category_id'})
       categoryId:number;
  
       @Column()
       source:string;

       @Column()
       image:string;

       @Column({ default: 0 })
       view:number;

       @Column({ default: 0 })
       like:number;

       @OneToOne(()=>CategoryEntity)
       @JoinColumn({ name: 'category_id' })
       category: CategoryEntity

      @CreateDateColumn({ name: 'created_at' })
      createdAt: Date;
  
    @Column({
      name: 'updated_at',
      default: () => 'UTC_TIMESTAMP',
      onUpdate: 'UTC_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToMany(() => UserEntity, (user) => user.history)
    @JoinTable({
      name: "user_history",
      joinColumn: {
        name: "music_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
      }
    })
    users: UserEntity[];

    @ManyToMany(() => UserEntity, (user) => user.liked)
    @JoinTable({
      name: "user_liked",
      joinColumn: {
        name: "music_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: { 
        name: "user_id",
        referencedColumnName: "id"
      }
    })
    liked: UserEntity[];

    @ManyToMany(() => ArtistEntity, (artist) => artist.musics)
    artist: ArtistEntity[];

    @OneToOne(() => EmbeddingEntity, embedding => embedding.music)
    embedding: EmbeddingEntity;
  }