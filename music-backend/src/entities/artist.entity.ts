import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MusicEntity } from "./music.entity";


@Entity({
    name: 'artists',
  })
  export class ArtistEntity{
      @PrimaryGeneratedColumn()
      id:number
  
      @Column()
      name:string;

      @Column({ default: "https://static.netpop.app/img/avatar-logout.png" })
        image:string;

      @Column()
      title:string;
  
      @CreateDateColumn({ name: 'created_at' })
      createdAt: Date;
      
    @Column({
      name: 'updated_at',
      default: () => 'UTC_TIMESTAMP',
      onUpdate: 'UTC_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToMany(() => MusicEntity, (music) => music.artist)
    @JoinTable({
      name: "music_artist",
      joinColumn: {
        name: "artist_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "music_id",
        referencedColumnName: "id"
      }
    })
    musics: MusicEntity[];

  
  }